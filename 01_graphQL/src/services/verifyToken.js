const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const verifyToken = async (req) => {
    const Authotization = req.headers.authotization;
    if (!Authotization) return req;
    const format = Authotization.replace("JWT ", "");
    const payload = jwt.verify(format, process.env.SECRET);
    console.log("Payload ===> ", payload)
    if (!payload) return req;
    const user = await User.findById(payload.id);
    return { ...req, user }
}

module.exports = verifyToken;