const Product = require("../models/Product");

const ProductController = {

    async createProduct (req,res) {
        try {
            const product = await Product.create(req.body)
            res.status(201).send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al crear el producto"});
        }
    },

    async getAllProducts(req,res){
        try {
            const products = await Product.find()
            .limit(req.query.limit)
            .skip((req.query.page -1)* req.query.limit)
            res.send(products)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al traer productos"});
        }
    },

    async getById(req,res){
        try {
            const product = await Product.findById(req.params._id)
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al encontrar el producto"});
        }
    },

    async getProductsByName(req,res){
        try {
            if(req.params.name.length > 20){
                return res.setatus(400).send("Busqueda demasiado larga")
            }
            const name = new RegExp(req.params.name, "i");
            const products = await Product.find({name});
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al encontrar el producto"});
        }
    },

    async delete (req,res){
        try {
            const product = await Product.findByIdAndDelete(req.params._id);
            res.send({product, msg:"producto eliminado"});
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al encontrar el producto"});
        }
    },

    async update(req,res){
        try {
            const newProduct = await Product.findByIdAndUpdate(req.params._id, req.body, {new:true});
            res.send({msg:"producto actualizado", newProduct})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"error al actualizar el producto"});
        }
    }
}

module.exports = ProductController;