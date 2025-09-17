import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  category: { type: String, default: 'restaurant' }
})



const Location = mongoose.model('Location', locationSchema)
export default Location
