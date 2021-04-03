import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = props => {
    //if user is not signed in, he should be redirected to signin screen
    const userInfo = useSelector(state => state.userSignin.userInfo);
    if(!userInfo) {
        props.history.push('/signin');
    }
    const shippingAddress = useSelector(state => state.cart.shippingAddress);

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        //dispatch shipping address action
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input 
                        type="text" 
                        id="fullname" 
                        placeholder="enter full name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        placeholder="enter address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder="enter city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal code</label>
                    <input 
                        type="text" 
                        id="postalCode" 
                        placeholder="enter postal code"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                        type="text" 
                        id="country" 
                        placeholder="enter country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen;
