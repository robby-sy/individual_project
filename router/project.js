const router = require('express').Router()
const Controllers = require('../controllers/Project')

router.get('/',Controllers.getProjects)
router.get('/:id',Controllers.getProject)
router.post('/',Controllers.postProject)
router.put('/:id',Controllers.putProject)
router.patch('/:id',Controllers.patchProject)
router.delete('/:id',Controllers.deleteProject)
router.post('/record/:project',Controllers.insertRecord)

module.exports=router