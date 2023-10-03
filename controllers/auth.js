import bcryptjs from 'bcryptjs'
import { response } from 'express'
import user from '../models/user.js'
import { generateJWT } from '../helpers/generateJWT.js'

export const login = async (req, res = response) => {
  const { email, password } = req.body

  console.log({ password })

  try {
    const userFind = await user.findOne({ email })
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
