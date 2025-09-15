import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://enricabadrovira:fKBOmXPD7wUsbmxu@cluster0.fn76wlg.mongodb.net/inprocode?retryWrites=true&w=majority&appName=Cluster0';


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
