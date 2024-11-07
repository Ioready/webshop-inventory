

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

// Type definitions for improved code readability
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  images?: string[];
}

interface Order {
  _id: string;
  order_unique_id: string;
  orderDate: string;
  orderStatus: string;
  totalOrderAmount: number;
  orderItems: OrderItem[];
}

interface CustomerDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  createdAt: string;
  isEmailVerified: boolean;
  orders?: Order[];
}

const CustomerViewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = location.state?.customerData as CustomerDetails | undefined;
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);

  useEffect(() => {
    if (customerData) {
      setCustomerDetails(customerData);
    }
  }, [customerData]);

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customer ID:{customerDetails._id}</h2>
        <p>Status: {customerDetails.isEmailVerified ? "Verified" : "Not Verified"}</p>
      </div>
      
      <div className="row">
       
        {/* Orders Section */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Order History</h5>
              {customerDetails.orders && customerDetails.orders.length > 0 ? (
                <ul className="list-unstyled">
                  {customerDetails.orders.map((order, index) => (
                    <li key={order._id || index} className="mb-4">
                      <div className="d-flex align-items-center">
                        <div>
                          <p><strong>Order ID:</strong> {order.order_unique_id}</p>
                          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                          <p><strong>Status:</strong> {order.orderStatus}</p>
                          <p><strong>Total Amount:</strong> €{order.totalOrderAmount.toFixed(2)}</p>

                          {/* Render each order item */}
                          <h6 className="mt-3">Items:</h6>
                          {order.orderItems.map((item, idx) => (
                            <div key={item.productId || idx} className="d-flex align-items-center mb-2">
                              {item.images && item.images.length > 0 ? (
                                <img 
                                  src={item.images[0]} 
                                  alt={item.name} 
                                  className="img-thumbnail me-3" 
                                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="img-thumbnail me-3" style={{ width: '80px', height: '80px', backgroundColor: '#e9ecef' }}>
                                  No Image
                                </div>
                              )}
                              <div>
                                <p><strong>Product:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Item Total:</strong> €{item.totalAmount.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found for this customer.</p>
              )}
            </div>
          </div>
        </div>
         {/* Customer Information */}
         <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer Information</h5>
              <p><strong>Name:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
              <p><strong>Email:</strong> {customerDetails.email}</p>
              <p><strong>Phone:</strong> {customerDetails.phone || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {customerDetails.birthDate || "N/A"}</p>
              <p><strong>Address:</strong> {customerDetails.address || "No Address Available"}</p>
              <p><strong>Joined On:</strong> {new Date(customerDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerViewPage;
