import { path } from '@ffmpeg-installer/ffmpeg'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'

ffmpeg.setFfmpegPath(path)
export const convertVideoToMP3 = (title: string) => {
  const nameConvertMP3 = `media/convert/${title}.mp3`
  const removeConvertMP4 = `media/videos/${title}.mp4`
  const readFile = fs.createReadStream(`media/videos/${title}.mp4`)

  ffmpeg(readFile)
    .format('mp3')
    .on('error', (err) => {
      console.log('an error happened: ' + err.message)
    })
    .save(nameConvertMP3)
    .on('end', () => {
      console.log('file has been converted succesfully')
      fs.rmSync(removeConvertMP4)
    })
}