import { response } from 'express'

export const isAdminRole = async (req, res = response, next) => {
  if (!req.userAuthenticated) {
    return res.status(500).json({
      msg: 'Try verify role before validate token'
    })
  }

  const { role, name } = req.userAuthenticated

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not ADMIN`
    })
  }
  next()
}

export const hasRole = (...rols) => {
  return (req, res = response, next) => {
    console.log({ rols })
    if (!req.userAuthenticated) {
      return res.status(500).json({
        msg: 'Try verify role before validate token'
      })
    }
    if (!rols.includes(req.userAuthenticated.role)) {
      return res.status(401).json({
        msg: `User must have any of these rols ${rols}`
      })
    }
    next()
  }
}
