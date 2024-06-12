/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorhandler from './middleware/globalErrorhandler'
import notFoundHandler from './middleware/notFound'
import routes from './routes'
const app: Application = express()

app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1', routes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'PH University app is running',
  })
})

//global error handler
app.use(globalErrorhandler)

//not found route
app.use(notFoundHandler)

export default app
