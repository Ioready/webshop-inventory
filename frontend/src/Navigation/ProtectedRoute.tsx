import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spin } from "antd";
import { MainContext } from '../contexts/mainProvider'

export const ProtectedRoute = () => {
    const { token, isLoading } = useContext(MainContext)
    let location = useLocation();
    if (isLoading) {
        return <Spin />
    } else if (!token) {
        return <Navigate to="/login" state={{ from: location }} />
    }
    return (
        <Outlet />
    )
}