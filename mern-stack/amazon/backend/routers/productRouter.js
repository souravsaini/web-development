import express from "express";

import data from "../data.js";
import Product from "../models/productModel.js";
import { isAuth, isAdmin, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? {seller} : {};
    Product.find({ ...sellerFilter, ...nameFilter }).populate(
        'seller',
        'seller.name seller.logo'
    )
    .then(products => {
        res.send({products})
    }
        )
    .catch(err => res.status(400).send({ message: err.message }));
})

productRouter.get('/seed', (req, res) => {
    Product.insertMany(data.products)
    .then(createdProducts => {
        res.send({ createdProducts });
    })
    .catch(err => {
        res.status(400).send({ message: err.message });
    })
});

productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
    )
    .then(product => {
        if(product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "product not found" })
        }
    })
    .catch(err => {
        res.status(400).send({ message: err.message });
    })
});

productRouter.post('/', isAuth, isSellerOrAdmin, (req, res) => {
    const product = new Product({
        // name: req.body.name,
        // image: req.body.image,
        // brand: req.body.brand,
        // category: req.body.category,
        // description: req.body.description,
        // price: req.body.price,
        // numReviews: 0,
        // countInStock: 10,
        // rating: 0
        name: 'sample name ' + Date.now(),
        seller: req.user._id,
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    product.save()
    .then(createdProduct => {
        res.send({ message: 'product created successfully', product: createdProduct });
    })
    .catch(err => res.status(500).send({ message: err.message }));
});

productRouter.put('/:id', isAuth, isSellerOrAdmin, (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        if(product) {
            product.name = req.body.name,
            product.image = req.body.image,
            product.brand = req.body.brand,
            product.category = req.body.category,
            product.description = req.body.description,
            product.price = req.body.price,
            product.countInStock = req.body.countInStock
            product.save()
            .then(updatedProduct => {
                res.send({ message: 'product updated successfully', product: updatedProduct });
            })
            .catch(err => res.status(500).send({ message: err.message }));
        } else {
            res.status(404).send({ message: 'product not found '});
        }
    })
});

productRouter.delete('/:id', isAuth, isAdmin, (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if(product) {
            product.remove()
            .then(deletedProduct => {
                res.send({ message: 'product deleted successfully', product: deletedProduct });
            })
        }
    })
    .catch(() => res.status(500).send({ message: 'product not found' }))
})

export default productRouter;