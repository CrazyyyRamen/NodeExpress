const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const {registerUserValidator} = require("../validators/signup.validator.js");


router.get("/",(req, res)=>{
    res.render("../views/register");
})

router.post('/',registerUserValidator, async (req,res,next)=>{
    const errs = validationResult(req);

    if(!errs.isEmpty()){
        return res.json(errs);
    }
    else
    {
        try{
            const hashPassword = await bcrypt.hash(req.body.password,10);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: hashPassword,
                createDate: Date.now(),
                updateDate: Date.now()
            });
            const newUser = await user.save();
            res.status(201).json({message:"Sign up successfully"});
        }
        catch(err)
        {
            res.status(100);
            next(err);
        }
    }
})

module.exports = router;