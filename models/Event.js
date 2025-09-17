// models/Event.js
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true }, // <- UUID personalitzat
  title: String,
  start: String,
  end: String,
  backgroundColor: String,
  userId: String, // si cal
})

export default mongoose.model('Event', eventSchema)

