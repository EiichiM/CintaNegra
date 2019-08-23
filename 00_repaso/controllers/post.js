const Post = require("../models/Post")

exports.newPost = (req, res) => {
    let params = req.body;
    if (params.title && params.body) {
        let newPost = Post({
            ...params
        })
        newPost.save((err, user) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(201).json({ data: Post })
        })
    } else { res.status(400).jason({ message: "Datos Requeridos" }) };

    res.json('Nuevo Post Creado');
};

exports.listPosts = (req, res) => {
    let params = req.body;
    Post.find().exec((err, post) => {
        if (err) { res.status(500).send(err) }
        res.status(201).json({ data: post })
    });
    res.json('Lista de Posts');
};

exports.post = (req, res) => {
    let id = req.params.id;
    Post.findById(id).populate("user").exec((err, post) => {
        if (err) { res.status(500).send(err) }
        res.status(201).json({ data: post })
    })
    res.json(`Post ${id}`)
}