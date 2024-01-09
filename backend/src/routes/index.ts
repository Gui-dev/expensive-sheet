import Router from '@koa/router'

import {
  userCreate,
  userList,
  userRemove,
  userUpdate,
} from '../modules/users/routes/users.route'

const router = new Router()

router.get('/users', userList)
router.post('/users', userCreate)
router.put('/users/:id', userUpdate)
router.delete('/users/:id', userRemove)

export { router }
