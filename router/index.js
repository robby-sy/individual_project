const router = require('express').Router()
const ProjectRouter = require('./project')
const Authentication = require('../middlewares/Authentication')

router.use(Authentication)
router.use('/projects',ProjectRouter)

module.exports=router

