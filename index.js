require("./config");
require("dotenv").config();

const express = require("express");
const Product = require("./database");
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
});

app.delete("/delete/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await Product.deleteOne(req.params);
  resp.send(data);
});

app.put("/update/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await Product.updateOne(req.params, { $set: req.body });
  resp.send(data);
});

app.get("/filter", async (req, resp) => {
  let filterElements = {};
  if (req.body["search"] !== undefined) {
    filterElements.name = { $regex: req.body.search };
  }

  if (req.body["filters"] !== undefined) {
    filterElements = Object.assign(req.body.filters, filterElements);
  }

  let data = await Product.find(filterElements);
  resp.send(data);
});

app.get("/filterItems", async (req, resp) => {

  const filterItems = {};

  // Colors
  let colorData = await Product.find({}, { colorway: 1, _id: 0 });
  let colorResult = colorData.map(({ colorway }) => colorway).flat(1);
  filterItems.color = colorResult.filter(
    (item, index) => colorResult.indexOf(item) === index
  ).slice(0, 20); // totla 398, limiting to 20

  // Sizes
  let sizeData = await Product.find({}, { size: 1, _id: 0 });
  let sizeResult = sizeData.map(({ size }) => size).flat(1);
  filterItems.size = sizeResult.filter(
    (item, index) => sizeResult.indexOf(item) === index
  ).sort(function(a, b){return a-b});

  // Brands
  let brandData = await Product.find({}, { brand: 1, _id: 0 });
  let brandResult = brandData.map(({ brand }) => brand);
  filterItems.brand = brandResult.filter(
    (item, index) => brandResult.indexOf(item) === index
  );

  resp.send(filterItems);
});

app.listen(process.env.PORT, function () {
  console.log("Server started on port", process.env.PORT);
});
