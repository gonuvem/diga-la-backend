export default {
  /** https://mongoosejs.com/docs/deprecations.html */
  MONGOOSE_OPTS: {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  URI: process.env.MONGODB_URI
}
