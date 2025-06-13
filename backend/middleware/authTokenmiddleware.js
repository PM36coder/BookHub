const jwt = require('jsonwebtoken')

const authTokenMiddleware = (req, res, next)=>{
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({msg : "Access denied , no token provided"})
    }

    const jwtToken = token.replace("Bearer ", "").trim();
try{
 const decoded = jwt.verify(jwtToken, process.env.JWT_TOKEN);

    //? the user all data came here when he/she login
    console.log("decoded data " , decoded)
    req.user = decoded
    console.log(req.user)
    next()
}catch(error){
    console.log("invalid Token", error.message)
    return res.status(401).json({msg: "invalid token"})
}
   
}

module.exports = {authTokenMiddleware}


//! 
//?
//*