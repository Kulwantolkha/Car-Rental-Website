import User from "../models/User.model.js"
import fs from "fs";
import Car from "../models/Car.model.js"
import imagekit from '../configs/ImageKit.js'

//to change role of user
const Owner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"});
    }
    catch (error) {
        console.log(`Role isn't changed ${error.message}`);
        res.json({success: false, message: error.message});
    }
};

export const addCar = async (req, res) => {
    try {
        
        const { _id } = req.user;
        
        // Check if carData exists in req.body
        if (!req.body.carData) {
            return res.json({
                success: false, 
                message: "Car data is required"
            });
        }
        
        // Parse the carData JSON string
        let car;
        try {
            car = JSON.parse(req.body.carData);
        } catch (parseError) {
            return res.json({
                success: false, 
                message: "Invalid car data format"
            });
        }
        
        // Check if image file exists
        if (!req.file) {
            return res.json({
                success: false, 
                message: "Car image is required"
            });
        }
        
        const imageFile = req.file;

        // Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const base64File = fileBuffer.toString('base64');
        const response = await imagekit.upload({
            file: base64File,
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        // Generate optimized image URL
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });
        

        // Create car in database
        const carData = {
            ...car,
            owner: _id,
            image: optimizedImageUrl,
            isAvailable: true
        };
        const newCar = await Car.create(carData);

        // Clean up uploaded file
        fs.unlinkSync(imageFile.path);

        res.json({
            success: true, 
            message: "Car Added Successfully",
            data: newCar
        });
        
        console.log("🚗 ----- ADD CAR FUNCTION COMPLETED -----");
        
    } catch (error) {
        console.log(" ----- ADD CAR FUNCTION ERROR -----");
        console.error("❌ Error:", error.message);
        console.error("❌ Stack:", error.stack);
        
        res.json({
            success: false, 
            message: `Error adding car: ${error.message}`
        });
    }
};


export default Owner;