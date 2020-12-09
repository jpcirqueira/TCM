/* eslint-disable no-console */
import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import './database'
import cors from 'cors'
import routes from './routes'
import AppError from './errors/appError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(3333, () => {
  console.log('Server Started on port 3333')
})
