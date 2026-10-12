require('dotenv').config();
require('express')()
    .use(require('cors')())
    .use(require('express').json())
    .use(require('express').urlencoded({ extended: true }))
    .use('/', require('./router'))
    .listen(process.env.PORT, async () => {
        await require('mongoose').connect(process.env.MONGO_URI).then((con) => {
            console.log(`MongoDB connected: ${con.connection.host}`);
        });
        console.log(`Server running on port ${process.env.PORT}`);
    })