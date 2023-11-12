import jwt from 'jsonwebtoken'
import User from '../Models/users.js'
import dotenv from 'dotenv'

dotenv.config()

const authorise = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      
      token = req.headers.authorization.split(' ')[1]
      console.log(token);
      const decoded = jwt.verify(token, process.env.SECRET)
      req.user = await User.findByPk(decoded.id)

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      res.json('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    res.json('Not authorized, no token')
  }
}

export default authorise
