const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
const ImageKit = require("imagekit");
var fs = require('fs');
const imagekit = new ImageKit({
    publicKey : "public_vCNcpgzd0llIjiw4HCzln//LKyM=",
    privateKey : "private_vI0r/MNyRHL0ODl/9Ihy/NPGgPs=",
    urlEndpoint : "https://ik.imagekit.io/d86p2zmms"
});
class UserController{
    static async register(req,res,next){
        
        try {
            const {email,password,first_name,last_name,province} = req.body
            const user = await User.create({email,password,first_name,last_name,province})
            res.status(201).json({message:"your account successfully registered"})
        } catch (error) {
            console.log(error);
            if(error.name==="SequelizeValidationError"){
                return res.status(400).json({message:error.errors[0].message})
            }
            if(error.name==="SequelizeUniqueConstraintError"){
                return res.status(400).json({message:"email is not available"})
            }
            res.status(500).json({message:"internal server error"})
        }
    }

    static async login(req,res,next){
        try {
            const {email,password} = req.body
            if(!email) return res.status(400).json({message:"email is required"})
            if(!password) return res.status(400).json({message:"password is required"})
            const user = await User.findOne({
                where:{
                    email
                }
            })
            if(!user || !comparePassword(password,user.password)) return res.status(401).json({message:"invalid email/password"})
            const access_token = signToken({id:user.id})
            return res.status(200).json({
                message : "successfully login",
                access_token,
                user:{
                    picture:user.profile_picture,
                    fname : user.first_name,
                    lname : user.last_name,
                    province : user.province
                }
            })
        } catch (error) {
            res.status(500).json({message:"internal server error"})
        }
    }

    static async putUser(req,res){
        try {
            const {first_name,last_name} = req.body
            const {id} = req.user
            const user = await User.findByPk(id)
            if(!user) return res.status(401).json({mesage:"User not found"})
            const p_picture = fs.readFileSync('temp/profile_picture.jpg')
            const u_name = user.first_name +'_'+ user.id
            const result = await imagekit.upload({
                file : p_picture, //required
                fileName : "profile_picture.jpg", //required
                tags: ["tag1", "tag2"],
                folder:`SunPower/${u_name}`,
                useUniqueFileName:false
              })
              await User.update({
                first_name,last_name,profile_picture:result.url
              },{where:{id}})
            fs.unlinkSync('temp/profile_picture.jpg')
            res.status(200).json({message:'Success Update Data'})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController