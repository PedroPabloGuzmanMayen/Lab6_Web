import express from 'express'
import { getPosts } from './db'

const app = express()
const port = 22111
app.get('/', async (req, res) => {
  console.log('All post: ', await getPosts())
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
