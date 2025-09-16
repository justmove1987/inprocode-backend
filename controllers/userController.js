import User from '../models/User.js'
import Location from '../models/Location.js'
import fetch from 'node-fetch' // si fas servir Node >=18 ja està inclòs

export const registerUser = async (req, res) => {
  console.log('📩 Rebut:', req.body)

  try {
    const { first, last, email, phone, location, hobby } = req.body

    if (!first || !last || !email || !phone || !location || !hobby) {
      return res.status(400).json({ message: 'Falten camps obligatoris' })
    }

    // 🔁 Geocodificació amb OpenStreetMap
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    const geoRes = await fetch(geocodeUrl, {
      headers: { 'User-Agent': 'inprocode-app' }
    })

    const geoData = await geoRes.json()

    if (!geoData.length) {
      return res.status(400).json({ message: 'Ubicació no trobada' })
    }

    const { lat, lon } = geoData[0]

    // 🧑 Crear usuari amb totes les dades
    const newUser = new User({
      first,
      last,
      email,
      phone,
      location, // ciutat o nom
      hobby
    })

    const savedUser = await newUser.save()

    // 📍 Crear punt al mapa
    const newLocation = new Location({
      userId: savedUser._id,
      name: `${first} ${last}`,
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    })

    await newLocation.save()

    res.status(201).json({
      message: 'Usuari i ubicació creats correctament',
      user: savedUser,
      location: newLocation
    })
  } catch (error) {
    console.error('❌ Error al crear usuari:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
