import express from 'express'
import { getAllPlugins, createPlugin } from '../controllers/pluginController.js'

const router = express.Router()

router.get('/', getAllPlugins)
router.post('/', createPlugin)

export default router
