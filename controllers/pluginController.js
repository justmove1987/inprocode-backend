import Plugin from '../models/Plugin.js'

// GET /api/plugins
export const getAllPlugins = async (req, res) => {
  const plugins = await Plugin.find()
  res.json(plugins)
}

// POST /api/plugins
export const createPlugin = async (req, res) => {
  const { name, description, version } = req.body
  const newPlugin = new Plugin({ name, description, version })
  const saved = await newPlugin.save()
  res.status(201).json(saved)
}

