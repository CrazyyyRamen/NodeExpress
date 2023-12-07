const ErrorLog = require("../models/errors.model");

exports.errorHandle = async (error, req, res, next) =>{
    console.log('Path:', req.path);
    console.log(error.message);
    const statusCode = res.statusCode
    if(statusCode == 100 || (statusCode >=400 && statusCode < 500))
    {
        //log error into db
        var errorLog = new ErrorLog({
            statusCode: statusCode,
            errorPath: req.path,
            message: error.message,
            trackTrace : error.stack,
            CreateDate: Date.now()
        })

        await errorLog.save();
    }

    //res.redirect('./error');
}