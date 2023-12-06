const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
    statusCode:{
        type:String
    },
    errorPath:{
        type:String
    },
    message:{
        type:String
    },
    trackTrace:{
        type:String
    },
    createDate:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ErrorLog',errorLogSchema);