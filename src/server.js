// src/server.js
import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/userRoutes.js'
import locationRoutes from '../routes/locationRoutes.js'
import eventsRoutes from '../routes/events.js'
import pluginRoutes from '../routes/pluginRoutes.js'

const app = express()

const allowedOrigins = [
  'https://inprocode-frontend.vercel.app',
  'https://inprocode-frontend-rt1g.vercel.app',
  'http://localhost:5173',
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(express.json())

app.use('/api/plugins', pluginRoutes)
app.use('/api/users', userRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/events', eventsRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

export default app
