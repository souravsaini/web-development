import express from "express";
import bcrypt from "bcrypt";
import data from "../data.js";
import {isAuth, isAdmin} from "../utils.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get('/top-sellers', (req, res) => {
    User.find({ isSeller: true })
    .sort({ 'seller.rating': -1 })
    .limit(3)
    .then(topSellers => {
        res.send(topSellers)
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
})

userRouter.get('/seed', (req, res) => {
    User.insertMany(data.users)
    .then(createdUsers => {
        res.send({ createdUsers });
    })
    .catch(err => {
        res.status(400).send({ message: err.message})
    })
});

userRouter.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(user)
                });
                return;
            } else {
                res.status(401).send({ message: 'invalid username or password' });
            }
        } else {  
            res.status(400).send({ message: 'user not found' });
        }
    })
})

userRouter.post('/register', (req, res) => {
    const user = new User({ 
        name: req.body.name, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save()
    .then(createdUser => {
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser)
        });
    }) 
});

userRouter.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(user) {
            res.send(user)
        } else {
            res.status(404).send({ message: 'user not found'})
        }
    })
    .catch(err => res.status(500).send({message: err.message}))
})

userRouter.put('/profile', isAuth, (req, res) => {
    User.findById(req.user._id)
    .then(user => {
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(user.isSeller) {
                user.seller.name = req.body.sellerName || user.seller.name;
                user.seller.logo = req.body.sellerLogo || user.seller.logo;
                user.seller.description = req.body.sellerDescription || user.seller.description;
            }
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            user.save()
            .then(updatedUser => {
                res.send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(updatedUser)
                })
            })
        }
    })
    .catch(err => res.send({ message: err.message }))
});

userRouter.get('/', isAuth, isAdmin, (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(err => res.send({ message: err.message }));
});

userRouter.delete('/:id', isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(user) {
            if(user.email === 'souravsaini972@gmail.com') {
                res.status(400).send({ message: 'can not delete admin user' })
                return;
            }
            user.remove()
            .then(deletedUser => res.send({ message: 'user deleted successfully', user: deletedUser }))
        } else {
            res.status(404).send({ message: 'user not found'})
        }
    })
    .catch(err => res.status(500).send({ message: err.message }))
});

userRouter.put('/:id', isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isSeller = req.body.isSeller || user.isSeller;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            user.save()
            .then(updatedUser => res.send({ message: 'user updated successfully', user: updatedUser }));
        } else {
            res.status(404).send({ message: 'user not found' });
        }
    })
    .catch(err => res.status(500).send({ message: err.message }))
});

export default userRouter;