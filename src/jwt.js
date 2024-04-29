import jwt from 'jsonwebtoken'

const secret = 'jijijijijajajaja'

const generateToken = (username) => {
    const payload = { username }
    return jwt.sign(payload, secret, { expiresIn: '2h', algorithm: 'HS256' })
}

const validateToken = (token) => {
    return jwt.verify(token, secret)
}

export { generateToken, validateToken }
