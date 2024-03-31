import conn from './conn.js'

// Con esta función se obtienen todos los posts de la base de datos
export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}
// Con esta función podemos modificar un post dado su ID
export async function modifyPostByID(id, title, content) {
  if (title === '') {
    return conn.query('UPDATE blog_posts SET content = ? WHERE id = ?', [content, id])
  }
  else if (content === '') {
    return conn.query('UPDATE blog_posts SET title = ? WHERE id = ?', [title, id])
  }
  else{
    return conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, id])
  }
  
}
//Con esta función se crea un nuevo post, se deben verificar los valores que se desean modificar
export async function newPost(title, content, image) {
  try {
    if (image === '') {
      return conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
    } else {
      return conn.query('INSERT INTO blog_posts (title, content, banner) VALUES (?, ?, ?)', [title, content, image])
    }
  } catch (error) {
    console.error('Error creating new post:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

//Con esta función se obtiene un post dado su ID
export async function getPostbyID(id) {
  return conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
}
//Con esta función se elimina un post dado su ID
export async function deletePost(id) {
  return conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
}
