const Order = require ("../models/Order");

const OrderController = {

    async createorder (req, res){
        try {
            const order = await Order.create({
                ...req,body,

                status:"pending",
                deliveryDate: new Date().setDate(new Date().getDate() +2),
                userId : req.user._id,
            })
            res.status(201).send({msg:"order created", order})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al crear la orden"});
        }
    }
}

module.exports = OrderController;