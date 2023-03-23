import React, { Component } from 'react'
import {Navbar,Nav, Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, Route } from 'react-router-dom'
import './style.css'
import SearchBox from '../searchbox'
import siteLogo from '../../images/electro.png'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../actions/userActions'


const Header =() =>{
  const dispatch = useDispatch()

  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo} =userLogin

  const logoutHandler =()=>{
    dispatch(logout())
  }

  return(
    <header>

      <div className="py-2 firstNav">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-9 d-none d-lg-block">
            <a href="#" className="small mr-3 topInfo"><span className="fas fa-phone mr-2 fIcon"></span>01-49982522</a> 
            <a href="#" className="small mr-3 topInfo"><span className="far fa-envelope mr-2 fIcon"></span> electro.nepal@gmail.com</a> 
            <a href="#" className="small mr-3 topInfo"><span className="fas fa-map-marker-alt mr-2 fIcon"></span> Kathmandu, Nepal</a> 
          </div>
          <div className="col-lg-3 text-right">
            <LinkContainer to='/login'>
              <a href="" className="small mr-3 topInfo"><span className="fas fa-unlock"></span> Log In</a>
            </LinkContainer>
            <LinkContainer to='/register'>
              <a href="" className="small btn btn-danger px-4 py-2 rounded-0"><span className="fas fa-users"></span> Register</a>
            </LinkContainer>
          </div>
        </div>
      </div>
    </div>

      <Navbar className='secondNav' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to ='/'>
            <Navbar.Brand className='logo'><img src={siteLogo}/></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({history})=><SearchBox history={history}/>}/>
            <Nav className= "ml-auto">
             
                <Nav.Link>
                  <i className='fas fa-heart'></i>  Wishlist
                </Nav.Link>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart         
                </Nav.Link>
              </LinkContainer>
              
                {userInfo ?(
                  <NavDropdown title={userInfo.username} id ='username'>
                    <LinkContainer to ='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Account
                    </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.role=="admin" && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
        
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="line"></div>
    </header>
  )
}


export default Header;