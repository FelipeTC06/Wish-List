const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

const products = [
    { id: 1, name: 'Monitor', url: '', price: 2500 },
    { id: 2, name: 'Prancha', url: '', price: 6000 },
    { id: 3, name: 'MacBook', url: '', price: 11000 },
    { id: 4, name: 'Go Pro', url: '', price: 3000 }
]

app.get('/api/wish-list', (req, res) => {
    res.send(products);
});

app.get('/api/wish-list/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(c => c.id === id);

    if (!product) return res.status(404).send('Not Found!')

    res.send(product);
});

app.put('/api/wish-list/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(c => c.id === id);
    const updateProduct = req.body;

    if (!product) return res.status(404).send('Not Found!');
    if (!updateProduct.name || !updateProduct.url || !updateProduct.price) return res.status(400).send('Need all field!');

    product.name = updateProduct.name;
    product.url = updateProduct.url;
    product.price = updateProduct.price;

    res.send(product);
});

app.post('/api/wish-list', (req, res) => {
    const productBody = req.body;
    if (!productBody) return res.status(404).send('Not Found!');

    const product = {
        id: products.length + 1,
        name: productBody.name,
        url: productBody.url,
        price: productBody.price
    }

    products.push(product);
    res.send(products);
});

app.delete('/api/wish-list/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(c => c.id === id);

    if (!product) return res.status(404).send('Not Found!');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})