const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {loginUserValidator} = require("../validators/login.validator.js");
const logHelper = require("../helper/logHelper.js");

router.get('/',(req,res,next)=>{
    res.render('../views/login');
})

router.post('/',loginUserValidator, async (req,res,next)=>{
    const errs = validationResult(req);

    if(!errs.isEmpty())
    {
        return res.json(errs);
    }
    else
    {
        try{
            const existUser = await User.findOne({'userName': req.body.userName});

            if(existUser)
            {
                const isValidPassword = await bcrypt.compare(req.body.password, existUser.password);
                if(isValidPassword)
                {
                    const accessToken = jwt.sign({
                        user:{
                            userName: existUser.userName,
                            id: existUser.id
                        }
                    }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : "3m"});

                    logHelper.logUser(req,existUser);
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true
                    })

                    return res.json({t:accessToken});
                }
                else
                {
                    return res.json({message: "Credentials are not correct"});
                }
            }
            else
            {
                return res.json({message: "User not found"});
            }
        }
        catch(err)
        {
            res.status(100);
            next(err);
        }
        
    }
})

module.exports = router;