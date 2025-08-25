import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  category: String,
})



const Location = mongoose.model('Location', locationSchema)
export default Location
