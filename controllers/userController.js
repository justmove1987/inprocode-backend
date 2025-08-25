import User from '../models/User.js'

export const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

export const createUser = async (req, res) => {
  console.log('Dades rebudes:', req.body) // <-- Comprovació
  const user = new User(req.body)
  const saved = await user.save()
  res.status(201).json(saved)
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const updated = await User.findByIdAndUpdate(id, req.body, { new: true })
  res.json(updated)
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  await User.findByIdAndDelete(id)
  res.sendStatus(204)
}
