import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import './style.css'
import Rating from '../Rating'

const Product = ({product})=>{
    return (
        <Card className = 'my-3 p-3 rounded'>
            <Link to ={`/product/${product._id}`}>
                 <Card.Img src= {`http://localhost:2000/${product.productPictures}`} variant='top' alt="Product image"/>
                
            </Link>

            <Card.Body>
                <Link to ={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text className="productPrice" as='h5'>Rs.{product.price}</Card.Text>

                <Card.Text as='div'>
                    <Rating
                        value={product.rating}     
                    />

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
