// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface Address {
//   firstName: string;
//   lastName: string;
//   company: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
// }

// interface OrderDetail {
//   orderId: number;
//   orderStatus: string;
//   fulfillmentStatus: string;
//   orderDate: string;
//   orderAmount: string;
//   orderItem: string;
// }

// interface Customer {
//   userId: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//   };
//   shippingAddress: Address;
//   orderItems: OrderDetail[];
// }

// const CustomerDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const customer = location.state?.customer as Customer;

//   if (!customer) {
//     return <div>No customer data available</div>;
//   }

//   console.log(customer,"cjdj")
//   // const { userId, address, orderItems } = customer;
//   const latestOrder = customer.orderItems[0]; // Assuming orderDetails has at least one item

//   // const handleViewAllOrders = () => {
//   //   navigate('/customer-details');
//   // };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           <h2>{`${customer.userId.firstName} ${customer.userId.lastName}`}</h2>
//           <p>{`${customer.shippingAddress.addressLine1}, ${customer.shippingAddress.addressLine2}, ${customer.shippingAddress.city}, ${customer.shippingAddress.state}`}</p>
//           <p>Customer for about 19 hours</p>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card mb-4">
//             <div className="card-body">
//               <div className="d-flex justify-content-between">
//                 <div>
//                   <h5>Amount spent</h5>
//                   <p>${//@ts-ignore
//                   latestOrder.totalAmount}</p>
//                 </div>
//                 <div>
//                   <h5>Order</h5>
//                   <p>{//@ts-ignore
//                   latestOrder.quantity}</p>
//                 </div>
//               </div>
//               <div>
//                 <h5>Last order placed</h5>
//                 <hr />
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <p>
//                       <a href="#">#{//@ts-ignore
//                       latestOrder?.productId?._id}</a>
//                       <span className="badge bg-success">{latestOrder.orderStatus}</span>
//                       <span className="badge bg-warning">{latestOrder.fulfillmentStatus}</span>
//                     </p>
//                     <p>{//@ts-ignore
//                     customer.date}</p>
//                   </div>
//                   <p>${//@ts-ignore
//                   latestOrder.totalAmount}</p>
//                 </div>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <img src={//@ts-ignore
//                     latestOrder?.productId?.images} alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
//                   <div className="d-flex justify-content-between w-100">
//                     <p>{//@ts-ignore
//                     latestOrder?.productId?.title}</p>
//                     <p>x{//@ts-ignore
//                   latestOrder?.quantity}</p>
//                     <p>${//@ts-ignore
//                   latestOrder?.totalAmount}</p>
//                   </div>
//                 </div>
//                 {/* <button className="btn btn-primary mt-3" onClick={handleViewAllOrders}>View all orders</button> */}
//                 {/* <button className="btn btn-secondary mt-3 ms-3">Create order</button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5>Customer</h5>
//               <div>
//                 <p>Contact information</p>
//                 <p><a href={`mailto:${customer.userId.email}`}>{customer.userId.email}</a></p>
//                 <p>{customer.userId.phone}</p>
//                 <p>Will receive notifications in English</p>
//               </div>
//               <div>
//                 <p>Default address</p>
//                 <p>{`${customer.shippingAddress.firstName} ${customer.shippingAddress.lastName}`}</p>
//                 <p>{customer.shippingAddress.addressLine1}</p>
//                 <p>{customer.shippingAddress.phone}</p>
//               </div>
//               {/* <div>
//                 <p>Marketing</p>
//                 <p>Email not subscribed</p>
//                 <p>SMS not subscribed</p>
//               </div>
//               <div>
//                 <p>Tax exemptions</p>
//                 <p>No exemptions</p>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default CustomerDetailsPage;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  title: string;
  images: string[];
}

interface Address {
  firstName: string;
  lastName: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
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
  totalAmount: string;
  quantity: number;
  productId?: Product | null;
}

interface Customer {
  userId: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  shippingAddress: Address;
  orderItems: OrderDetail[];
  date: string;
}

const CustomerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state?.customer as Customer;

  if (!customer) {
    return <div>No customer data available</div>;
  }

  const createdAtDate = new Date(customer.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString();
  const formattedTime = createdAtDate.toLocaleTimeString();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{`${customer.userId.firstName} ${customer.userId.lastName}`}</h2>
          <p>{`${customer.shippingAddress.addressLine1}, ${customer.shippingAddress.addressLine2}, ${customer.shippingAddress.city}, ${customer.shippingAddress.state}`}</p>
          <p>Customer since: {formattedDate} at {formattedTime}</p>
        </div>
      </div>
      
      <div className="row">
        {/* Left Side: Order Details */}
        <div className="col-md-8">
          {customer.orderItems.map((order, index) => (
            <div key={order.orderId} className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Order {index + 1}</h5>
                    <p>Amount spent: ${order.totalAmount}</p>
                    <p>Quantity: {order.quantity}</p>
                  </div>
                </div>
                <div>
                  <h5>Last order placed</h5>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p>
                        <a href="#">
                          {order.productId ? `#${order.productId._id}` : "N/A"}
                        </a>
                        <span className="badge bg-success">{order.orderStatus}</span>
                        <span className="badge bg-warning">{order.fulfillmentStatus}</span>
                      </p>
                      <p>{order.orderDate}</p>
                    </div>
                    <p>${order.totalAmount}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  {order.productId && order.productId.images.length > 0 ? (
                    <img
                      src={order.productId.images[0]}
                      alt="Product"
                      className="img-thumbnail me-3"
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <div className="img-thumbnail me-3" style={{ width: '100px', height: '100px', backgroundColor: '#e9ecef' }}>No Image</div>
                  )}
                  <div className="d-flex justify-content-between w-100">
                    <p>{order.productId?.title || "No Title"}</p>
                    <p>x{order.quantity}</p>
                    <p>${order.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Customer Information */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer</h5>
              <div>
                <p>Contact information</p>
                <p><a href={`mailto:${customer.userId.email}`}>{customer.userId.email}</a></p>
                <p>{customer.userId.phone}</p>
                <p>Will receive notifications in English</p>
              </div>
              <div>
                <p>Default address</p>
                <p>{`${customer.shippingAddress.firstName} ${customer.shippingAddress.lastName}`}</p>
                <p>{customer.shippingAddress.addressLine1}</p>
                <p>{customer.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
