import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

router.post('/', async (req, res) => {
  const { id, title, start, end, backgroundColor, userId } = req.body
  const newEvent = new Event({ id, title, start, end, backgroundColor, userId })
  await newEvent.save()
  res.status(201).json(newEvent)
})

// 🔴 Ruta per eliminar un esdeveniment
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  console.log("🗑️ Intentant eliminar event amb id:", id)

  const deleted = await Event.findOneAndDelete({ id })

  if (!deleted) {
    console.warn("⚠️ No s'ha trobat cap esdeveniment amb id:", id)
    return res.status(404).json({ message: 'Esdeveniment no trobat' })
  }

  res.status(200).json({ message: 'Esdeveniment esborrat correctament' })
})



export default router
