const bcrypt = require ("bcrypt-nodejs");
const User = require('../../models/Users');
const jwt = require("jsonwebtoken");
const storage = require("../../services/storage")

const createUser = async (obj, args) =>{
   const params = args.user;
   if(params.email && params.name && params.password){
       const exist = await User.findOne({email: params.email});
       if(exist){throw new Error ("El correo ya esta registrado")}
       else {
           const hash = bcrypt.hashSync(params.password);
           const newUser = User({
               name: params.name,
               email: params.email,
               password: hash
           })
           const user =  await newUser.save();
           return user;
       }
   }
}
const login = async (obj, args)=>{
   const params = args.user;
   if(params.email){
       const user = await User.findOne({email: params.email});
       if(!user){ throw new Error("el usuario no esta registrado")}
       else{
           const valid = bcrypt.compareSync(params.password, user.password);
           if(valid){
               const payload ={
                   id: user._id,
                   name: user.name,
                   email: user.email,
                   password: 'voila'
               }
               const token = jwt.sign(payload, process.env.SECRET,{expiresIn: "2hr"})
               return {
                   status: 'ok',
                   token
               }
           }else{
               throw new Error ("Credenciales Invalidas")
           }
       }
   }
}
const addPhoto =async ( obj, args, context)=>{
    console.log(context)
    const id = context.user._id
    if (args.photo){
        const {createReadStream}=await args.photo;
        const stream = createReadStream();
        const {url} = await storage({stream});
        console.log(url);
        await User.findByIdAndUpdate(id, {$set: {avatar: url.url}})
        return url;
    }
}
module.exports={
   createUser,
   login,
   addPhoto
}