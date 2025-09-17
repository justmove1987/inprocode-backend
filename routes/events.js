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
// ✅ Nova versió correcta
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findOneAndDelete({ id: req.params.id }) // ✅ Busca pel camp `id` (UUID)

    if (!deleted) {
      return res.status(404).json({ message: 'Esdeveniment no trobat' })
    }

    res.status(200).json({ message: 'Esdeveniment esborrat correctament' })
  } catch (err) {
    console.error('❌ Error eliminant esdeveniment:', err)
    res.status(500).json({ message: 'Error del servidor' })
  }
})




export default router
