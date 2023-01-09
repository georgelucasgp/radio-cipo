import * as fs from 'fs'
import * as ytdl from 'ytdl-core'
import { convertVideoToMP3 } from '../ffmpeg/convert-video-to-mp3'

export const downloadVideoAndConvertToMP3 = async (videoId: string, title: string) => {
  const urlVideo = `https://www.youtube.com/watch?v=${videoId}`

  ytdl(urlVideo, { filter: 'audioonly' }).pipe(
    fs
      .createWriteStream(`media/videos/${title}.mp4`)
      .on('finish', () => convertVideoToMP3(title)),
  )
}