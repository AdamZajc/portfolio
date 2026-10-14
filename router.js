const router = require("express").Router();

function secure(req, res, next) {
    if(!req.headers.authorization) return res.status(400).send("No Authorization Header!");
    if (!req.headers.authorization.split(' ')[1]) return res.status(400).send("Incorrect Request!")
    require('jsonwebtoken').verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    return next();
}

router.route('/').get(secure, (req, res) => {})

module.exports = router;