import mongoose from 'mongoose'
const trackerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true
  },
  pv: {
    type: Number,
    require: true,
    default: 1
  },
  createTime: {
    type: Number,
    require: true
  },
  updateTime: {
    type: Number,
    require: true
  }
})
const TrackerModel = mongoose.model('Tracker', trackerSchema)
export default TrackerModel
