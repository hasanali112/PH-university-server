import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './module/student/student.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/student', studentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose server is running')
})

export default app
