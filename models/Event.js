import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  id: String,
  title: String,
  start: String,
  end: String,
  backgroundColor: String,
})

export default mongoose.model('Event', eventSchema)

