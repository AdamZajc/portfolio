const {getAllPosts, getPost, addPost, updatePost, deletePost} = require("./controllers/posts");
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

router.route('/posts').get(getAllPosts).post(secure, addPost);
router.route('/posts/:slug').get(secure, getPost).put(secure, updatePost).delete(secure, deletePost);

module.exports = router;