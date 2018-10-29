const db = require("./common");
const Post = require("../schema/post");

const savePost = (post, callback) => {
    db.connect().then(() => {
        console.log("save", post);
        new Post(post).save((err, docs) => {
            if(err) {
                db.disconnect();
                callback({err, docs});
            }
            Post.populate(docs, {
                path: "author",
                select: "name"
            }, (err, docs) => {
                callback({err, docs})
            })
        });
    }).catch((err) => {
        console.log(err);
    });
}

const fetchPost = (date, callback) => {
    db.connect().then(() => {
        let param = null;
        if(date) param = {"date": {"$lt": date}};
        Post.find(param).limit(5).sort({
                date: -1
            }).populate({
            path: "author",
            select: "name -_id"
        }).exec((err, docs) => {
            db.disconnect();
            callback({err, docs});
        })
    }).catch((err) => {
        console.log(err);
    })
}

const filterPost = (key, callback) => {
    db.connect().then(() => {
        const pattern = new RegExp(key, "i");
        let param = {content: pattern};
        console.log(param);
        Post.find(param, (err, docs) => {
            console.log(err, docs);
            db.disconnect();
            callback({err, docs});
        })
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    save: savePost,
    fetch: fetchPost,
    filter: filterPost
}