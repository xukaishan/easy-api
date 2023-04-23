
const router = require('./routes/index')
const Koa = require('koa')
const koaBody = require("koa-body")
const static = require('koa-static');

const app = new Koa();
app.use(static('.'))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 10 * 1024 * 1024,
        multipart: true
    }
}));

app.use(router.routes());

const port = 3000;

app.listen(3000);