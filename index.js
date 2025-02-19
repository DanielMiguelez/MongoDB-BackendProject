const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3001;


const {dbConnection} = require("./config/config");
app.use(express.json())
const {handleTypeError} = require("./middlewares/errors")

app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))

app.use(handleTypeError)

dbConnection();
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));