const express = require("express");
const router = express.Router();
const {validateTokenAuthorization} = require("../middleware/validateToken");

router.get("/:t", validateTokenAuthorization, (req,res)=>{
    const loginUser = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        userName: req.user.userName
    }
    
    res.render('../views/index', {user: loginUser});
})

module.exports = router;