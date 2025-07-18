import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';

const createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        const hashedPassword = await bcrypt.hash(employee.password, 10);
        employee.password = hashedPassword; // Hash the password before saving
        const savedEmployee = await employee.save();

        const { password: _, ... employeeData } = savedEmployee.toObject();
        employeeData.profileImage = req.file.filename;

        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
         
            data: savedEmployee 
        }
        );
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }   
};

const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            success: true,
            message: 'Employees fetched successfully',
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findById(id);
        res.status(200).json({
            success: true,
            message: 'Employee fetched successfully',
            data: employee
        
        })
    }
        catch (EXception) {
            console.error('Error fetching employee:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
}

const deleteEmployeeById = async (req, res) => {
    const {id} = req.params;
    try {
         await Employee.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully',
        
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateEmployeeById = async (req, res) => {
    const {id} = req.params;
    
    try {
        const employee = await Employee.findByIdAndUpdate(id, req.body,{new: true, runValidators: true})
        if(! employee) {
            res.status(404).json({
                success: true,
                message: 'Employee not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'employee updated successfully',
            data: employee
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'cannot update id'
        })
    }
}

export { createEmployee, getEmployee, getEmployeeById, deleteEmployeeById, updateEmployeeById };
