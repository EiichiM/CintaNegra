require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {verifyToken} = require ("./middlewares/verifyTkn");

const bodyParser = require('body-parser');
mongoose.connect(process.env.URL,() => { console.log("----- Base de Datos Conectada -----") });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const {register, login} = require('./controllers/auth');
const {newPost, listPosts, post} = require('./controllers/post');

app.get('/', (req, res) => {
    res.send('<h1>Express Server</h1>')
})

app.post('/new/user', register);
app.post('/login', login);
app.post('/new/post', verifyToken, newPost);
app.get('/posts', listPosts);
app.get('/post/:id', post)
app.get("./", (req,res)=> res.send("hello"));

app.listen(process.env.PORT,()=> console.log(`Conectado en el PORT ${PORT}!`));