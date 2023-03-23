import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header';
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/Login/Login'
import RegisterScreen from './Screens/RegisterScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import ProductListScreen from './Screens/ProductListScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import AddProductScreen from './Screens/AddProduct';
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import ProfileScreen from './Screens/ProfileScreen'
import OrderListScreen from './Screens/OrderListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>
          <Route path='/shipping' component= {ShippingScreen}/>
          <Route path='/payment' component= {PaymentScreen}/>
          <Route path='/placeorder' component= {PlaceOrderScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/createproduct' component={AddProductScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path ='/' component={HomeScreen} exact />

        </Container>

      </main>
  
    </Router>
  );
}

export default App;
