const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);
app.use('/product', productController);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server !')
})

app.listen(port, () => console.log("Server started"))