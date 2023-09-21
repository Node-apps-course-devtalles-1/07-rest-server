import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/users.js'
import { dbConnection } from '../database/config.js'

export class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/users'
    // connect DB
    this.connectDB()
    // midlewares
    this.middlewares()
    // rutas de mi app
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    // cors
    this.app.use(cors())

    // lectura y parseo del body
    this.app.use(express.json())
    // public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usuariosPath, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }
}
