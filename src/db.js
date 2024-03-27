import conn from './conn'

export async function getPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_starwars')
  return rows
}

export function modifyPostByID(id, title, content) {
  return conn.query('UPDATE blog_starwars SET title = ?, content = ? WHERE id = ?', [title, content, id])
}
