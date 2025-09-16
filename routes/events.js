import express from 'express'
import Event from '../models/Event.js'
import { getEvents, createEvent } from '../controllers/eventsController.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

router.post('/', async (req, res) => {
  const { id, title, start, end, backgroundColor } = req.body
  const newEvent = new Event({ id, title, start, end, backgroundColor })
  await newEvent.save()
  res.status(201).json(newEvent)
})

export default router
  