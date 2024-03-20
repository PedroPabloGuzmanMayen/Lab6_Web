import express from 'express'
import {getPosts} from './db.js'

const app = express()
const port = 22111
app.get('/', async (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
