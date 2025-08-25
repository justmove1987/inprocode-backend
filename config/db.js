import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connexió amb MongoDB establerta')
  } catch (error) {
    console.error('❌ Error de connexió:', error)
    process.exit(1)
  }
}

export default connectDB
