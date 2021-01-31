const Company = require('../../../models/company');

//Get company details
module.exports.create = function(req, res){
            //Enter company details in database
            Company.create({
               name: req.body.name,
               userid: req.user._id,
               address: req.body.address,
               activeFlag: req.body.activeFlag 
            }, function(err, user){
                if(err){
                    return res.status(503).json({
                        message: "Error in creating the company",
                    });
                }
                return res.status(200).json({
                    message: "company created successfully",
                });
            })  
}