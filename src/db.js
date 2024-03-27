import conn from './conn'

export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

export function modifyPostByID(id, title, content) {
  return conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, id])
}
