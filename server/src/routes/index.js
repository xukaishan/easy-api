const fs =  require('fs')
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
    const file = ctx.request.files.file;
    const name = ctx.request.body.name;
    const reader = fs.createReadStream(file.path);
    let filePath = __dirname + "../../../static/upload/";
    let fileResource = filePath + `/${name}`;

    if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, (err) => {
            if (err) {
                throw new Error(err)
            } else {
                const upstream = fs.createWriteStream(fileResource);
                reader.pipe(upstream)
            }
        })
    } else {
        const upstream = fs.createWriteStream(fileResource);
        reader.pipe(upstream)
    }

    ctx.body = {
        data: { message: "upload success", status: 0, url: `http://localhost:3000/static/upload/${name}` },
    };
});

module.exports = router

