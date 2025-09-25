import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js"
import userRouter from "./routes/UserRoutes.js"
import ownerRouter from "./routes/Owner.routes.js"

const app = express();

//connect database
await connectDB();

app.use(cors());
app.use(express.json());


// // Add this debug middleware BEFORE your routes
// app.use('/api', (req, res, next) => {
//     console.log('=== API Request Debug ===');
//     console.log('Method:', req.method);
//     console.log('URL:', req.originalUrl);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('========================');
//     next();
// });


app.get("/", (req,res)=>    res.send("Server is running."));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>   console.log(`Server is running on port ${PORT}`));