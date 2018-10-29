const express = require("express");
const router = express.Router();
const user = require("./controller/user");
const post = require("./controller/post");
const topic = require("./controller/topic");

// 登录注册登出
router.post("/getRegister", function(req, res){
    console.log("检验注册");
    new Promise((resolve, reject) => {
        user.find({name: req.body.name}, (data)=> {
            if(data.status === 500) {
                reject(data);
            }else if(data.status === 200) {
                reject({status: data.status, msg: false});
            }
            resolve();
        });
    }).then(() => {
        user.save(req.body, (data) => {
            req.session.user = data;
            res.status(200).send(data);
        })
    }).catch((data) => {
        res.status(data.status).send(data.msg);
    })
});

router.post("/getLogin", function (req, res) {
    console.log("检验登录");
    user.find(req.body, (data)=> {
        if(data.status) {
            if(data.status === 200) {
                req.session.user = data.msg;
            }
            res.status(data.status).send(data.msg);
        }else {
            res.status(200).send(false);
        }
        console.log("session: ", req.session);
    });
});

router.get("/getLogout", function(req, res) {
    console.log("检验登出");
    req.session.user = null;
    res.status(200).send(true);
})

// 动态操作
router.post("/postContent", function(req, res) {
    console.log("发布动态");
    post.save(req.body, (data) => {
        console.log(data);
        res.status(200).send(data);
    })
})

router.get("/getContent", function(req, res) {
    console.log("获取动态");
    let date = null;
    if(req.query && req.query.last) date = req.query.last;
    console.log(date);
    post.fetch(date, (data)=> {
        console.log(data);
        res.status(200).send(data);
    })
})

router.get("/getKey", function(req, res) {
    console.log("查询结果");
    if(req.query && req.query.key) {
        post.filter(req.query.key, (data) => {
            console.log(data);
            res.status(200).send(data);
        })
    }
})

// 热搜操作
router.post("/postTopic", function(req, res) {
    console.log("添加热搜");
    const token = req.body.token;
    if(token === "hello") {
        topic.save({topic: req.body.topic}, (data) => {
            console.log(data);
            res.status(200).send(data);
        })
    }
})

router.get("/getTopic", function(req, res) {
    console.log("获取热搜");
    topic.fetch((data) => {
        console.log(data);
        res.status(200).send(data);
    })
})

router.post("/modifyTopic", function(req, res) {
    console.log("修改热搜");
    if(req.body && req.body._id) {
        topic.modify(req.body, (data) => {
            console.log(data);
            res.status(200).send(data);
        })
    }
})

module.exports = router;