import { Router } from 'express'
import { googleSingIn, login } from '../controllers/auth.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import {
  verifyEmailExist,
  verifyEmailExistLogin,
  verifyUserExist,
  verifyUserIsEnable
} from '../helpers/db-validators.js'

const router = Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email').custom(verifyEmailExistLogin),
    check('email').custom(verifyUserIsEnable),
    check('email', 'This email is not valid').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validarCampos
  ],
  login
)

router.post(
  '/google',
  [check('id_token', 'id_token missing').not().isEmpty(), validarCampos],
  googleSingIn
)

export default router
