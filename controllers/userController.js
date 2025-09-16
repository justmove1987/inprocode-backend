import User from '../models/User.js'
import Location from '../models/Location.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, location } = req.body

    const newUser = new User({ name, email })
    const savedUser = await newUser.save()

    if (location?.lat && location?.lng) {
      const newLocation = new Location({
        userId: savedUser._id,
        name: savedUser.name,
        lat: location.lat,
        lng: location.lng
      })
      await newLocation.save()
    }

    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error creant usuari:', error)
    res.status(500).json({ message: 'Error al crear l’usuari' })
  }
}

