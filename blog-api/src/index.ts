import express, { Application } from 'express'
import blogRoutes from '../src/routes/blogs'
import cors from 'cors';

const app: Application = express()
const port: number = 3100

// app.use routes takes url and routes object. now to access routes root url you need to access /api
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use('/api', blogRoutes)

// use this function to map your app to a port
app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})

export default app
