// models/Event.js
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  start: String,
  end: String,
  backgroundColor: String,
  userId: String
})


export default mongoose.model('Event', eventSchema)

