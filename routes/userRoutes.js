import express from 'express'
import * as userCtrl from '../controllers/userController.js'

const router = express.Router()

router.get('/', userCtrl.getUsers)
router.post('/', userCtrl.createUser)
router.put('/:id', userCtrl.updateUser)
router.delete('/:id', userCtrl.deleteUser)

export default router

