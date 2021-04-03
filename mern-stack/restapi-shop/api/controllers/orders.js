const Order = require ('../models/order');
const Product = require ('../models/product');

exports.getAllOrders = (req, res, next) => {
  Order.find ()
    .select ('product quantity _id')
    .populate ('product', 'name')
    .then (orders => {
      res.status (200).json ({
        count: orders.length,
        orders,
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.createOrder = (req, res, next) => {
  Product.findById (req.body.productId)
    .then (product => {
      if (!product) {
        res.status (404).json ({
          message: 'product not found',
        });
      }
      const order = new Order ({
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save ();
    })
    .then (({product, quantity, _id}) => {
      res.status (201).json ({
        product,
        quantity,
        _id,
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.getOrder = (req, res, next) => {
  const id = req.params.id;
  Order.findById (id)
    .select ('product quantity _id')
    .populate ('product')
    .then (order => {
      if (!order) {
        return res.status (404).json ({
          message: 'order not found',
        });
      }
      res.status (200).json ({
        order,
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};

exports.deleteOrder = (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndDelete (id)
    .then (result => {
      res.status (200).json ({
        message: `order was deleted: ${id}`,
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};
