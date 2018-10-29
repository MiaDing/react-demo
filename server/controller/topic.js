const db = require("./common");
const Topic = require("../schema/topic");

const saveTopic = (topic, callback) => {
    db.connect().then(() => {
        console.log("save", topic);
        new Topic(topic).save((err, docs) => {
            db.disconnect();
            callback({err, docs});
        });
    }).catch((err) => {
        console.log(err);
    });
}

const fetchTopic = (callback) => {
    db.connect().then(() => {
        Topic.find({"delete":false}).limit(5).sort({
                date: -1
            }).exec((err, docs) => {
            db.disconnect();
            callback({err, docs});
        })
    }).catch((err) => {
        console.log(err);
    })
}

const modifyTopic = (id, callback) => {
    db.connect().then(() => {
        console.log("modify", id);
        Topic.updateOne(id, {"delete": true}, (err, raw) => {
            db.disconnect();
            callback({err, raw});
        })
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    save: saveTopic,
    fetch: fetchTopic,
    modify: modifyTopic
}