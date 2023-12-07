const express = require("express");
const router = express.Router();
const {validateTokenAuthorization} = require("../middleware/validateToken");

router.get("/", validateTokenAuthorization, (req,res)=>{
    if(req.user)
    {
        const loginUser = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            userName: req.user.userName
        }

        res.render('../views/index', {user: loginUser});
    }
    else{
        res.render("../views/sessionTimeout");
    }
})

module.exports = router;