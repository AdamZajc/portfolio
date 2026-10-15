const {getAllPosts, getPost} = require("./controllers/posts");
const router = require("express").Router();

async function secure(req, res, next) {
    if(!req.headers.authorization) return res.status(400).send("No Authorization Header!");
    if (!req.headers.authorization.split(' ')[1]) return res.status(400).send("Incorrect Request!");
    const token = req.headers.authorization.split(' ')[1]
    try {
        require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        return next();
    } catch (e) {
        console.log(e)
    }
}

router.route('/posts').get(secure, getAllPosts)
router.route('/posts/:slug').get(secure, getPost)

module.exports = router;