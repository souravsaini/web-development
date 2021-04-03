const express = require ('express');

const isAuth = require ('../middleware/auth');
const {
  getAllOrders,
  createOrder,
  getOrder,
  deleteOrder,
} = require ('../controllers/orders');

const router = express.Router ();

router.get ('/', isAuth, getAllOrders);

router.post ('/', isAuth, createOrder);

router.get ('/:id', isAuth, getOrder);

router.delete ('/:id', isAuth, deleteOrder);

module.exports = router;
