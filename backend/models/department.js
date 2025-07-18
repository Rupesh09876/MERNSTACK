import { mongoose } from 'mongoose';
 
const departmentSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: props => `${props.value} is not a valid description!`
        }
    },
    managementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },    
    head: {
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: props => `${props.value} is not a valid head name!`
        }
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
},{ timestamps: true}); 

const Department = mongoose.model('Department', departmentSchema); 
export default Department;