import mongoose from 'mongoose'
import Role from '../models/rol.js'
import user from '../models/user.js'

export const isValidRole = async (role = '') => {
  const existeRol = await Role.findOne({ role })
  if (!existeRol) {
    throw new Error(`Rol ${role} is not register on DB`)
  }
}

export const verifyEmailExist = async (email) => {
  const existEmail = await user.findOne({ email })

  if (existEmail) {
    throw new Error(`Email ${email} is already register on DB`)
  }
}

export const verifyUserExist = async (id) => {
  try {
    const idMongo = new mongoose.Types.ObjectId(id)

    const existUser = await user.findById({ _id: idMongo })

    if (!existUser) {
      throw new Error()
    }
  } catch (error) {
    throw new Error(`Id: ${id} no exist or this is not valid`)
  }
}

export const verifyEmailExistLogin = async (email) => {
  const existEmail = await user.findOne({ email })

  if (!existEmail) {
    throw new Error(`Email or password are incorrect !!`)
  }
}

export const verifyUserIsEnable = async (email) => {
  const userFind = await user.findOne({ email })

  if (userFind && !userFind.status) {
    throw new Error(`User not found !!`)
  }
}
