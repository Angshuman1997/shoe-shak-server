require("./config");
const express = require('express');
const Product = require('./database');
const app = express();

app.use(express.json());
app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get("/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})

app.put("/update/:_id",async (req, resp) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
})

app.get("/filter", async (req, resp) => {
    
    let filterElements = {};
    if(req.body["search"] !== undefined) {
        filterElements.name = { $regex: req.body.search};
    }
    
    if(req.body["filters"] !== undefined) {
        filterElements = Object.assign( req.body.filters, filterElements );
    }
    
    let data = await Product.find(filterElements);
    resp.send(data);
})

app.listen(3000, function() {
    console.log('Server started on port 3000');
  });