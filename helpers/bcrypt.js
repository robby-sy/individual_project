const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(5)

module.exports = {
    hashPassword:(password)=>{
        return bcrypt.hashSync(password,salt)
    },
    comparePassword:(password,hash)=>{
        return bcrypt.compareSync(password,hash)
    }
}