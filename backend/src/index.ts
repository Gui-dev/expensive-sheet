import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const PORT = Number(3333) || process.env.PORT
app.use(bodyParser())

app.use(async (ctx) => {
  ctx.body = 'Hello World 2'
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
})
