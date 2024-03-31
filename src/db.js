import conn from './conn.js'

// Con esta función se obtienen todos los posts de la base de datos
export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}
// Con esta func
export async function modifyPostByID(id, title, content) {
  if (title === '') {
    return conn.query('UPDATE blog_posts SET content = ? WHERE id = ?', [content, id])
  }
  if (content === '') {
    return conn.query('UPDATE blog_posts SET title = ? WHERE id = ?', [title, id])
  }

  return conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, id])
}

export async function newPost(title, content, image) {
  if (image === '') {
    return conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
  }

  return conn.query('INSERT INTO blog_posts (title, content, banner) VALUES (?, ?, ?)', [title, content, image])
}

export async function getPostbyID(id) {
  return conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
}

export async function deletePost(id) {
  return conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
}
