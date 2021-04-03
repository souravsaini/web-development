import bcrypt from "bcrypt";

const data = {
    users: [
        {
            name: 'sourav',
            email: 'souravsaini972@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true 
        },
        {
            name: 'john',
            email: 'john@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirt',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product' 
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirt',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4,
            numReviews: 12,
            description: 'high quality product' 
        },
        {
            name: 'Lacoste free Shirt',
            category: 'Shirt',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product' 
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 78,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product' 
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 12,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product' 
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4,
            numReviews: 19,
            description: 'high quality product' 
        }
    ]
}

export default data;