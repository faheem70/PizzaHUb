const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";


    //wrong mongodb Id Error

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key  error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statuscode).json({
        success: true,
        message: err.message,
    });

};