const express = require('express')
const app = express()
const UserController = require('./controllers/User')
const router = require('./router')
const cors = require('cors')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './temp')
    },
    filename: function (req, file, cb) {
      cb(null, 'profile_picture.jpg')
    }
  })
  
const upload = multer({ storage: storage })

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.post('/register',UserController.register)
app.post('/login',UserController.login)
app.use(router)
app.post('/users',upload.single('file'),UserController.putUser)

app.listen(3000, ()=>{
    console.log("Listen from port 3000");
})