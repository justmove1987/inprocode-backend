import Event from '../models/Event.js'

// GET all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST a new event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body)
    const saved = await newEvent.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
