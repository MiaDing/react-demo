const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;


const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    words: String,
    followed: {type: Number, default: 0},
    liked: {type: Number, default: 0}
}, {versionKey: false});

const User = mongoose.model("User", UserSchema);

module.exports = User;
