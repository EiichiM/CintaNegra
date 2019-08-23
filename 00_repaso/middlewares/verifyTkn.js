const jwt = require("jsonwebtoken");

exports.verifyToken= (req, res, next)=>{
    let Token =req.headers.authorization
    if(token){
        try{
            jwt.verify(token, process.env.SECRET, (err, decoded)=>{
                if(err){return res.status(500).send(`Invalid Token`)}
                req.user = decoded
                // res.status(200).json({status:`OK`})
                next();
            })
        }
        catch(err){
            if(err){return res.status(500).json({message:err})}
        }
    }else{
        res.status(403).json({message:`Not Token`})
    }
}