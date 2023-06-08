const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')
module.exports=async (req,res,next)=>{
    try {
        const {access_token} = req.headers
        const {id} = verifyToken(access_token)
        const user = await User.findByPk(id)
        if(!user) throw ({name:"Unauthenticated"})
        req.user = {
            id:user.id,
        }
        next()
    } catch (error) {
        if(error.name === 'JsonWebTokenError' || error.name === "Unauthenticated"){
            return res.status(401).json({message:"Authentication error"})
        }
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

