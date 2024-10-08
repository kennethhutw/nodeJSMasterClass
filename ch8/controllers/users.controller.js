
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config();

exports.getUsers = async(req, res)=>{

    try{
    const usersModel = mongoose.model("Users");
 
     const usersData = await usersModel.find({});
 
    res.status(201).json({
        status:"success",
        data:usersData
    })
} catch(e){
console.log(e);
    res.status(400).json({
        status:"failed",
        message:e
    })
}
}
exports.register = async(req, res)=>{

    try{
    const usersModel = mongoose.model("Users");

    const {name, email, password, confirm_password} = req.body;

    if(!name) throw "Name is required";
    if(!email) throw "Email is required";
    if(!password) throw "password is required";

    if(password !== confirm_password) throw "Password and confirmed password  does not match";

    const DuplicatedEmail = await usersModel.findOne({
        email:email
    });

    if(DuplicatedEmail) throw "The email already exists!";

    const hashedPassword = await bcrypt.hash(password, 12);

    await usersModel.create({
        name:name,
        email:email,
        password:hashedPassword
    })

    res.status(201).json({
        status:"success",
        message:"user register successfully"
    })
} catch(e){
console.log(e);
    res.status(400).json({
        status:"failed",
        message:e
    })
}
}

exports.login = async(req, res)=>{

    try{
    const usersModel = mongoose.model("Users");

    const {email, password} = req.body;

   
    if(!email) throw "Email is required";
    if(!password) throw "password is required";

   const getUser = await usersModel.findOne({
    email:email
   })

   if(!getUser) throw "email does not exists!";

   const comparePassword = await bcrypt.compare(password,getUser.password );

 if(comparePassword){

    const accesstoken = await jsonwebtoken.sign({
       _id:getUser._id,
       name:getUser.name
    },
    process.env.JWT_KEY
    )
   
    res.status(201).json({
        status:"success",
        message:"user login successfully",
        accesstoken:accesstoken
    })}
    else{
        res.status(400).json({
            status:"failed",
            message:"email or password is not correct. "
        })
    }
} catch(e){

    res.status(400).json({
        status:"failed",
        message:e
    })
}
}