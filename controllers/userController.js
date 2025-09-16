import User from '../models/User.js'
import Location from '../models/Location.js'
import fetch from 'node-fetch' // Amb Node >=18 no cal instal·lar res

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error('❌ Error obtenint usuaris:', error)
    res.status(500).json({ message: 'Error al obtenir els usuaris' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true })

    if (!updated) return res.status(404).json({ message: 'Usuari no trobat' })

    res.status(200).json(updated)
  } catch (error) {
    console.error('❌ Error actualitzant usuari:', error)
    res.status(500).json({ message: 'Error al actualitzar l’usuari' })
  }
}

export const createUser = async (req, res) => {
  console.log('📩 Rebut:', req.body)

  try {
    console.log('🔍 BODY REBUT:', req.body)
    const { first, last, email, phone, location, hobby } = req.body

    if (!first || !last || !email || !phone || !location || !hobby) {
          return res.status(400).json({ message: 'Falten camps obligatoris' })
        }

    // Geocodificació...
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    const geoRes = await fetch(geocodeUrl, {
      headers: { 'User-Agent': 'inprocode-app' }
    })

    const geoData = await geoRes.json()

    if (!geoData.length) {
      return res.status(400).json({ message: 'Ubicació no trobada' })
    }

    const { lat, lon } = geoData[0]

    const newUser = new User({
      first,
      last,
      email,
      phone,
      location,
      hobby
    })

    const savedUser = await newUser.save()

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


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) return res.status(404).json({ message: 'Usuari no trobat' })

    await Location.deleteOne({ userId: id })

    res.status(200).json({ message: 'Usuari i ubicació eliminats correctament' })
  } catch (error) {
    console.error('❌ Error eliminant usuari:', error.message)
    res.status(500).json({ message: 'Error intern del servidor' })
  }
}
