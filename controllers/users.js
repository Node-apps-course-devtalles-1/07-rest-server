import { response, request } from 'express'

export const usersGet = (req = request, res = response) => {
  const query = req.query
  res.json({ mgs: 'get API - controller', query })
}

export const usersPut = (req, res) => {
  const { id } = req.params
  res.status(500).json({ mgs: 'put API - controller', id })
}
export const usersPost = (req, res) => {
  const body = req.body

  res.status(201).json({ mgs: 'post API - controller', body })
}
export const usersDelete = (req, res) => {
  res.json({ mgs: 'delete API - controller' })
}
