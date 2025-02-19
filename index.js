require("dotenv").config();

const express = require("express");
const {dbConnection} = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
dbConnection();

const {handleTypeError} = require("./middlewares/errors")

app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))

app.use(handleTypeError)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));