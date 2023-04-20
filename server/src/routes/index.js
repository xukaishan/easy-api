const Router = require('koa-router')

const router = new Router();

const baseUrl = "/api";
const baseUrlGet = "/api/get";
const baseUrlPost = "/api/post";

const dely = (time) => new Promise((resolve) => setTimeout(resolve, time))

router.get("/", (ctx) => {
    ctx.body = {
        data: { message: "Hi there" },
    };
});

router.get(`${baseUrlGet}/info`, async (ctx) => {
    await dely(30000)
    ctx.body = {
        data: { list: [{ label: '3333', value: '666' }] },
    };
});

router.post(`${baseUrlPost}/list`, async (ctx) => {
    // await dely(5000)
    ctx.body = {
        data: { list: [{ label: '3333', value: '666' }] },
    };
});


router.post(`${baseUrlPost}/save`, async (ctx) => {
    ctx.body = {
        data: { message: "success", status: 0, },
    };
});

router.post(`${baseUrlPost}/saveForm`, async (ctx) => {
    ctx.body = {
        data: { message: "success", status: 0, },
    };
});

router.post(`${baseUrlPost}/upload`, (ctx) => {
    ctx.body = {
        data: { message: "success", status: 0, },
    };
});

module.exports = router

