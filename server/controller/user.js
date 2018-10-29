const db = require("./common");
const User = require("../schema/user");

const findUser = (user, callback) => {
    db.connect().then(() => {
        User.find(user, "name _id", (err, docs) => {
            db.disconnect();
            let data = {};
            if (err) data = {status: 500, msg: err};
            else if(docs[0] && docs[0]._id) data = {status: 200, msg: docs[0]};
            callback(data);
        })
    }).catch((err) => {
        console.log(err);
    })
}

const saveUser = (user, callback) => {
    db.connect().then(() => {
        console.log("save", user);
        new User(user).save((err, docs) => {
            db.disconnect();
            let data = {};
            if(err) data = {status: 500, msg: err};
            else data = docs;
            callback(data);
        });
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = {
    find: findUser,
    save: saveUser
}
