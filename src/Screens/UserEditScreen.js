import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match,history})=>{
    const userId =match.params.id

    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName] =useState('')
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.username || user._id !==userId){
                dispatch(getUserDetails(userId))
            } else{
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setUsername(user.username)
                setEmail(user.email)
                setRole(user.role)

            }
        }
    },[dispatch,history,userId,user,successUpdate])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id: userId,firstName,lastName,username,email,role}))
    }

    return(
        <>
            <Link to='/admin/userlist' className='btn btn-danger my-3'>
                 Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader/>
                ) : error ?(
                    <Message variant='danger'> {error} </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter first name'
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter last name'
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='username'>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter user name'
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email '
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='role'>
                            <Form.Check
                                type='checkbox'
                                label='is Admin'
                                checked={role==='admin'}
                            >
                            </Form.Check>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>

                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen