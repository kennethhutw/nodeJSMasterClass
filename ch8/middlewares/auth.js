const jsonwebtoken = require("jsonwebtoken")

const verifyToken=(req, res, next)=>{

    
    const accessToken = req.headers.authorization.replace("Bearer ","");

        try{
            const jwt_payload = jsonwebtoken.verify(accessToken, process.env.JWT_KEY)
            console.log(jwt_payload);
        }catch(e){
            res.status(401).json({
                status:"failed",
                message:"Unauthorized"
            })
            return;
        }
    next();
}

exports.verifyToken =verifyToken;