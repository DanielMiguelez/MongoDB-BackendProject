const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { jwt_secret } = require("../config/keys.js");


const UserController = {

    async createUser(req,res){
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({...req.body, password:hashedPassword, role:"user"})

            res.status(201).send({msg:"user creado", user})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al crear el producto"});
        }
    },

    async login(req,res){
        try {
            const user = await User.findOne({
                email:req.body.email
            });

            if(!user){
                return res.status(400).send("el correo o pwd incorrecto")
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if(!isMatch){
                return res.status(400).send("correo o pwd incorrecto")
            }

            const token = jwt.sign({ _id: user._id }, jwt_secret);
            
            if(user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);

            await user.save();

            res.send({msg:"bienvenido " + user.name + "  " + token})
        } catch (error) {
            console.error(error);
            return res.status(500).send({msg:"error al logear"});
        }
    },

    async logout(req, res){
        try {
            await User.findByIdAndUpdate(req.params._id,{
                $pull:{tokens: req.headers.authorization},
            })
            res.status(200).send({msg:"desconectado con éxito"})
        } catch (error) {
            console.error(error);
            return res.status(500).send({msg:"error al desconectarse"});
        }
    }
}

module.exports = UserController;