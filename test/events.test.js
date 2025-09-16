// test/events.test.js
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/server.js' // ✅ Importa el servidor

import Event from '../models/Event.js'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe('Events API', () => {
  it('hauria de crear un esdeveniment', async () => {
    const newEvent = {
      id: 'test-id',
      title: 'Prova Jest',
      start: '2025-10-01T10:00:00',
      end: '2025-10-01T11:00:00',
      backgroundColor: '#ff0000'
    }

    const res = await request(app)
      .post('/api/events')
      .send(newEvent)
      .expect(201)

    expect(res.body.title).toBe(newEvent.title)

    const eventInDB = await Event.findOne({ id: newEvent.id })
    expect(eventInDB).not.toBeNull()
  })
})
