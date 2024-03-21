import Router from '@koa/router'

import {
  userCreate,
  userRemove,
  userUpdate,
} from '../modules/users/controllers/user'
import {
  createTransaction,
  listTransaction,
  findTransaction,
  updateTransaction,
  deleteTransaction,
} from './../modules/transactions/controllers/transaction'
import { login } from '../modules/session/controllers/session'
import { check_authorization } from '../shared/middlewares/check-authorization'

const router = new Router()

router.post('/users', userCreate)
router.get('/login', login)

// Protected Routes
router.put('/me', check_authorization, userUpdate)
router.delete('/me', check_authorization, userRemove)

router.post('/transactions', check_authorization, createTransaction)
router.get('/transactions', check_authorization, listTransaction)
router.get('/transactions/:id', check_authorization, findTransaction)
router.put('/transactions/:id', check_authorization, updateTransaction)
router.delete('/transactions/:id', check_authorization, deleteTransaction)

export { router }
