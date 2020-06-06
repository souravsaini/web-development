const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
  .populate("category")
  .exec( (err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "No PRODUCT was found in DB"
      });
    }
    req.product = product;
    next();
  });
}

exports.createProduct = (req, res) => {
  let form = new formidable();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "Issues with Image upload"
      })
    }
    //destructuring the fields
    const{ name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please fill all fields"
      });
    }

    let product = new Product(fields)
    //res.json({fields, file})

    //handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) { //3MB
        res.status(400).json({
          error: "File size too large"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type
    }
    //save to DB
    product.save( (err, product) => {
      if (err) {
        res.status(400).json({
          error: "Failed to save Product in DB"
        })
      }
      res.json(product);
    })
  })
}

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove( (err, deletedProduct) => {
    if (err) {
      res.status(400).json({
        error: "Unable to delete product"
      });
    }
    res.json({
      message: "successfully deleted"
    });
  });
}

exports.updateProduct = (req, res) => {
  let form = new formidable();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "Issues with Image upload"
      })
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields)

    //handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) { //3MB
        res.status(400).json({
          error: "File size too large"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type
    }
    //save to DB
    product.save( (err, product) => {
      if (err) {
        res.status(400).json({
          error: "Failed to update Product in DB"
        })
      }
      res.json(product);
    })
  })
}

//products listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find({})
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec( (err, products) => {
    if (err) {
      res.status(400).json({
        error: "No Product found"
      });
    }
    res.json(products);
  });
}

//middleware
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(product => {
    return {
      updateOne: {
        filter: { _id: product._id},
        update: {$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  })

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.status(400).json({
        error: "Bulk operation failed"
      })
    }
    next();
  })
}

exports.getAllcategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      res.status(400).json({
        error: "No category found"
      })
    }
    res.json(categories);
  })
}
