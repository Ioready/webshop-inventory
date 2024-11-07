// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AllOrdersPage: React.FC = () => {
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Order #1014</h2>
        
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card mb-4">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="card-title">Unfulfilled</h5>
                
//               </div>
//               <p className="card-text">Location: Alibaba</p>
//               <p className="card-text">Delivery method: Shipping</p>
              // <div className="d-flex align-items-center">
              //   <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg" alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
              //   <div>
              //     <p>Round Dream Lounger Upholstered Movie Bed</p>
              //     <p>$6,420.00 x 1</p>
              //     <p>Total: $6,420.00</p>
              //   </div>
              // </div>
//               <div className=' d-flex justify-content-end'>
//           <button className="btn btn-primary">Fulfill item</button>
//           </div>
//             </div>
//           </div>
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">Paid</h5>
//               <p className="card-text">Subtotal: $6,420.00</p>
//               <p className="card-text">Total: $6,420.00</p>
//               <p className="card-text">Paid: $6,420.00</p>
//             </div>
//           </div>

//         </div>
//         <div className="col-md-4">
//           {/* <div className="card mb-4">
//             <div className="card-body">
//               <h5>Notes</h5>
//               <p>No notes from customer</p>
//             </div>
//           </div> */}
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5>Customer</h5>
//               <p>Mark Hyman</p>
//               <p>1 order</p>
//               <p><a href="mailto:alli@candidwalls.com">alli@candidwalls.com</a></p>
//               <p>+1 413-637-9991</p>
//               <p>4321 Far West Blvd, Austin Texas 78731, United States</p>
//               <p>Same as shipping address</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrdersPage;






import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AllOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const location = useLocation();
  const customerDetail = location.state?.customerDetail;

  useEffect(() => {
    if (customerDetail) {
      setOrderDetails(customerDetail);
    }
  }, [customerDetail]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
        <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Order #{orderDetails.order_unique_id}</h2>
        <p>Status: {orderDetails.orderStatus}</p>
      </div>
      
      <div className="row">
        {/* Order Details */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Order Information</h5>
              <p className="card-text"><strong>Date:</strong> {new Date(orderDetails.orderDate).toLocaleString()}</p>
              <p className="card-text"><strong>Total Amount:</strong> ${orderDetails.totalOrderAmount.toFixed(2)}</p>
              <p className="card-text"><strong>Payment Method:</strong> {orderDetails.paymentDetails.paymentMethod}</p>
              <p className="card-text"><strong>Payment Status:</strong> {orderDetails.paymentDetails.paymentStatus}</p>
              <p className="card-text"><strong>Delivery Method:</strong> {orderDetails.shippingDetails.shipmentProvider}</p>
              <p className="card-text"><strong>Tracking Number:</strong> {orderDetails.shippingDetails.trackingNumber}</p>
              <h5 className="mt-4">Items</h5>
              
              <ul className="list-unstyled">
                {orderDetails.orderItems.map((item: any, index: number) => (
                  <li key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                    <img  src={item.images[0]}   alt={item.name} className="img-thumbnail me-3" style={{ width: '100px' }} />
                      <div>
                        <p><strong>{item.name}</strong></p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${item.totalAmount}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>  
            </div>
          </div>
        </div> 
        {/* Customer Details */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer Information</h5>
              <p><strong>Name:</strong> {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</p>
              <p><strong>Email:</strong> {orderDetails.shippingAddress.email}</p>
              <p><strong>Phone:</strong> {orderDetails.shippingAddress.phone}</p>
              <p><strong>Address:</strong> {orderDetails.shippingAddress.addressLine1}, {orderDetails.shippingAddress.addressLine2}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country} - {orderDetails.shippingAddress.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;







