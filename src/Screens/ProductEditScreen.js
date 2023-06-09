import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'

const ProductEditScreen =({match,history})=>{
    const productId =match.params.id
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [quantity,setQuantity]=useState(0)
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('')


    const dispatch =useDispatch()

    const productDetails=useSelector((state)=>state.productDetails)
    const {loading,error,product}=productDetails
    const productUpdate =useSelector((state)=>state.productUpdate)

    const{
        loading:loadingUpdate,
        error:errorUpdate,
        success:successUpdate
    }=productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !==productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setQuantity(product.quantity)
                setDescription(product.description)
                setCategory(product.category)
            }
        }
    },[dispatch, history, productId, product, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({_id:productId,name,price,quantity,description,category}))
    }


    return (
        <>
            <Link to ='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value ={name}
                                onChange ={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value ={price}
                                onChange ={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='quantity'>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter quantity'
                                value ={quantity}
                                onChange ={(e) => setQuantity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter dscription'
                                value ={description}
                                onChange ={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter category'
                                value ={category}
                                onChange ={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update

                        </Button>

                    </Form>
                )

                }
            </FormContainer>
        </>
    )

}

export default ProductEditScreen


