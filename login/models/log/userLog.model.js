const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
    ip:{
        type:String
    },
    browser:{
        type:String
    },
    language:{
        type:String
    },
    loginDate:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports = mongoose.model("UserLog",userLogSchema);