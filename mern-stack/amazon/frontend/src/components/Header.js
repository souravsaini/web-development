import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const userInfo = useSelector(state => state.userSignin.userInfo);

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout()); 
    }

    return (
        <header className="row">
            <div>
                <Link className="brand" to="/">amazon</Link>
            </div>
            <div>
                <Route render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                )}></Route>
            </div>
            <div>
                <Link to="/cart">Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                </li>
                                
                            </ul>
                        </div>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )
                } 
                {userInfo && userInfo.isSeller && (
                    <div className="dropdown">
                        <Link to="#admin">Seller {' '} <i className="fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/productlist/seller">Products</Link>
                            </li>
                            <li>
                                <Link to="/orderlist/seller">Orders</Link>
                            </li>
                        </ul>
                    </div>
                )}
                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                                <Link to="/orderlist">Orders</Link>
                            </li>
                            <li>
                                <Link to="/userlist">Users</Link>
                            </li>
                        </ul>
                    </div> 
                )}
            </div>
        </header>
    )
}

export default Header;