import conn from './conn.js'

export async function getPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts')
    return rows
}