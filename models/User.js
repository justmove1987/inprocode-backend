import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    first: String,
    last: String,
    email: String,
    phone: String,
    location: String,
    hobby: String,
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User

