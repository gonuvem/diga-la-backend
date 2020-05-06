/**
 * https://cloudinary.com/documentation/node_integration
 */
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse
} from 'cloudinary'
import { Readable } from 'stream'

/**
 * https://support.cloudinary.com/hc/en-us/community/posts/360031762832-graphql-upload-with-cloudinary
 */
export const uploadStream = async (
  { stream, options }: { stream: Readable, options: UploadApiOptions })
  : Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const streamLoad = cloudinary.uploader
      .upload_stream(options, (error, image) => {
        return error ? reject(error) : resolve(image)
      })

    stream.pipe(streamLoad)
  })
