import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Registration from './components/Registration';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './components/products';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import History from './components/History';
import MyCart from './components/MyCart';

import Users from './admin_components/Users';
import Orders from './admin_components/Orders';
import AddCategory from './admin_components/AddCategory';
import AddProduct from './admin_components/AddProduct';
import AdminProducts from './admin_components/Products';
import AdminProductItem from './admin_components/ProductItem';
import UpdateProduct from './admin_components/Update';
import AdminProtectedRoute from './admin_components/AdminProtectedRoute';
import Dashboard from './admin_components/Dashoard';
import AdminNavbar from './admin_components/AdminNavbar';
import AdminLogin from './admin_components/AdminLogin';
import AdminSignup from './admin_components/AdminSignup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/shopping" element={<ProtectedRoute Component={Products} />} />
          <Route path="/order-details/:id" element={<ProtectedRoute Component={Checkout} />} />
          <Route path="/my-orders" element={<ProtectedRoute Component={MyOrders} />} />
          <Route path="/my-history" element={<ProtectedRoute Component={History} />} />
          <Route path="/my-cart" element={<ProtectedRoute Component={MyCart} />} />

          {/* Admin Routes */}
          <Route path="/alogin" element={<AdminLogin />} />
          <Route path="/asignup" element={<AdminSignup />} />
          <Route path="/admin/navbar" element={<AdminNavbar />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/all-products" element={<AdminProducts />} />
          <Route path="/admin/product/:id" element={<AdminProductItem />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/product-update/:id" element={<UpdateProduct />} />

          {/* Not Found */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
