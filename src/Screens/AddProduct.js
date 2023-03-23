import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import FormContainer from '../components/FormContainer'

class AddProductScreen extends Component {
    state = {
        name:"",
        price:"",
        quantity:"",
        description:"",
        productPictures:null,
        category:""
    }

    handleFileChange =(event)=>{
        this.setState({
            productPictures:event.target.files[0]
        })
    }

    handleInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        })
    }

    handleSubmit =(event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append("name",this.state.name);
        formData.append("price",this.state.price);
        formData.append("quantity",this.state.quantity);
        formData.append("description",this.state.description);
        formData.append("productPictures",this.state.productPictures);
        formData.append("category",this.state.category);

        const token =localStorage.getItem("token");
        const {userId} = decode(token);

        axios.post(`http://localhost:2000/api/product/create`,
        formData,
        {
            headers: {Authorization: `Bearer ${token}`}
        }        
        )

        alert("Product added successfully")
    }


    render(){
        return (
        <>
            <Link to='/admin/productlist' className='btn btn-danger my-3'>
                Go Back
            </Link>

           <FormContainer>
               <h1>Create Product</h1>
               <Form onSubmit={this.handleSubmit}>
                   <Form.Group controId='name'>
                       <Form.Label>Product Name</Form.Label>
                       <Form.Control
                        type='name'
                        placeholder='Enter product name'
                        value={this.state.name}
                        name="name"
                        onChange={this.handleInputChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group> 

                   <Form.Group controlId='price'>
                       <Form.Label>Product Price</Form.Label>
                       <Form.Control
                        type='number'
                        placeholder='Enter the price'
                        value={this.state.price}
                        name="price"
                        onChange={this.handleInputChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='quantity'>
                       <Form.Label>Product Quantity</Form.Label>
                       <Form.Control
                        type='number'
                        placeholder='Enter the quantity'
                        value={this.state.quantity}
                        name="quantity"
                        onChange={this.handleInputChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='description'>
                       <Form.Label>Product Description</Form.Label>
                       <Form.Control
                        type='text'
                        placeholder='Enter the description'
                        value={this.state.description}
                        name="description"
                        onChange={this.handleInputChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='productPictures'>
                       <Form.Label>Product Image</Form.Label>
                       <Form.Control
                        type='file'
                        placeholder='Image'
                        name="productPictures"
                        onChange={this.handleFileChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group> 

                   <Form.Group controlId='category'>
                       <Form.Label>Category</Form.Label>
                       <Form.Control
                        type='text'
                        placeholder='Enter the category'
                        value={this.state.category}
                        name="category"
                        onChange={this.handleInputChange}
                        required
                       >
                       </Form.Control>
                   </Form.Group> 

                   <Button type='submit' variant='primary'>
                       Create Product

                   </Button>

               </Form>
           </FormContainer>
        </>
            
        )
    }
}

export default AddProductScreen