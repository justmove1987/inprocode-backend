import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

// GET - Tots els esdeveniments
router.get('/', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

// POST - Crear un nou esdeveniment
router.post('/', async (req, res) => {
  const event = new Event(req.body)
  await event.save()
  res.status(201).json(event)
})

// DELETE - Eliminar un esdeveniment per ID
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router
