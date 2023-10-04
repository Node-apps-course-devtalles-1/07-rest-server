import bcryptjs from 'bcryptjs'
import { response } from 'express'
import User from '../models/user.js'
import { generateJWT } from '../helpers/generateJWT.js'
import { googleVerify } from '../helpers/google-verify.js'

export const login = async (req, res = response) => {
  const { email, password } = req.body


  try {
    const userFind = await User.findOne({ email })
    // validar password
    const validPassword = bcryptjs.compareSync(password, userFind.password)

    if (!validPassword) {
      return res.status(400).json({
        msg: 'user or password incorrect !!'
      })
    }

    const token = await generateJWT(userFind.id)
    res.json({
      user: userFind,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error: something went wrong'
    })
  }
}

export const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body

  try {
    const { name, email, img } = await googleVerify(id_token)

    let userFind = await User.findOne({ email })


    let userToCreate = null
    let userCreated = null
    if (!userFind) {
      const data = {
        name,
        email,
        img,
        password: 'XD',
        google: true,
        role: 'ADMIN_ROLE'
      }
      userToCreate = new User(data)
      userCreated = await userToCreate.save()
    }

    if (!userFind.status) {
      return res.status(401).json({
        msg: 'User blocked - contact administrator'
      })
    }

    // const token = await generateJWT(user.id)

    res.json({
      data: userCreated || userFind || null
      // token
    })
  } catch (err) {
    console.log({ err })
    res.json(400).json({
      msg: 'Token could not be verified '
    })
  }
}
