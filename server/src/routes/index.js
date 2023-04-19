const Router = require('koa-router')

const router = new Router();

const baseUrl = "/api";
const baseUrlGet = "/api/get";
const baseUrlPost = "/api/post";

router.get("/", (ctx) => {
  ctx.body = {
    data: { message: "Hi there" },
  };
});

router.get(`${baseUrlGet}/info`, (ctx) => {
  ctx.body = {
    data: { list: [{ label: '1', value: '666' }] },
  };
});



router.post(`${baseUrlPost}/save`, (ctx) => {
  ctx.body = {
    data: {  message: "success", status: 0, },
  };
});

module.exports = router

