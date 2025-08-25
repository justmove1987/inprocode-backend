import mongoose from 'mongoose'

const pluginSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    version: String,
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Plugin = mongoose.model('Plugin', pluginSchema)
export default Plugin

