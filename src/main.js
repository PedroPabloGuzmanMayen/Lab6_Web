import express from 'express'
import { getPosts } from './db.js'

const app = express()
const port = 22111
app.get('/Posts', async (req, res) => {
  res.status(200).json(await getPosts())
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
