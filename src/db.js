import conn from './conn.js'

// Con esta función se obtienen todos los posts de la base de datos
export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}
// Con esta función podemos modificar un post dado su ID
export async function modifyPostByID(id, title, content, image) {
  //Modificar imagen y contenido pero no el título
  if (title === '' && content !== '' && image !== '') {
    const [res] =  await conn.query('UPDATE blog_posts SET content = ?, banner = ? WHERE id = ?', [content, image, id])
    return res
  }
  //Modificar el título y el contenido pero no la imagen
  else if (content !== '', title !== '' && image === '') {
    const [res] = conn.query('UPDATE blog_posts SET banner = ? WHERE id = ?', [image, id])
    return res
  }
  //Modificar el título y la imagen pero no el contenido
  else if (content === '' && image !== '' && title !== '') {
    const [res] = conn.query('UPDATE blog_posts SET title = ?, banner = ? WHERE id = ?', [title, image, id])
    return res
  }
  //Modificar solo el contenido
  else if (content !== '' && image === '' && title === '') {
    const [res] = conn.query('UPDATE blog_posts SET content = ? WHERE id = ?', [content, id])
    return res
  }
  //Modificar solo el título
  else if (content === '' && image === '' && title !== '') {
    const [res] = conn.query('UPDATE blog_posts SET title = ? WHERE id = ?', [title, id])
    return res
  }
  //Modificar solo la imagen
  else if (content === '' && image !== '' && title === '') {
    const [res] = conn.query('UPDATE blog_posts SET banner = ? WHERE id = ?', [image, id])
    return res
  }
  //Modificar todo el post
  else {
    const [res] = conn.query('UPDATE blog_posts SET title = ?, content = ?, banner = ? WHERE id = ?', [title, content, image, id])
    return res
  }

  
}
// Con esta función se crea un nuevo post, se deben verificar los valores que se desean modificar
export async function newPost(title, content, image, author) {
  try {
    const [rows] = await conn.query('INSERT INTO blog_posts (title, content, banner, author) VALUES (?, ?, ?, ?)', [title, content, image, author])
    return rows
  } catch (error) {
    console.error('Error creating new post:', error)
    throw error // Re-throw the error to be caught by the caller
  }
}

// Con esta función se obtiene un post dado su ID
export async function getPostbyID(id) {
  return conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
}
// Con esta función se elimina un post dado su ID
export async function deletePost(id) {
  return conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
}
