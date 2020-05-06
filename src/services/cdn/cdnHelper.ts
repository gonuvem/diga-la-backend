import { Readable } from 'stream'

import { uploadStream } from './cloudinary'

/** https://www.apollographql.com/blog/file-uploads-with-apollo-server-2-0-5db2f3f60675#File-upload-with-schema-param */
type ApolloFile = {
  /** Função para criar o stream */
  createReadStream: () => Readable
  /** The name of the uploaded file(s). */
  filename: string,
  /** The MIME type of the file(s) such as text/plain, application/octet-stream,
   *  etc. */
  mimetype: string,
  /** The file encoding such as UTF-8. */
  encoding: string
}

export const uploadOneImageUsingApolloStream = async (file: Promise<ApolloFile>,
  options = '{}'): Promise<{ file: Partial<ApolloFile>, response: string }> => {
  const { createReadStream, filename, mimetype, encoding } = await file

  const stream = createReadStream()

  const image = await uploadStream(stream, JSON.parse(options))

  return {
    file: { filename, mimetype, encoding },
    response: JSON.stringify(image)
  }
}
