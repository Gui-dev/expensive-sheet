import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { router } from './routes'

const app = new Koa()
const PORT = Number(3333) || process.env.PORT
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
})
