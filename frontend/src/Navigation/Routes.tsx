import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Layouts/Dashboard";
import { ProtectedRoute } from './ProtectedRoute'
import Login from '../screens/auth'
import Products from '../screens/products'

const Scanner = lazy(() => import('../screens/scanner'));
 

export const Navigation = () => {
    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/scanner" element={<Scanner />} />
                    <Route path="/*" element={<Products />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}