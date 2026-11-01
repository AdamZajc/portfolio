const {getAllPosts, getPost, addPost, updatePost, deletePost} = require("./controllers/posts");
const router = require("express").Router();
const Admin = require('./models/admin');
const { authenticate } = require('./controllers/admin')

async function secure(req, res, next) {
    if(!req.headers.authorization) return res.status(400).send("No Authorization Header!");
    if (!req.headers.authorization.split(' ')[1]) return res.status(400).send("Incorrect Request!");
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        const ad = await Admin.findById(decoded.aid);
        if(!ad) return res.status(400).send("Incorrect Request!");
        return next();
    } catch (e) {
        console.log(e)
    }
}

router.route('/posts').get(getAllPosts).post(secure, addPost);
router.route('/posts/:slug').get(getPost).put(secure, updatePost).delete(secure, deletePost);
router.post('/us/admin/login', authenticate)
router.get('/us/admin/verify', secure)

module.exports = router;