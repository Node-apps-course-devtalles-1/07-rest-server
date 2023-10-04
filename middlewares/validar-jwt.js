import jwt from 'jsonwebtoken'
import { response } from 'express'
import User from '../models/user.js'
import mongoose from 'mongoose'

export const validateJWT = async (req, res = response, next) => {
  const token = req.header('x-token')
  //   console.log(token)

  if (!token) {
    return res.status(401).json({
      msg: 'missing token on request !'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY)
    const idMongo = new mongoose.Types.ObjectId(uid)

    const userFind = await User.findById(idMongo)

    if (!userFind) {
      return res.status(401).json({
        msg: 'Token invalid !! - user no registered on DB'
      })
    }

    if (!userFind.status) {
      return res.status(401).json({
        msg: 'Token invalid !! - status :: false'
      })
    }
    req.userAuthenticated = userFind
    next()
  } catch (error) {
    console.log({ error })
    res.status(401).json({
      msg: 'Invalid token !!'
    })
  }
}

export default {
  validateJWT
}
