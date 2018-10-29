const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;


const TopicSchema = new Schema({
    topic: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    delete: {type: Boolean, default: false}
}, {versionKey: false});

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
