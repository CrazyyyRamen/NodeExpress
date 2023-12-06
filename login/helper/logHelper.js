const UserLog = require("../models/log/userLog.model");

async function logUser(req,user){
    const userLog = new UserLog({
        ip:req.ip,
        browser:req.headers["user-agent"],
        language:req.headers["accept-language"],
        loginDate:Date.now(),
        userId:user.id
    });
    const newUserLog = await userLog.save();
}

module.exports = {logUser};