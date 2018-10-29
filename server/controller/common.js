const url = "mongodb://localhost:27017/weibo";
const mongoose = require("mongoose");

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect(url, {
                useNewUrlParser: true
            }, (err) => {
                if (err) return reject({code: 10, msg: err});
                return resolve();
            })
        })
    },
    disconnect: () => {
        mongoose.disconnect();
    }
}