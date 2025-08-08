const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).send('没有 token')

  jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
    if (err) return res.status(403).send('Token 无效')
    req.user = decoded
    next()
  })
}
