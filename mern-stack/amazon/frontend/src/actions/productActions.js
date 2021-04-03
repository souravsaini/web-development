import axios from "axios";
import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL, 
    PRODUCT_UPDATE_REQUEST, 
    PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL
} from "../constants/productConstants";

export const listProducts = ({ seller = '', name = '' }) => dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    axios.get(`/api/products/?seller=${seller}&name=${name}`)
    .then(resp => {
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: resp.data.products
        });
    })
    .catch(err => {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.message
        });
    });
};

export const detailsProduct = productId => dispatch => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });

    axios.get(`/api/products/${productId}`)
    .then(resp => {
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: resp.data
        });
    })
    .catch(err => {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.message
        });
    });
};

export const createProduct = () => (dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    });
    const userInfo = getState().userSignin.userInfo;
    axios.post('/api/products', {}, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product
        })
    })
    .catch(err => {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.message
        })
    })
};

export const updateProduct = product => (dispatch, getState) => {
    dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        payload: product
    });
    const userInfo = getState().userSignin.userInfo;
    axios.put(`/api/products/${product._id}`, product, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: err.message
        })
    })
};

export const deleteProduct = productId => (dispatch, getState) => {
    dispatch({
        type: PRODUCT_DELETE_REQUEST,
        payload: productId
    })
    const userInfo = getState().userSignin.userInfo;
    axios.delete(`/api/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.message
        })
    })
}