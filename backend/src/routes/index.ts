import Router from '@koa/router'

import { userCreate, userList, userRemove, userUpdate } from '../modules/users'
import { createTransaction } from './../modules/transactions/transaction'
import { login } from '../modules/session'
import { check_authorization } from '../shared/middlewares/check-authorization'

const router = new Router()

router.post('/users', userCreate)
router.get('/login', login)

router.get('/users', check_authorization, userList)
router.put('/users/:user_id', check_authorization, userUpdate)
router.delete('/users/:user_id', check_authorization, userRemove)

router.post('/transactions', check_authorization, createTransaction)

export { router }
