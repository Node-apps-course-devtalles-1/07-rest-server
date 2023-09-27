import { response, request } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

export const usersGet = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query
  const query = { status: true }
  // const users = await User.find(query).skip(Number(skip)).limit(Number(limit))

  // const total = await User.countDocuments(query)

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(skip)).limit(Number(limit))
  ])
  res.json({ total, users })
}

export const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body

  const user = new User({ name, email, password, role })

  // encrypt
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.status(201).json({ user })
}

export const usersPut = async (req, res) => {
  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body
  // validar with DB

  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const idMongo = new mongoose.Types.ObjectId(id)

  const user = await User.findOneAndUpdate(idMongo, rest)
  res.json({ user })
}

export const usersDelete = async (req, res) => {
  const { id } = req.params

  // borrando fisicamente
  // const user = await User.findByIdAndDelete(id)

  // change state user
  const user = await User.findByIdAndUpdate(id, { status: false })
  res.json({ user })
}
