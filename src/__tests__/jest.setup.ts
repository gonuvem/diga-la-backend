import mongoose from 'mongoose'
import dbConfig from '../db/config'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, dbConfig.MONGOOSE_OPTS)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})
