import { Router } from 'express'
import {
  usersDelete,
  usersGet,
  usersPost,
  usersPut
} from '../controllers/users.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import {
  isValidRole,
  verifyEmailExist,
  verifyUserExist
} from '../helpers/db-validators.js'
const router = Router()

router.get('/', usersGet)

router.put(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(verifyUserExist),
    check('role').custom(isValidRole),

    validarCampos
  ],
  usersPut
)

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be more than 6 characteres').isLength({
      min: 6
    }),
    check('email', 'This email is not valid').isEmail(),
    check('email').custom(verifyEmailExist),
    // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validarCampos
  ],
  usersPost
)

router.delete('/', usersDelete)

export default router
