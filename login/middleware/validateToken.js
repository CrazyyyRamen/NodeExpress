const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.validateTokenAuthorization = async (req,res,next) => {
    let token;
    if(req.params && req.params.t)
    {
        token = req.params.t;
    }
    else
    {
        if(req.headers || req.headers.Authorization)
        {
            let authHeader = req.headers.Authorization || req.headers.authorization;
            
            if(authHeader && authHeader.startsWith("Bearer")){
                token = authHeader.split(" ")[1];
            }
            else
            {
                return res.status(401).json({message: "unauthorized access"});
            }
        }
    }

    try
    {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.user.id);

        if(!user){
            return res.status(401).json({message: "unauthorized access"});
        }
        else
        {
            req.user = user;
        }
        
    }
    catch(err){
        if(err.name === 'TokenExpiredError')
        {
            return res.json({message: "Session expired. Please log in again"});
        }
        else
        {
            res.status(100);
            next(err);
        }
    }
    
    next();
}
