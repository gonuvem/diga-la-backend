import { UploadApiResponse, UploadApiOptions } from 'cloudinary'
import { Readable } from 'stream'

import * as cloudinary from './cloudinary'
import { CLOUDINARY_ERROR } from '../../../middlewares/errorHandling/errors'

export const uploadStream = async (stream: Readable, options: UploadApiOptions)
: Promise<UploadApiResponse> => {
  try {
    return await cloudinary.uploadStream({ stream, options })
  } catch (error) {
    const message = error.message || JSON.stringify(error, null, 2)

    console.error(`Erro no upload de imagem via Cloudinary: ${message}`)

    throw CLOUDINARY_ERROR
  }
}
