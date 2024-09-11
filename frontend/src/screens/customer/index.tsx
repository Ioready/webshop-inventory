import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface Address {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  addressComplement: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface OrderDetail {
  orderId: number;
  orderStatus: string;
  fulfillmentStatus: string;
  orderDate: string;
  orderAmount: string;
  orderItem: string;
}

interface Customer {
  userId: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: Address;
  orderDetails: OrderDetail[];
}

const CustomerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state?.customer as Customer;

  if (!customer) {
    return <div>No customer data available</div>;
  }

  const { userId, address, orderDetails } = customer;
  const latestOrder = orderDetails[0]; // Assuming orderDetails has at least one item

  // const handleViewAllOrders = () => {
  //   navigate('/customer-details');
  // };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{`${userId.firstName} ${userId.lastName}`}</h2>
          <p>{`${address.address}, ${address.addressComplement}, ${address.city}, ${address.state}`}</p>
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
                  <p>${//@ts-ignore
                  latestOrder.totalAmount}</p>
                </div>
                <div>
                  <h5>Order</h5>
                  <p>{//@ts-ignore
                  latestOrder.quantity}</p>
                </div>
              </div>
              <div>
                <h5>Last order placed</h5>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p>
                      <a href="#">#{//@ts-ignore
                      latestOrder.productId._id}</a>
                      <span className="badge bg-success">{latestOrder.orderStatus}</span>
                      <span className="badge bg-warning">{latestOrder.fulfillmentStatus}</span>
                    </p>
                    <p>{//@ts-ignore
                    customer.date}</p>
                  </div>
                  <p>${//@ts-ignore
                  latestOrder.totalAmount}</p>
                </div>
                </div>
                <div className="d-flex align-items-center">
                  <img src={//@ts-ignore
                    latestOrder.productId.images} alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
                  <div className="d-flex justify-content-between w-100">
                    <p>{//@ts-ignore
                    latestOrder.productId.title}</p>
                    <p>x{//@ts-ignore
                  latestOrder.quantity}</p>
                    <p>${//@ts-ignore
                  latestOrder.totalAmount}</p>
                  </div>
                </div>
                {/* <button className="btn btn-primary mt-3" onClick={handleViewAllOrders}>View all orders</button> */}
                {/* <button className="btn btn-secondary mt-3 ms-3">Create order</button> */}
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
                <p><a href={`mailto:${userId.email}`}>{userId.email}</a></p>
                <p>{userId.phone}</p>
                <p>Will receive notifications in English</p>
              </div>
              <div>
                <p>Default address</p>
                <p>{`${address.firstName} ${address.lastName}`}</p>
                <p>{address.address}</p>
                <p>{address.phone}</p>
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
    // </div>
  );
};

export default CustomerDetailsPage;
