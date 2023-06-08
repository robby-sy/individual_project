const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    signToken : (payload)=>{
        return jwt.sign(payload,process.env.jwtKey)
    },
    verifyToken : (token) =>{
        return jwt.verify(token,process.env.jwtKey)
    }
}
