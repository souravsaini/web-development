import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

const CartScreen = props => {
    const productId = props.match.params.id;
    //to fetch ?qty={qty}
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const {cartItems, error } = useSelector(state => state.cart);

    const dispatch = useDispatch();
    useEffect(() => {
        if(productId)
            dispatch(addToCart(productId, qty));
    }, [dispatch, productId, qty])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {cartItems.length === 0 
                ? (<MessageBox>Cart is Empty. <Link to="/">Go to shopping</Link></MessageBox>)
                : (
                    <ul>
                        {
                            cartItems.map(cartItem => [
                                <li key={cartItem.product}>
                                    <div className="row">
                                        <div>
                                            <img src={cartItem.image} alt={cartItem.name} className="small" />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                                        </div>
                                        <div>
                                            <select 
                                                value={cartItem.qty} 
                                                onChange={e => dispatch(addToCart(cartItem.product, Number(e.target.value) ) )}
                                            >
                                                {[...Array(cartItem.countInStock).keys()].map(x => {
                                                    return <option key={x+1} value={x+1}>{x+1}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            ${cartItem.price}
                                        </div>
                                        <div>
                                            <button 
                                                type="button" 
                                                onClick={() => removeFromCartHandler(cartItem.product)}
                                            >Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ])
                        }
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} items) 
                                : ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                onClick={checkoutHandler} 
                                className="primary block" 
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen;
