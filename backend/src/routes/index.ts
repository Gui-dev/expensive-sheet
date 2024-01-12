import Router from '@koa/router'

import { userCreate, userList, userRemove, userUpdate } from '../modules/users'

const router = new Router()

router.get('/users', userList)
router.post('/users', userCreate)
router.put('/users/:user_id', userUpdate)
router.delete('/users/:user_id', userRemove)

export { router }
