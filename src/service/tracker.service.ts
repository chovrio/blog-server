import TrackerModel from '../model/tracker.model'

export const findTrackDate = async (name: string, id: string) => {
  const res = await TrackerModel.findOne({ name, id })
  return res
}
export const createTrack = async (name: string, id: string) => {
  const res = await TrackerModel.create({
    name,
    id
  })
  return res
}
