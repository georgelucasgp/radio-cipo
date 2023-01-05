import { Injectable } from '@nestjs/common';
import { CreateRadioDto } from './dto/create-radio.dto';
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

function downloadVideoAndConvertToMP3(videoId: string, title: string) {
  ytdl(`${baseUrl}${videoId}`, { filter: 'audioonly' }).pipe(
    fs
      .createWriteStream(`media/videos/${title}.mp4`)
      .on('finish', () => convertVideoToMP3(title)),
  );
}

function convertVideoToMP3(title: string) {
  ffmpeg(fs.createReadStream(`media/videos/${title}.mp4`))
    .format('mp3')
    .on('error', (err) => {
      console.log('an error happened: ' + err.message);
    })
    .save(`media/convert/${title}.mp3`)
    .on('end', () => {
      console.log('file has been converted succesfully');
      fs.rmSync(`media/videos/${title}.mp4`);
    });
}

@Injectable()
export class RadioService {
  async create(createRadioDto: CreateRadioDto) {
    const { videoId } = createRadioDto;
    const info = await ytdl.getInfo(videoId);
    const title = info.videoDetails.title;
    // const date = Date.now();
    checkFoldersExist();
    downloadVideoAndConvertToMP3(videoId, title);
  }
}
