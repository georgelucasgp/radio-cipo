import { Injectable } from '@nestjs/common';
import { CreateRadioDto } from './dto/create-radio.dto';
import { UpdateRadioDto } from './dto/update-radio.dto';
import * as fs from 'fs';
import * as ytdl from 'ytdl-core';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const baseUrl = 'https://www.youtube.com/watch?v=';

@Injectable()
export class RadioService {
  create(createRadioDto: CreateRadioDto) {
    const { videoId } = createRadioDto;
    const date = Date.now();

    ytdl(`${baseUrl}${videoId}`, { filter: 'audioonly' }).pipe(
      fs.createWriteStream(`videos/${date}.mp4`).on('finish', () =>
        ffmpeg(fs.createReadStream(`videos/${date}.mp4`))
          .format('mp3')
          .on('error', (err) => {
            console.log('an error happened: ' + err.message);
            console.log(`videos/${date}.mp4`);
          })
          .save(`audios/${date}.mp3`)
          .on('end', () => {
            console.log('file has been converted succesfully');
            fs.rmSync(`videos/${date}.mp4`);
          }),
      ),
    );
  }

  findAll() {
    return `This action returns all radio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} radio`;
  }

  update(id: number, updateRadioDto: UpdateRadioDto) {
    return `This action updates a #${id} radio`;
  }

  remove(id: number) {
    return `This action removes a #${id} radio`;
  }
}
