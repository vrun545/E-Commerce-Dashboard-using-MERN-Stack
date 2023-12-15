const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config")
const User = require("./db/User");
const Product = require("./db/Product");
const JWT = require("jsonwebtoken");



// Middlewares
app.use(express.json());
app.use(cors());

// JWT Secret Key
const key = "e-comm";


// SignUp
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();

    // Hiding Password for Security
    result = result.toObject();
    delete result.password;
    JWT.sign({ user }, key, { expiresIn: '2h' }, (error, token) => {
        if (error) {
            res.send({ result: "No User Found" })
        }
        res.send({ result, auth: token });
    })
});



// Login
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            JWT.sign({ user }, key, { expiresIn: '2h' }, (error, token) => {
                if (error) {
                    res.send({ result: "No User Found" })
                }
                res.send({ user, auth: token });
            })

        }
        else {
            res.status(404).json({ error: "No User Found" });
        }
    }
    else {
        res.status(404).json({ error: "Enter All Details" });
    }
});



// Add Product
app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.json(result);
});



// List All Products
app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (!products) return res.status(404).send({ msg: "No Products Found." })
    else {
        res.send(products);
    }
});



// Delete Product
app.delete("/product/:id", verifyToken,async (req, res) => {
    let productId = req.params.id;
    let result = await Product.deleteOne({ _id: productId });
    res.json(result);
});



// Single Product Page
app.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.send({ error: "Product Not Found." });
    }
});



// Update Product Details
app.put("/product/:id", verifyToken ,async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.status(200).send(result);
});



// Search API for Products
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    });
    res.json(result);
});





// Verify Token
function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        JWT.verify(token, key, (error, valid) => {
            if(error)
            {
                res.status(401).send("Please Provide Valid Token");
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).send("Please Add Token with Header");
    }
}





// Server is Running
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is Live at ${PORT}.`);
});