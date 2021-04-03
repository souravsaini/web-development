const Product = require ('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find ()
    .select ('name price _id productImage')
    .then (products => {
      const response = {
        count: products.length,
        products: products.map (({name, price, _id, productImage}) => {
          return {
            name,
            price,
            productImage,
            request: {
              type: 'GET',
              url: `http://localhost:3000/products/${_id}`,
            },
          };
        }),
      };
      res.status (200).json (response);
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.createProduct = (req, res, next) => {
  const product = new Product ({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save ()
    .then (({name, price, _id}) => {
      res.status (201).json ({
        message: 'product created successfully',
        createdProduct: {
          name,
          price,
          _id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${_id}`,
          },
        },
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById (id)
    .select ('name price _id productImage')
    .then (product => {
      if (!product) {
        res.status (404).json ({
          message: 'product not found',
        });
      }
      res.status (200).json ({
        product,
        request: {
          type: 'GET',
          url: `http://localhost:3000/products`,
        },
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.patchProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndUpdate (
    id,
    {
      $set: req.body,
    },
    {new: true}
  )
    .then (({name, price, _id}) => {
      res.status (200).json ({
        message: `updated product with id ${_id}`,
        updatedProduct: {
          name,
          price,
          _id,
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${_id}`,
        },
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndRemove (id)
    .then (() => {
      res.status (200).json ({
        message: `deleted product with id: ${id}`,
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};
