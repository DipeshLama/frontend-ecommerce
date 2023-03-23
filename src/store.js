import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer
} from './reducers/productReducer'

import { cartReducer } from './reducers/cartReducer'

import{
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer,
    userUpdateProfileReducer,


} from './reducers/userReducer'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
  } from './reducers/orderReducer'
  
const reducer =combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userUpdateProfile:userUpdateProfileReducer,
    cart:cartReducer,
    productCreate:productCreateReducer,
    productReviewCreate:productReviewCreateReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')):null

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState ={
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
      },
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]



const store=createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store