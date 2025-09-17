// controllers/eventsController.js

import Event from '../models/Event.js'

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId')
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Error obtenint esdeveniments' })
  }
}

export const createEvent = async (req, res) => {
  try {
    const { id, title, start, end, backgroundColor } = req.body

    if (!title || !start || !end) {
      return res.status(400).json({ message: 'Falten camps obligatoris' })
    }

    const newEvent = new Event({ id, title, start, end, backgroundColor })
    await newEvent.save()

    res.status(201).json(newEvent)
  } catch (error) {
    console.error('❌ Error creant esdeveniment:', error)
    res.status(500).json({ message: 'Error creant esdeveniment' })
  }
}
