const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default: Date.now
    },
    updateDate:{
        type:Date,
        default: Date.now
    },
    active:{
        type:Boolean,
        default: true
    }
})

module.exports = mongoose.model('User',userSchema);