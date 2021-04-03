import express from "express";
import Order from "../models/orderModel.js";
import {isAdmin, isAuth, isSellerOrAdmin} from "../utils.js";

const orderRouter = express.Router();


orderRouter.get('/', isAuth, isSellerOrAdmin, (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? {seller} : {};
    Order.find({...sellerFilter}).populate('user', 'name')
    .then(orders => res.send(orders))
    .catch(err => res.send({ message: err.message }));
})

orderRouter.get('/mine', isAuth, (req, res) => {
    Order.find({ user: req.user._id })
    .then(orders => res.send(orders));
})

orderRouter.post('/', isAuth, (req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'cart is empty'})
    } else {
        const order = new Order({
            seller: req.body.orderItems[0].seller,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        order.save()
        .then(createdOrder => {
            res.status(201).send({ message: 'new order created', order: createdOrder});
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        })
    }
});

orderRouter.get('/:id', isAuth, (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if(order) {
            res.send(order)
        } else {
            res.status(404).send({ message: 'order not found'})
        }
    })
});

orderRouter.put('/:id/pay', isAuth, (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = { 
                id: req.body.id, 
                status: req.body.status, 
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };
            order.save()
            .then(updatedOrder => {
                res.send({ message: 'order paid', order: updatedOrder})
            }) 
        } else {
            res.status(404).send({ message: 'order not found' });
        }
    })
});

orderRouter.delete('/:id', isAuth, isAdmin, (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if(order) {
            order.remove()
            .then(deletedOrder => res.send({ message: 'order deleted successfully', order: deletedOrder }));
        } else {
            res.status(404).send({ message: 'order not found' });
        }
    })
    .catch(err => res.status(500).send({ message: err.message }));
});

orderRouter.put('/:id/deliver', isAuth, isAdmin, (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.save()
            .then(updatedOrder => {
                res.send({ message: 'order delivered', order: updatedOrder });
            })
        } else {
            res.status(404).send({ message: 'order not found'});
        }
    })
    .catch(err => res.status(500).send({ message: err.message }));
})



export default orderRouter;