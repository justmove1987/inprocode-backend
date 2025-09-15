import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import eventsRoutes from './routes/events.js'
import pluginRoutes from './routes/pluginRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(
  cors({
    origin: 'https://inprocode-frontend-rt1g.vercel.app', // ✅ CAMBIA si tu frontend tiene otro dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())

app.use('/api/plugins', pluginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escoltant al port num ${PORT}`)
})
