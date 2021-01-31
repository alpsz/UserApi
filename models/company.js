const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: {
            min: 3,
            max: 36
          },
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type: String,
        required:true
    },
    activeFlag:{
        type: Boolean,
        required:true
    }
},{timestamps: true});


const Company = mongoose.model('Company', companySchema);
module.exports = Company;