
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3002;
import Employee from './models/employee.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads/'))
// const MONGODB_URI = 'mongodb+srv://rupeshkatuwal53:rupesh101@cluster0.717ifu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const MONGODB_URI = process.env.MONGODB_URI
const dbConnection = mongoose.connect(MONGODB_URI);

app.get('/',(req,res)=>{
    res.send('heome page of employee management system');
})

dbConnection.then(() => {
    console.log('connected to mongodb successfully')
}) .catch((error) => {
    console.log('Error connecting mongodb:',error)
    process.exit(1)
})

const seedAdmin = async () => {
    try {
        const admin = await Employee.findOne({ email:'admin@gmail.com'});
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            await Employee.create({
                name: 'Admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            });
        }
    }
    catch (error){
        console.log(error);
    }
}

seedAdmin();
// app.post('/employee', async (req, res) => {
//     try 
//         const employee = new Employee(req.body);
//         const savedEmployee = await employee.save();

//         res.status(201).json({
//             success: true,
//             message: 'Employee created successfully',
//             data: savedEmployee 
//         }
//         );
//     } catch (error) {
//         console.error('Error creating employee:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//             error: error.message
//         });
//     }   
// });
// import employeeRoutes from './routes/employeeRoutes.js';
// app.use('/employee', employeeRoutes);

// import authRoutes from './routes/authroutes.js'
// app.use('/auth', authRoutes);   
// // Import other routes as needed
// import { profileMiddleware } from './middleware/auth.js';
// app.get('/profile',profileMiddleware, (req, res) => {
//     res.send('Profile page');
// });

app.use('/api', router)
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});