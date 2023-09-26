import Role from '../models/rol.js'

export const isValidRole = async (role = '') => {
  console.log({ rol: role })
  const existeRol = await Role.findOne({ role })
  if (!existeRol) {
    throw new Error(`Rol ${role} is not register on DB`)
  }
}
