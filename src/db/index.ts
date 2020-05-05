import mongoose from 'mongoose'
import dbConfig from './config'

export default mongoose.connect(dbConfig.URI, dbConfig.MONGOOSE_OPTS)
