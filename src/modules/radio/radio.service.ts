import { Injectable } from '@nestjs/common';
import { CreateRadioDto } from './dto/create-radio.dto';
import { UpdateRadioDto } from './dto/update-radio.dto';
import * as fs from 'fs';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import { path } from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(path);
const baseUrl = 'https://www.youtube.com/watch?v=';

function checkFoldersExist() {
  if (!fs.existsSync('media/videos'))
    fs.mkdirSync('media/videos', { recursive: true });
  if (!fs.existsSync('media/convert'))
    fs.mkdirSync('media/convert', { recursive: true });
}

function downloadVideoAndConvertToMP3(videoId: string, date: number) {
  ytdl(`${baseUrl}${videoId}`, { filter: 'audioonly' }).pipe(
    fs
      .createWriteStream(`media/videos/${date}.mp4`)
      .on('finish', () => convertVideoToMP3(date)),
  );
}

function convertVideoToMP3(date: number) {
  ffmpeg(fs.createReadStream(`media/videos/${date}.mp4`))
    .format('mp3')
    .on('error', (err) => {
      console.log('an error happened: ' + err.message);
    })
    .save(`media/convert/${date}.mp3`)
    .on('end', () => {
      console.log('file has been converted succesfully');
      fs.rmSync(`media/videos/${date}.mp4`);
    });
}

@Injectable()
export class RadioService {
  create(createRadioDto: CreateRadioDto) {
    const { videoId } = createRadioDto;
    const date = Date.now();

    checkFoldersExist();

    downloadVideoAndConvertToMP3(videoId, date);
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
