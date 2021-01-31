const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: {
            min: 3,
            max: 36
          },
    },
    email:{
        type: String,
        required: true,
        unique: true,
        test: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        length: {
            min: 10,
            max: 10
          },
    },
    address:{
        type: String,
        required:true
    },
    province:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    activeFlag:{
        type: Boolean,
        required:true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});


const User = mongoose.model('User', userSchema);
module.exports = User;