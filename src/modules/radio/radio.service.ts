import { Injectable } from '@nestjs/common'
import { title } from 'process'
import { folderExists } from 'src/utils'
import { downloadVideoAndConvertToMP3 } from 'src/utils/ytdl/download-and-convert-video'
import { infoVideo } from 'src/utils/ytdl/info-video'

import { CreateRadioDto } from './dto/create-radio.dto'

@Injectable()
export class RadioService {
  async create(createRadioDto: CreateRadioDto) {
    const { videoUrl } = createRadioDto

    const videoId = videoUrl.split('=')[1]


    const informationVideo = await infoVideo(videoId)

    await folderExists()
    console.log('as folder existe')
    
    await downloadVideoAndConvertToMP3(videoId, informationVideo.videoDetails.title)
    console.log('download concluido')
  }
}
