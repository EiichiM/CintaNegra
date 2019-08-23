const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require ("../services/create.Jwt")

exports.register = (req, res) => {
    const params = req.body;
    if (params.email && params.username && params.password && params.passwordConf) {
        User.findOne({ email: params.email }).exec((err, user) => {
            if (err) { res.status(500).json({ message: error }) }
            if (user) { res.status(403).json({ message: `El correo ${params.email} ya esta registrado` }) } else {
                bcrypt.genSalt(saltRounds, (err, hash) => {
                    if (err) { res.status(500).send(`Ocurrio un error`) }
                    bcrypt.hash(params.password, salt, (err, hash) => {
                        let newUser = User({
                            name: params.name,
                            email: params.email,
                            password: hash
                        })
                        newUser.save((err, user) => {
                            if (err) {
                                res.status(500).send(err)
                            }
                            user.password= ":("
                            res.status(201).json({ user: user })
                        })

                    })
                })
            }
        })
    } else { res.status(400).jason({ message: "Datos Requeridos" }) };

}

exports.login = (req, res) => {
    const params = res.body;
    if (params.email && params.password) {
        
        User.findOne({ email: params.email }).exec((err, user) => {
            if (err) {
                res.status(500).send(err)
            } if (user) {
                bcrypt.compare(params.password, user.password, (err, isValid)=>{
                    if(isValid){
                        user.password=`:)`
                        res.status(200).json({ user, Token: jwt.createToken(user) });
                    }else{res.status(404).json({message: `Usuario o Contraseña Invalidos`})}
                })
                
            } else { res.status(404).json({ message: "Ususario no registrado" }) }
        })
    }else {
        res.status(500).json({message:`Sin datos`})
    }
}
