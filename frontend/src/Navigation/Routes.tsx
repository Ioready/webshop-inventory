import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Layouts/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../screens/auth';
import Products from '../screens/products';
import Home from '../screens/dashboard';
import Order from '../screens/orders';
import Webshopproduct from '../screens/webshopproduct';
import AllOrdersPage from '../screens/orders/allorders';
import CustomerDetailsPage from '../screens/customer';
import CustomerPage from '../screens/customerspage';
import CMS from '../screens/cms';
import Blog from '../screens/cms/blog';
import BlogForm from '../screens/cms/blog/addblog';
import Herosection from '../screens/cms/herosection';
import Aboutus from '../screens/cms/aboutus';
import Return from '../screens/cms/return';
import Privacy from '../screens/cms/privacy';
import Terms from '../screens/cms/termscondition';
import Review from '../screens/cms/review';
import Header from '../screens/cms/header';
import Footer from '../screens/cms/footer';
import Enqury from '../screens/enquiry';
import TopProducts from '../screens/cms/product';
import AddProduct from '../screens/cms/product/addproduct';
import TopCategory from '../screens/cms/category';
import BestProducts from '../screens/cms/bestproduct';
import AddBestProduct from '../screens/cms/bestproduct/addbestproduct';
import ReviewForm from '../screens/cms/review/editreview';
import AddCategory from '../screens/products/add/addcategorie';
import AddSubCategory from '../screens/products/add/addsubcategorie';
import AddSubSubCategory from '../screens/products/add/addsubsubcategorie';

const Scanner = lazy(() => import('../screens/scanner'));
const SalesReport = lazy(() => import('../screens/sales-report'));

export const Navigation = () => {

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/*" element={<Products />} />
          <Route path="/order" element={<Order />} />
          <Route path="/all-orders" element={<AllOrdersPage />} />
          <Route path="/customer-details" element={<CustomerDetailsPage />} />
          <Route path="/webshop-product" element={<Webshopproduct />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/enqury" element={<Enqury />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addsubcategory" element={<AddSubCategory />} />
          <Route path="/addsubsubcategory" element={<AddSubSubCategory />} />
          <Route path="/cms" element={<CMS />} />
          <Route
            path="/cms/top-product"
            element={<TopProducts />}
          />
          <Route path="/cms/add-product" element={<AddProduct />} />
          <Route path="/cms/top-category" element={<TopCategory />} />
          <Route path="/cms/best-product" element={<BestProducts />} />
          <Route path="/cms/add-best-product" element={<AddBestProduct />} />
          <Route path="/cms/blog-list" element={<Blog />} />
          <Route path="/add-blog" element={<BlogForm />} />
          <Route path="/cms/herosection" element={<Herosection />} />
          <Route path="/cms/about-us" element={<Aboutus />} />
          <Route path="/cms/return-policy" element={<Return />} />
          <Route path="/cms/privacy-policy" element={<Privacy />} />
          <Route path="/cms/terms-conditions" element={<Terms />} />
          <Route path="/cms/review" element={<Review />} />
          <Route path="/cms/edit-review" element={<ReviewForm />} />
          <Route path="/cms/header" element={<Header />} />
          <Route path="/cms/footer" element={<Footer />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
