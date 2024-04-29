import express from 'express'
import fs from 'fs'
import cors from 'cors'


import {
  getPosts, newPost, getPostbyID, modifyPostByID, deletePost, login, register,
  // eslint-disable-next-line import/extensions
} from './db.js'

import {generateToken, validateToken} from './jwt.js'

const app = express()
const port = 22111
// Con esta función se guardan todas las request y response en un archivo txt (20 puntos)
const logger = (req, res, next) => {
  fs.appendFileSync('log.txt', `Request: ${req.method} ${req.url} Response: ${res} at ${new Date().toISOString()}\n`)
  next()
}
app.use(logger)

//Soporte para cors (10 puntos)
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Adjust this to the appropriate origin of your frontend application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

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
    const { id } = req.params
    res.status(200).json(await getPostbyID(id))
  } catch (e) {
    res.status(500).send('Ha ocurrido un error, el lado oscuro ha triunfado :( (*suena la marcha imperial*)')
  }
})
app.post('/newPost', async (req, res) => {
  try {
    const {
      title, content, image, author,
    } = req.body
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await login(username, password)
  if (user) {
    const token = generateToken(user[0].username)
    res.status(200).json({ 'success': true, access_token: token, user: username })
  } else {
    res.status(401).json({'success': false})
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await register(username, password)
  if (user) {
    res.status(200).json({'success': true, user: username })
  } else {
    res.status(401).json({'success': false})
  }
})

// Verificación si el endpoint is valido (15 puntos)
app.use((req, res) => {
  res.status(400).send('400 bad request')
})
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`)
})
