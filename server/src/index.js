
const router = require('./routes/index')
const Koa = require('koa')

const app = new Koa();

app.use(router.routes());

const port = 3000

app.listen(3000);