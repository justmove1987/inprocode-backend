import User from '../models/User.js'
import Location from '../models/Location.js'
import fetch from 'node-fetch' // Amb Node >=18 no cal instal·lar-ho, però inclòs per compatibilitat


export const getUsers = async (req, res) => {
  try {
    const users = await User.find() // Pots afegir .populate('location') si vols incloure la ubicació
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  } 
}

export const createUser = async (req, res) => {
  console.log('📩 Rebut:', req.body)

  try {
    const { name, email, location, hobby, phone } = req.body

    // 🔒 Validació bàsica
    if (!name || !email || !location || !hobby || !phone) {
      return res.status(400).json({ message: 'Nom, email, ubicació, hobby i telèfon són obligatoris' })
    }

    // 🌍 Geocodificació de la ciutat (usant Nominatim API d'OpenStreetMap)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    const geoRes = await fetch(geocodeUrl, {
      headers: {
        'User-Agent': 'inprocode-app' // Important per evitar errors 403
      }
    })

    const geoData = await geoRes.json()

    if (!geoData.length) {
      return res.status(404).json({ message: 'Ubicació no trobada' })
    }

    const { lat, lon } = geoData[0]

    // 👤 Crear usuari
    const newUser = new User({ name, email, location })
    const savedUser = await newUser.save()

    // 📍 Crear ubicació associada
    const newLocation = new Location({
      userId: savedUser._id,
      name: location,
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    })
    await newLocation.save()

    // ✅ Resposta final
    res.status(201).json({
      user: savedUser,
      location: newLocation
    })

  } catch (error) {
    console.error('❌ Error creant usuari i ubicació:', error.message)
    res.status(500).json({ message: 'Error intern del servidor' })
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


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Esborra usuari
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) return res.status(404).json({ message: 'Usuari no trobat' })

    // També elimina la seva ubicació associada
    await Location.deleteOne({ userId: id })

    res.status(200).json({ message: 'Usuari i ubicació eliminats correctament' })
  } catch (error) {
    console.error('❌ Error eliminant usuari:', error.message)
    res.status(500).json({ message: 'Error intern del servidor' })
  }
}
