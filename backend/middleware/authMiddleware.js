// export function profileMiddleware(req, res, next) {
//     console.log('Profile middleware executed');
//     // You can add any logic you want here, like checking user permissions or logging
//     next();
// }


import jwt from 'jsonwebtoken';
import Employee from '../models/employee.js';

const authenticateToken = async (req, res, next) => {
try {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access, no token provided'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = await Employee.findById(decoded.id).select('-password');
    next();
}
catch (Exception) {
    console.log(Exception.message);
    res.status(401).json({
        success: false,
        message: 'Unauthorized access',

    })
}   
}

const roleMiddleware = (role) => {
    return (req, res, next ) => {
        // if(!req.employee.role === role) {
        if( !role.includes(req.employee.role))
            return res.status(400).json({
                status: false,
                message: "Unauthorized"
            })
            next();
        }
        
    }


export { authenticateToken, roleMiddleware}