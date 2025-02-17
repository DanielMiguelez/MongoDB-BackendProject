const User = require("../models/User")
const bcrypt = require("bcryptjs")

const UserController = {

    async createUser(req,res){
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({...req.body, password:hashedPassword})

            res.status(201).send({msg:"user creado", user})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al crear el producto"});
        }
    }
}

module.exports = UserController;