const {body} = require("express-validator");
const User = require("../models/users.model");

exports.registerUserValidator = [
    body('firstName','Please fill in your first name').not().isEmpty(),
    body('lastName','Please fill in your last name').not().isEmpty(),
    body('userName','User name is required').not().isEmpty().bail()
                                            .isEmail().withMessage('User name is not valid. It should be your email').bail()
                                            .custom(async value =>{
                                                    const user = await User.findOne({'userName': value});

                                                        if(user){
                                                        throw new Error({message:'This email is already existed'});
                                                        }
                                                    }),
    body('password','Password is required').not().isEmpty().bail().isStrongPassword().withMessage('Password is not strong enough'),
    body('confirmPassword','Confirm your password').not().isEmpty().bail()
                                                    .custom((value,{req})=>{
                                                        return value === req.body.password;
                                                    }).withMessage('Password are not identical')
]