const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;


const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now()}
}, {versionKey: false});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

