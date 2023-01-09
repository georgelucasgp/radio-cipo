import * as ytdl from 'ytdl-core'

export const infoVideo = async (videoId: string) => {
  const info = await ytdl.getInfo(videoId)
  console.log('info video', info)

  const response = {
    videoDetails: {
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      lengthSecondes: info.videoDetails.lengthSeconds,
      videoId: info.videoDetails.videoId
    }
  }

  return response
}