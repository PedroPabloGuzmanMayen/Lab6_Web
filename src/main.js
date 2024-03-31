import express from 'express'
import { getPosts, newPost} from './db.js'

const app = express()
const port = 22111
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello from a galaxy far far away!')
})
app.get('/Posts', async (req, res) => {
  try {
    res.status(200).json(await getPosts())
  } catch (e) {
    res.status(500).send('Ha ocurrido un error, el lado oscuro ha triunfado :( (*suena la marcha imperial*)')
  }
})
app.post('/newPost', async (req, res) => {
  
  try {
    console.log(req.body)
    const { title, content, image, author } = req.body
    console.log('Title:', title, 'Content:', content, 'Image:', image, 'Author:', author)
    await newPost(title, content, image, author)
    res.status(200).send('Post creado correctamente :) (*suena la canción de throne room [escena de la entrega de medallas en el ep. 4]*)')
  } catch(e) {
    res.status(500).send('Error :(')
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
