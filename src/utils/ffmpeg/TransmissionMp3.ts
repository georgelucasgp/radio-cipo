import { spawn } from "child_process"

export const initTransmission = (url?: string, port?: number) => {
  console.log('transmissão iniciada')
  const songs = [
    '/home/lucas-dev/LucasDev/Projeto-de-estudos/radio-cipo/media/convert/aux.mp3',
    '/home/lucas-dev/LucasDev/Projeto-de-estudos/radio-cipo/media/convert/favela.mp3'
  ]
  let currentSong = 0
  let ffmpeg: any
  const playNextSong = () => {
    if (currentSong === songs.length) {
      console.log('All songs have been played.')
      return
    }
    console.log('a música', songs[currentSong])
    // ffmpeg = spawn('ffmpeg', ['-i', songs[currentSong], '-f', 'ogg', '-listen', '1', 'http://localhost:8000/stream'])
    ffmpeg = spawn('ffmpeg', [
    '-i', songs[currentSong],
    '-f', 'mp3',
    '-acodec', 'libmp3lame',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'rtp',
    `rtp://0.0.0.0:8080`
  ])


    // ffmpeg.stderr.on('data', (data) => {
    //   console.error(`FFmpeg stderr: ${data}`)
    // })

    ffmpeg.on('close', (code) => {
      // console.log(`FFmpeg process exited with code ${code}`)
      console.log('A musica terminou')
      currentSong += 1
      playNextSong()
    })
  }
  playNextSong()

  // const ffmpeg = spawn('ffmpeg', [
  //   '-i', `${url}`,
  //   '-f', 'mp3',
  //   '-acodec', 'libmp3lame',
  //   '-b:a', '128k',
  //   '-ar', '44100',
  //   '-f', 'rtp',
  //   `rtp://0.0.0.0:${port}`
  // ])

  // ffmpeg.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`)
  // })

  // ffmpeg.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`)
  // })

  // ffmpeg.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`)
  // })
}