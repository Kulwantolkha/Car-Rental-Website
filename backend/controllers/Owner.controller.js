import User from "../models/User.model.js"
import fs from "fs";
import Car from "../models/Car.model.js"
import imagekit from '../configs/ImageKit.js'
import Booking from "../models/Booking.model.js"

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
        const image= optimizedImageUrl;

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
        
        console.log(" ----- ADD CAR FUNCTION COMPLETED -----");
        
    } catch (error) {
        console.log(" ----- ADD CAR FUNCTION ERROR -----");
        console.error(" Error:", error.message);
        console.error(" Stack:", error.stack);
        
        res.json({
            success: false, 
            message: `Error adding car: ${error.message}`
        });
    }
};

//API to list owner cars
export const getOwnercars = async(req,res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id});
        res.json({success: true, cars});
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if(car.owner?.toString() !== _id.toString()) {
            return res.json({success:false,message: "Unauthorized"})
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        
        res.json({success:true, message: "Availability Toggled"})
    }
    catch(error) {
        console.log(error.message);
        res.json({success: false, message: `Availability Not Toggled ${error.message}`});
    }
}

//API to delete car
export const deleteCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if(car.owner?.toString() !== _id.toString()) {
            return res.json({success:false,message: "Unauthorized"})
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();
        
        res.json({success:true, message: "Car removed"})
    }
    catch(error) {
        console.log(error.message);
        res.json({success: false, message: `Couldn't remove car, ${error.message}`});
    }
}

export const getDashboardData = async (req,res) => {
    try {
        const {_id, role} = req.user;
        if(role!="owner") {
            return res.json({success: false, message: "Unauthorized to get dashboard"})
        }

        const cars = await Car.find({owner: _id});
        const bookings = (await Booking.find({owner: _id}).populate('car')).toSorted({createdAt: -1});

        const pendingBookings = await Booking.find({owner: _id, status: "pending"});
        const completedBookings = await Booking.find({owner: _id, status: "confirmed"});

        //Calculate monthlyRevenue from bookings where status is confirmed

        const monthlyRevenue = bookings.slice().filter(booking => booking.status==="confirmed").reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData = {
            totalCars: cars.length,
            totalBooking: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success:true, dashboardData});
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: `Couldn't fetch Dashboard, ${error.message}`});
    }
}

export default Owner;

//API to update user Image

export const updateUserImage = async (req,res) => {
    try {
        const {_id} = req.user;

        const imageFile = req.file;

        // Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const base64File = fileBuffer.toString('base64');
        const response = await imagekit.upload({
            file: base64File,
            fileName: imageFile.originalname,
            folder: '/users'
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
        const image= optimizedImageUrl;

        await User.findByIdAndUpdate(_id, {image});
        res.json({success:true, message: "Image Updated"})
    }
    catch (error) {
        console.log(`Couldn't update user imgae ${error.message}`)
        res.json({success:false, message: `Couldn't update user imgae ${error.message}`});

    }
}