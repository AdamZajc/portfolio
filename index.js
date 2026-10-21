require('dotenv').config();

const app = require('next')({ dev: process.env.NODE_ENV !== "production", dir: "./client" })

app.prepare().then(() => {
    require('express')()
        .use(require('cors')())
        .use(require('express').json())
        .use(require('express').urlencoded({ extended: true }))
        .use('/api', require('./router'))
        .all(/^.*$/, (req, res) => {
            return app.getRequestHandler()(req, res);
        })
        .listen(process.env.PORT || 3000, async () => {
            await require('mongoose').connect(process.env.MONGO_URI).then((con) => {
               console.log(`MongoDB connected: ${con.connection.host}`);
            });
            console.log(`Server running on port ${process.env.PORT}`);
        })
})
