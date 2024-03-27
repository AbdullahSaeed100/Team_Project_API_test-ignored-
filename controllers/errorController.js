const Errors=require('../util/Errors');
const handleValidationErrorDB= err=>{
    
    const errors=Object.values(err.errors).map(el => el.message);
    
    const message="Invalid input. "+errors.join('. ');
    return new Errors(message,400);
}
const handleCastErrorDB=(err)=>{
    const message = `Invalid ${err.path}: ${err.value}`;
    return new Errors(message,400);
}
const handleJsonWebTokenError= err =>{
    const message = `Invalid token. Please login again`;
    return new Errors(message,401);
}
const handleTokenExpiredError= err =>{
    const message = `token expired. Please login again`;
    return new Errors(message,401);
}

module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;

    if(err.name==="CastError") err= handleCastErrorDB(err);
    if(err.name==="ValidationError") err= handleValidationErrorDB(err);
    if(err.name==="JsonWebTokenError") err= handleJsonWebTokenError(err);
    if(err.name==="TokenExpiredError") err= handleTokenExpiredError(err);

    res.status(err.statusCode).json({
        error:err.message
    });
}