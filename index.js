import app from "./server.js"
import mongodb from "mongodb"
import reviewsDAO from "./dao/reviewsDAO.js"

const mongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@reviewstore.10hc8.mongodb.net/?retryWrites=true&w=majority&appName=ReviewStore`

const port = 8000

mongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await reviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })