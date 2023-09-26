import { response, request } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const usersGet = (req = request, res = response) => {
  const query = req.query
  res.json({ mgs: 'get API - controller', query })
}

export const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body

  const user = new User({ name, email, password, role })

  // verify if exist
  const existEmail = await User.findOne({ email })

  if (existEmail) {
    return res.status(400).json({
      msg: 'This email is already register'
    })
  }

  // encrypt
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.status(201).json({ user })
}

export const usersPut = (req, res) => {
  const { id } = req.params
  res.status(500).json({ mgs: 'put API - controller', id })
}

export const usersDelete = (req, res) => {
  res.json({ mgs: 'delete API - controller' })
}
