import express from 'express'
import {
  getPosts, newPost, getPostbyID, modifyPostByID, deletePost,
} from './db.js'
import fs from 'fs';

const app = express()
const port = 22111
//Con esta función se guardan todas las request y response en un archivo txt (20 puntos)
const logger = (req, res, next) => {
  fs.appendFileSync('log.txt', `Request: ${req.method} ${req.url} Response: ${res} at ${new Date().toISOString()}\n`)
  next()
}
app.use(logger)

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
app.get('/Posts/:id', async (req, res) => {
  try {
    const { id } = req.body
    res.status(200).json(await getPostbyID(id))
  } catch (e) {
    res.status(500).send('Ha ocurrido un error, el lado oscuro ha triunfado :( (*suena la marcha imperial*)')
  }
})
app.post('/newPost', async (req, res) => {
  try {
    console.log(req.body)
    const {
      title, content, image, author,
    } = req.body
    console.log('Title:', title, 'Content:', content, 'Image:', image, 'Author:', author)
    await newPost(title, content, image, author)
    res.status(200).send('Post creado correctamente :) (*suena la canción de throne room [escena de la entrega de medallas en el ep. 4]*)')
  } catch (e) {
    res.status(500).send('Error :(')
  }
})
app.put('/modifyPost/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, image, content } = req.body
    await modifyPostByID(id, title, content, image)
    res.status(200).json(await getPostbyID(id))
  } catch (e) {
    res.status(500).send('Error :(')
  }
})
app.delete('/deletePost/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deletePost(id)
    res.status(200).send('Post eliminado correctamente')
  } catch (e) {
    res.status(500).send('Error :(')
  }
})
//Verificación si el endpoint is valido (15 puntos)
app.use((req, res, next) => {
  res.status(400).send('400 bad request');
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
