import User from '../models/User.js'
import Location from '../models/Location.js'
import fetch from 'node-fetch' // Si fas servir Node >=18 no cal instal·lar-ho

export const registerUser = async (req, res) => {
  try {
    const { name, email, location } = req.body

    if (!name || !email || !location) {
      return res.status(400).json({ message: 'Nom, email i ubicació són obligatoris' })
    }

    // 🔎 1. Convertir ciutat a coordenades (usant Nominatim API gratuïta)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    const geoRes = await fetch(geocodeUrl, {
      headers: {
        'User-Agent': 'inprocode-app'
      }
    })
    const geoData = await geoRes.json()

    if (!geoData.length) {
      return res.status(400).json({ message: 'Ubicació no trobada' })
    }

    const { lat, lon } = geoData[0]

    // ✅ 2. Crear usuari
    const newUser = new User({ name, email, location })
    const savedUser = await newUser.save()

    // ✅ 3. Crear ubicació associada
    const newLocation = new Location({
      userId: savedUser._id,
      name: location,
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    })
    await newLocation.save()

    res.status(201).json({
      user: savedUser,
      location: newLocation
    })
  } catch (error) {
    console.error('❌ Error creant usuari:', error)
    res.status(500).json({ message: 'Error al crear l’usuari' })
  }
}


