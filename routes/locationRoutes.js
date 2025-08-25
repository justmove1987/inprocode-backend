import express from 'express'
import Location from '../models/Location.js'

const router = express.Router()

// GET totes les ubicacions
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ message: 'Error obtenint les ubicacions' })
  }
})

// POST nova ubicació
router.post('/', async (req, res) => {
  try {
    const { name, lat, lng, category } = req.body
    if (!name || !lat || !lng || !category) {
      return res.status(400).json({ message: 'Falten camps obligatoris' })
    }
    const location = new Location({ name, lat, lng, category })
    const saved = await location.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(500).json({ message: 'Error afegint ubicació' })
  }
})

// ✅ PUT editar ubicació
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Location.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Ubicació no trobada' })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Error editant ubicació' })
  }
})

// ❌ DELETE eliminar ubicació
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Location.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Ubicació no trobada' })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: 'Error esborrant ubicació' })
  }
})

export default router
