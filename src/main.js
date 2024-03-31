import express from 'express'
import { getPosts } from './db.js'

const app = express()
const port = 22111
app.get('/', (req, res) => {
  res.send('Hello from a galaxy far far away!')
})
app.get('/Posts', async (req, res) => {
  try {
    res.status(200).json(await getPosts())
  }
  catch (e) {
    res.status(500).send('Ha ocurrido un error, el lado oscuro ha triunfado :( (*suena la marcha imperial*)')
  }
})
app.post('/newPost', (req, res) => {
  

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
