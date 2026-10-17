const Post = require('../models/post');

module.exports = {
    getAllPosts: async function (req, res) {
        const posts = await Post.find();
        return res.status(200).json(posts);
    },
    getPost: async function (req, res) {
        const post = await Post.findOne({slug: req.params.slug});
        return res.status(200).json(post);
    },
    addPost: async function (req, res) {
        const {title, description, author, categories, background_image, content} = req.body;
        try {
            const post = await Post.create({
                title: title,
                description: description,
                slug: title.toLowerCase().replaceAll(" ", "_"),
                author: author,
                categories: categories,
                background_image: background_image,
                content: content
            })
            return res.status(200).json({ post });
        } catch (e) {
            return res.status(400).json({error: e})
        }
    },
    updatePost: async function (req, res) {
        const {title, description, author, categories, background_image, content} = req.body;
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) return res.status(400).json({error: 'Post not found'});

        if (title) { post.title = title }
        if (description) { post.description = description }
        if (author) { post.author = author }
        if (categories) { post.categories = categories }
        if (background_image) { post.background_image = background_image }
        if (content) { post.content = content }

        await post.save();
        return res.status(200).json({ post });
    },
    deletePost: async function (req, res) {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });
        return res.status(200).json({ message: `Post "${post.title}" has been deleted!` });
    }
}