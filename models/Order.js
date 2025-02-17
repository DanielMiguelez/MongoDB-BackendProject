const mongoose = require("mongoose")
const ObjectId = mongoose.SchemaType.ObjectId;

const OrderSchema = new mongoose.Schema({
    status:String,

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Asegúrate de que el modelo 'User' existe
        required: true 
      },
      
    deliveryDate:Date
}, {timestamps:true});

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;