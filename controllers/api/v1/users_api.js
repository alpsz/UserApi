const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//Get user Credentials
module.exports.create = function(req, res){
    //check if email is unique
    User.findOne({email: req.body.email, mobile : req.body.mobile}, function(err, user){
        if(err){
            return res.status(404).json({
                message: "Error in finding the user while signing up",
            });
        }
        if(!user){
            //Enter user details in database
            User.create(req.body, function(err, user){
                if(err){
                    return res.status(503).json({
                        message: "Error in creating the user while signing up",
                    });
                }
                return res.status(200).json({
                    message: "User created successfully",
                });
            })
        }else{
            return res.status(403).json({
                message: "User already exists",
            });
        }
    })

    
}

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(user){
            return res.status(200).json({
                message: "success",
                user: user
            });
        }
    });
}

module.exports.update = async function(req, res){
    try{
        let user = await User.findById(req.params.id); 
        user.name = req.body.name;
        user.address = req.body.address;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        user.province = req.body.province;
        user.city = req.body.city;
        user.country = req.body.country;
        user.activeFlag = req.body.activeFlag;
        //TODO Later
        //Check email if it is unique
        //Check mobile if it is unique
        //create password change method
        user.save();
        return res.redirect('back');
        
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

module.exports.destroy = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        user.remove();
        return res.status(200).json({
            message: "User deleted",
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password",
            })
        }

        return res.status(200).json({
            message: "Sign in successfull, Here is your key to autheticate",
            data: {
                token: jwt.sign({
                    data: JSON.stringify(user)
                }, 'ekzero', { expiresIn: 1000 * 60 * 60})
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}


module.exports.paginate = async function(req, res) {
    //TODO Later 
    //Populate company details using aggregation 
        try{
            let entryPerPage = req.body.limit;
            let pageNum = req.body.page;
            let skip = pageNum * entryPerPage;
            let users = User.find({}).skip(skip).limit(entryPerPage);
            return res.status(200).json({
                message: "Success",
                userList: users
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error",
            })
        }
}
