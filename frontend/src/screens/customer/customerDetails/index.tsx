// import React, { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useFetchByLoad } from '../../../contexts';
// import { useParams } from 'react-router-dom';

// const CustomerDetail: React.FC = () => {

//     const {id} = useParams();
//     const { fetch, data } = useFetchByLoad();
//     // const { remove } = useDelete();
  
//     useEffect(() => {
//       fetch({ url: `/customerDetails/${id}` });
//     }, [ id]);
  
//     console.log(data,"datauser")

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
//               <div className="d-flex align-items-center">
//                 <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg" alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
//                 <div>
//                   <p>Round Dream Lounger Upholstered Movie Bed</p>
//                   <p>$6,420.00 x 1</p>
//                   <p>Total: $6,420.00</p>
//                 </div>
//               </div>
//               <div className=' d-flex justify-content-start'>
//               <h5 className="card-title">Paid</h5>
//               <p className="card-text">Subtotal: $6,420.00</p>
//               <p className="card-text">Total: $6,420.00</p>
//               <p className="card-text">Paid: $6,420.00</p>
//           {/* <button className="btn btn-primary">Fulfill item</button> */}
//           </div>
//             </div>
//           </div>
//           <div className="card mb-4">
//             <div className="card-body">
             
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

// export default CustomerDetail;


import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchByLoad } from '../../../contexts';
import { useParams } from 'react-router-dom';

// Define interfaces for the product, order, and customer
interface Product {
    _id: string;
    title: string;
    images: string[];
    price: number;
}

interface OrderItem {
    _id: string;
    productId: Product;
    name: string;
    price: number;
    quantity: number;
    totalAmount: number;
}

interface Order {
    _id: string;
    order_unique_id: string;
    orderItems: OrderItem[];
    paymentDetails: {
        paymentMethod: string;
        paymentStatus: string;
        transaction_id: string;
    };
    shippingAddress: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
        email: string;
    };
    shippingDetails: {
        shipmentProvider: string;
        shipmentStatus: string;
        trackingNumber: string;
    };
    orderStatus: string;
    totalOrderAmount: number;
    orderDate: string;
}

interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    totalOrders: number;
    totalAmountSpent: number;
    orders: Order[];
}

const CustomerDetail: React.FC = () => {
    const { id } = useParams();  // Fetch the customer ID from the URL
    const { fetchById, data } = useFetchByLoad();  // Hook to fetch data from API

    // Fetch customer details on component mount
    useEffect(() => {
        fetchById({ url: `/getUserDetailsById/${id}` });
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;  // Show a loader while data is being fetched
    }

    const customer = data as Customer;  // Cast the response to `Customer` type
    const { firstName, lastName, email, orders = [], totalOrders, totalAmountSpent } = customer;  // Destructure the response

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Customer: {firstName} {lastName}</h2>
                <div>
                    <p>Total Orders: {totalOrders}</p>
                    <p>Total Amount Spent: ${totalAmountSpent.toFixed(2)}</p>
                </div>
            </div>

            {/* Display Customer Details */}
            <div className="row">
                <div className="col-md-8">
                    {/* Loop through each order */}
                    {orders.map(order => (
                        <div className="card mb-4" key={order._id}>
                            <div className="card-body">
                                <h5 className="card-title">Order #{order.order_unique_id}</h5>
                                <p className="card-text">Order Status: {order.orderStatus}</p>
                                <p className="card-text">Payment Status: {order.paymentDetails.paymentStatus}</p>
                                <p className="card-text">Transaction ID: {order.paymentDetails.transaction_id}</p>

                                {/* Display Order Items */}
                                <h6>Order Items:</h6>
                                {order.orderItems.map(item => (
                                    <div key={item._id} className="d-flex align-items-center mb-3">
                                        <img src={item.productId.images[0]} alt={item.productId.title} className="img-thumbnail me-3" style={{ width: '100px' }} />
                                        <div>
                                            <p>{item.productId.title}</p>
                                            <p>Price: ${item.price.toFixed(2)} x {item.quantity}</p>
                                            <p>Total: ${item.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Display payment and order details */}
                                <div className='justify-content-start'>
                                    <h6>Payment Details:</h6>
                                    <p className="card-text">Subtotal: ${order.totalOrderAmount.toFixed(2)}</p>
                                    <p className="card-text">Paid: ${order.totalOrderAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Customer Contact Information */}
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5>Customer Info</h5>
                            <p>{firstName} {lastName}</p>
                            <p>{totalOrders} order(s)</p>
                            <p><a href={`mailto:${email}`}>{email}</a></p>
                            <p>Phone: {orders[0]?.shippingAddress?.phone || "Not Available"}</p>
                            <p>
                                {orders[0]?.shippingAddress?.addressLine1}, {orders[0]?.shippingAddress?.addressLine2}, {orders[0]?.shippingAddress?.city}, {orders[0]?.shippingAddress?.state}, {orders[0]?.shippingAddress?.zipCode}, {orders[0]?.shippingAddress?.country}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;

