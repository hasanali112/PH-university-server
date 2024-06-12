import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Ph university app running is port : ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
