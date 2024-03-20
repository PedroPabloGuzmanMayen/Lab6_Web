import express from 'express'
import {getPosts} from './db.js'

const app = express()
const port = 3000
app.get('/', async (req, res) => {
  console.log( await db.getPosts())
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
