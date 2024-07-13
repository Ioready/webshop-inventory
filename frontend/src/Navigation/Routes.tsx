import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Layouts/Dashboard";
import { ProtectedRoute } from './ProtectedRoute'
import Login from '../screens/auth'
import Products from '../screens/products'
import Home from '../screens/dashboard'
import Order from '../screens/orders';
import Webshopproduct from '../screens/webshopproduct';
import CustomerDetailsPage from '../screens/orders/customer';
const Scanner = lazy(() => import('../screens/scanner'));

const SalesReport = lazy(() => import('../screens/sales-report'));

 

export const Navigation = () => {
    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/scanner" element={<Scanner />} />
                    <Route path="/dashboard" element={<Home/>} />
                    <Route path="/*" element={<Products />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/customer-details" element={<CustomerDetailsPage />} />
                    <Route path="/webshop-product" element={<Webshopproduct/>} />
                    {/* <Route path="/sales" element={<SalesReport />} /> */}
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
} 