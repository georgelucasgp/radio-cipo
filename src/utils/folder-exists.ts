import * as fs from 'fs'

export const folderExists = async () => {

  if (!fs.existsSync('media/videos')) {
    fs.mkdirSync('media/videos', { recursive: true })
  }

  if (!fs.existsSync('media/convert')) {
    fs.mkdirSync('media/convert', { recursive: true })
  }

}