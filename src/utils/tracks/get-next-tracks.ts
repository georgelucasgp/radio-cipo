import * as fs from 'fs'

export const nextTracks = () => {
  const track = fs.readdirSync('media/covert')

  let readTrack = fs.readFileSync(track[0])

  return readTrack
}