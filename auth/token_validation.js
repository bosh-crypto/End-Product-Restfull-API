const { verify } = require ("jsonwebtoken");
const { checkout } = require("../user/user.router");

module.exports = {
    checktoken: ( req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token,process.env.TEMP_PASSWORD, (err, decoded) => {
            if(err){
                res.json({
                    success: 0,
                    message: "Invaled token"
                })
            }else{
                next();
            }                
            })
        }else{
            res.json({
                success: 0,
                messgae: "Access dinied! Unotherized user"
            })
        }
    }
}