import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { router } from './routes'

const app = new Koa()
const PORT = process.env.SERVER_PORT ?? process.env.PORT
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
})
