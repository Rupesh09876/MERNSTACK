import { mongoose } from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: props => `${props.value} is not a valid name!`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // simple email regex
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    role:{
        type: String,
        enum : [ "employee", "manager", "admin"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
        maxlength: 200,
        trim: true,
    },
    profileImage: {
        type: String,
        defult: "",
        
    }
});

const Employee = mongoose.model('Employee', employeeSchema); 
export default Employee;
