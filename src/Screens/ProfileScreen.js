import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({location, history})=>{
    const [firstName,setFirstName] =useState('')
    const [lastName,setLastName] =useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword] =useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state)=>state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
  
    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(()=>{{}
        if (!userInfo){
            history.push('/login')
        } else {
            if (!user || !user.username || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(listMyOrders())
            } else{
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setUsername(user.username)
                setEmail(user.email)
                
            }
        }
    },[dispatch, history, userInfo, user, success])


    return (
        <Row>
            <Col md ={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {}
                {success && <Message variant='success'>Profile Updated</Message>}

                {loading ?(
                    <Loader/>
                
                ) : (
                    <Form>

                        <Form.Group controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter first name'
                                value={userInfo.firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter last name'
                                value={userInfo.lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='username'>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter user name'
                                value={userInfo.username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={userInfo.email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                    </Form>
                )}           
            </Col>


            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ): (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order)=>(

                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>Rs.{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ?(
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ?(
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer to ={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>                        
                    </Table>
                )
                }           
            </Col>
        </Row>
    )
}

export default ProfileScreen


