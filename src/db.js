import conn from './conn.js'

export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

export function modifyPostByID(id, title, content) {
  return conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, id])
}

export function newPost(title, content, image){
  if (image === undefined){
    return conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
  }
  return conn.query('INSERT INTO blog_posts (title, content, banner) VALUES (?, ?, ?)', [title, content, image])
}