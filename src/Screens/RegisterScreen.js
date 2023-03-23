import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName]=useState('')
    const [username,setUsername] =useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])
    
      const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else {
          dispatch(register(firstName,lastName,username, email, password))
        }

        alert('User Registered successfully')
      }

      return(
          <FormContainer>
              <h1>Sign Up</h1>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader/>}

              <Form onSubmit={submitHandler}>
                  <Form.Group  controlId ='firstName'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        type='name'
                        placeholder='Enter your first name'
                        onChange ={(e) =>setFirstName(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group  controlId ='lastName'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control 
                        type='name'
                        placeholder='Enter your last name'
                        onChange ={(e) =>setLastName(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group  controlId ='username'>
                      <Form.Label>User Name</Form.Label>
                      <Form.Control 
                        type='name'
                        placeholder='Enter your user name'
                        onChange ={(e) =>setUsername(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group  controlId ='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type='email'
                        placeholder='Enter your email'
                        onChange ={(e) =>setEmail(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>
                  
                  <Form.Group  controlId ='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type='password'
                        placeholder='Enter your password'
                        onChange ={(e) =>setPassword(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group  controlId ='confirmPassword'>
                      <Form.Label>Confirm password</Form.Label>
                      <Form.Control 
                        type='password'
                        placeholder='Confirm your password'
                        onChange ={(e) =>setConfirmPassword(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                      Register
                  </Button>
              </Form>

              <Row className = 'py-3'>
                  <Col>
                    Already have an Account? {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                        Login
                    </Link>
                  </Col>
              </Row>
          </FormContainer>
      )
}

export default RegisterScreen