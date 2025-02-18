const User = require("../models/User")
const Order = require("../models/Order.js")

const jwt = require("jsonwebtoken")
const {jwt_secret} = require ("../config/keys.js")

const authentication = async(req,res,next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret)

        const user = await User.findOne({ _id:payload._id, tokens:token})

        if(!user){
            res.status(401).send({msg:"no estas autorizado"})
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
}

const isAdmin = async (req,res, next) =>{
    const admins = ['admin', 'superadmin'];

    if(!admins.includes(req.user.role)){
        return res.status(403).send({
            message:"you have no permission"
        })
    }
    next();
}

const isAuthor= async (req,res, next) =>{
    try {
        const order = await Order.findById(req.params._id);
        if(order.userId.toString() !== req.user._id.toString()){
            return res.status(403).send({msg:"no es tu pedido..."})
        }
        next()
        } catch (error) {
            console.error(error)
            return res.status(500).send({ error, message: 'Ha habido un problema' })
    }
}

module.exports = {authentication, isAdmin, isAuthor}