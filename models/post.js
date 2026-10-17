const { model, Schema, Types } = require('mongoose')

module.exports = model('Post', new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: "" },
    slug: { type: String, required: true, unique: true},
    author: { type: String, required: true },
    categories: { type: [], required: true, default: [] },
    background_image: { type: String, required: true, default: ""},
    content: { type: [], required: true, default: [] }
}, {
    timestamps: true
}))