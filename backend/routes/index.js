import express from 'express';
import employeeRoutes from './employeeRoutes.js';
import authRoutes from './authroutes.js';
import departmentRoutes from './departmentRoutes.js';
import leaveRoutes from './leaveroutes.js';
import payrollRoutes from './payrollRoutes.js';

const router = express.Router();

router.use('/employee', employeeRoutes);
router.use('/auth', authRoutes);
router.use('/department', departmentRoutes);
router.use('/leave', leaveRoutes);
router.use('/payroll', payrollRoutes);  


export default router;