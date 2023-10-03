import jwt from 'jsonwebtoken'
export const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('JWT could not be generated')
        } else {
          resolve(token)
        }
      }
    )
  })
}
