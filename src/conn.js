import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'ppgm',
  database: 'blog_starwars',
  password: 'hola',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
