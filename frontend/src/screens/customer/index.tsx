import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

interface CustomerDetails {
  name: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  orderId: number;
  orderStatus: string;
  fulfillmentStatus: string;
  orderDate: string;
  orderAmount: string;
  orderItem: string;
}

const CustomerDetailsPage: React.FC = () => {
  const history = useNavigate();

  const customer: CustomerDetails = {
    name: "Mark Hyman",
    location: "Austin TX, United States",
    email: "alli@candidwalls.com",
    phone: "+1 413-637-9991",
    address: "4321 Far West Blvd, Austin Texas 78731, United States",
    orderId: 1014,
    orderStatus: "Paid",
    fulfillmentStatus: "Unfulfilled",
    orderDate: "July 10, 2024 at 7:16 pm from Draft Orders",
    orderAmount: "$6,420.00",
    orderItem: "Round Dream Lounger Upholstered Movie Bed"
  };

  const handleViewAllOrders = () => {
    history('/customer-details');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{customer.name}</h2>
          <p>{customer.location}</p>
          <p>Customer for about 19 hours</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>Amount spent</h5>
                  <p>{customer.orderAmount}</p>
                </div>
                <div>
                  <h5>Order</h5>
                  <p>1</p>
                </div>
              </div>
              <div>
                <h5>Last order placed</h5>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p><a href="#">#{customer.orderId}</a> <span className="badge bg-success">{customer.orderStatus}</span> <span className="badge bg-warning">{customer.fulfillmentStatus}</span></p>
                    <p>{customer.orderDate}</p>
                  </div>
                  <p>{customer.orderAmount}</p>
                </div>
                <div className="d-flex align-items-center">
                  <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg" alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
                  <div className="d-flex justify-content-between w-100">
                    <p>{customer.orderItem}</p>
                    <p>x1</p>
                    <p>{customer.orderAmount}</p>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleViewAllOrders}>View all orders</button>
                <button className="btn btn-secondary mt-3 ms-3">Create order</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer</h5>
              <div>
                <p>Contact information</p>
                <p><a href={`mailto:${customer.email}`}>{customer.email}</a></p>
                <p>{customer.phone}</p>
                <p>Will receive notifications in English</p>
              </div>
              <div>
                <p>Default address</p>
                <p>{customer.name}</p>
                <p>{customer.address}</p>
                <p>{customer.phone}</p>
              </div>
              <div>
                <p>Marketing</p>
                <p>Email not subscribed</p>
                <p>SMS not subscribed</p>
              </div>
              <div>
                <p>Tax exemptions</p>
                <p>No exemptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
