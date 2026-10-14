const { model, Schema, Types } = require('mongoose')

module.exports = model('Post', new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: "" },
    slug: { type: String, required: true, unique: true},
    background_image: { type: String, required: true, default: ""},
    content: { type: [], required: true, default: [] }
}, {
    timestamps: true
}))