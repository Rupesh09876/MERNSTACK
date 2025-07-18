import express from 'express';
import {createEmployee, deleteEmployeeById, getEmployee}  from '../controllers/employeeControllers.js';
import {getEmployeeById, updateEmployeeById} from '../controllers/employeeControllers.js';
import {authenticateToken, roleMiddleware} from '../middleware/authMiddleware.js'
import upload from '../utils/imageUpload.js'


const routers = express.Router();

routers.post("/",[authenticateToken, roleMiddleware(['admin','manager'])], upload.single('profileImage'), createEmployee );
routers.get("/",getEmployee);
routers.get("/:id",getEmployee);
routers.get("/:id",authenticateToken, getEmployee);
routers.delete("/:id",authenticateToken, deleteEmployeeById);
routers.put("/:id",authenticateToken, updateEmployeeById);



export default routers;

