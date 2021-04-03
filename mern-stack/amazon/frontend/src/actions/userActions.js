import axios from "axios";
import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_SIGNOUT, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, 
    USER_DETAILS_FAIL, 
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL, 
    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_FAIL,
    USER_TOPSELLERS_LIST_REQUEST,
    USER_TOPSELLERS_LIST_SUCCESS,
    USER_TOPSELLERS_LIST_FAIL
} from "../constants/userConstants";

export const signin = (email, password) => dispatch => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password }
    });
    axios.post('/api/users/signin', { email, password })
    .then(({data}) => {
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    })
    .catch(err => {
        dispatch({ 
            type: USER_SIGNIN_FAIL,
            payload: err.message
        });
    })
};

export const register = (name, email, password) => dispatch => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password }
    });
    axios.post('/api/users/register', { name, email, password })
    .then(({data}) => {
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    })
    .catch(err => {
        dispatch({ 
            type: USER_REGISTER_FAIL,
            payload: err.message
        });
    })
};

export const signout = () => dispatch => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    });
    document.location.href = '/signin';
};

export const detailsUser = userId => (dispatch, getState) => {
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload: userId
    });
    const userInfo = getState().userSignin.userInfo;
    axios.get(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.message
        })
    })
};

export const updateUserProfile = user => (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
        payload: user
    });
    const userInfo = getState().userSignin.userInfo;
    axios.put('/api/users/profile', user, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({ 
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    })
    .catch(err => {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.message
        })
    })
};

export const listUsers = () => (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    const userInfo = getState().userSignin.userInfo;
    axios.get('/api/users', {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({ 
            type: USER_LIST_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.message
        })
    })
};

export const deleteUser = userId => (dispatch, getState) => {
    dispatch({
        type: USER_DELETE_REQUEST,
        payload: userId
    })
    const userInfo = getState().userSignin.userInfo;
    axios.delete(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.message
        })
    })
};

export const updateUser = user => (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE_REQUEST,
        payload: user
    })
    const userInfo = getState().userSignin.userInfo;
    axios.put(`/api/users/${user._id}`, user, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then(({data}) => {
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.message
        })
    })
}

export const listTopSellers = () => dispatch => {
    dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
    axios.get('/api/users/top-sellers')
    .then(({data}) => {
        dispatch({
            type: USER_TOPSELLERS_LIST_SUCCESS,
            payload: data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: USER_TOPSELLERS_LIST_FAIL,
            payload: err.message
        })
    })
}