// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Popup from './popup';  // Import the Popup component
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from '../../components/Breadcrumbs';
// import { CiSearch } from "react-icons/ci";
// import { useDelete, useFetchByLoad } from '../../contexts';
// import { message } from 'antd';

// interface Order {
//   id: string;
//   date: string;
//   customer: string;
//   customerDetail: string;
//   channel: string;
//   total: string;
//   paymentStatus: string;
//   fulfillmentStatus: string;
//   items: string;
//   deliveryStatus: string;
//   deliveryMethod: string;
//   tags: string;
// }

// const OrderTable: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
//   const [popupCustomer, setPopupCustomer] = useState<string | null>(null);

//   const { fetch, data } = useFetchByLoad();
//   const { remove } = useDelete();

//   useEffect(() => {
//     fetch({ url: '/cart/getOrder' });
//   }, []);

//   useEffect(() => {
//     if (data?.orders) {
//       const apiOrders = data.orders.map((order: any) => ({
//         id: order.order_unique_id,
//         date: new Date(order.orderDate).toLocaleString(),
//         customer: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
//         customerDetail: order,
//         channel: 'Online Store',  // Static since API doesn't provide it
//         total: `$${order.orderItems.reduce((sum: number, detail: any) => sum + detail.totalAmount, 0).toFixed(2)}`,
//         paymentStatus: order.paymentDetails.paymentStatus,
//         fulfillmentStatus: 'Unfulfilled', // Static, adjust as needed
//         items: `${order.orderItems.length} item${order.orderItems.length > 1 ? 's' : ''}`,
//         deliveryStatus: order.orderStatus || 'Pending', // Default to Pending if not provided
//         deliveryMethod: order.shippingDetails.shipmentProvider || 'Free Shipping',
//         tags: '', // Static or derived
//       }));

//       setOrders(apiOrders);
//     }
//   }, [data]);

//   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       setSelectedOrders(orders.map(order => order.id));
//     } else {
//       setSelectedOrders([]);
//     }
//   };

//   const handleCheckboxChange = (id: string) => {
//     if (selectedOrders.includes(id)) {
//       setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
//     } else {
//       setSelectedOrders([...selectedOrders, id]);
//     }
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       await remove('/cart/deleteOrder', { _id: selectedOrders });
//       message.success("Selected orders deleted successfully");
//       fetch({ url: '/cart/getOrder' });
//     } catch (error) {
//       console.error("Error deleting orders:", error);
//       message.error("Error deleting orders");
//     }
//     setSelectedOrders([]);
//   };

//   const handleCustomerClick = (customer: string) => {
//     setPopupCustomer(customer);
//   };

//   const closePopup = () => {
//     setPopupCustomer(null);
//   };

//   const navigate = useNavigate();

//   const handleViewAllPage = () => {
//     navigate("/all-orders");
//   };

//   const handleDeliveryStatusChange = (id: string, status: string) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === id ? { ...order, deliveryStatus: status } : order
//       )
//     );
//   };

//   return (
//     <div className='d-flex flex-column'>
//       <Breadcrumbs pageName="Orders" />
//       <div className="container mt-4">
//         {selectedOrders.length > 0 && (
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <button
//               className="btn btn-danger"
//               onClick={handleDeleteSelected}
//               disabled={selectedOrders.length === 0}
//             >
//               Delete Selected
//             </button>
//           </div>
//         )}

//         <div className='d-flex justify-content-between align-items-center mb-4 order_upper_block'>
//           <div className='d-flex p-2 bg-white' style={{ gap: "0.5rem", border: "1px solid gray", borderRadius: "1rem" }}>
//             <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>All</p>
//             <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Unpaid</p>
//             <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Open</p>
//             <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Newest</p>
//           </div>

//           <div className="input-group p-1 rounded w-50" style={{ position: "relative" }}>
//             <input type="search" className="form-control rounded-5" placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ border: "1px solid gray" }} />
//             <span className="input-group-text border-0" id="search-addon" style={{ position: "absolute", right: "1rem", top: "0.7rem" }}>
//               <CiSearch style={{ fontSize: "1.5rem" }} />
//             </span>
//           </div>
//         </div>
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered table-hover">
//             <thead className="thead-dark">
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectedOrders.length === orders.length}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>Order</th>
//                 <th>Date</th>
//                 <th>Customer</th>
//                 <th>Channel</th>
//                 <th>Total</th>
//                 <th>Payment Status</th>
//                 <th>Fulfillment Status</th>
//                 <th>Items</th>
//                 <th className=" d-inline-block" style={{ width: "120px", }}> Delivery Status</th>

//                 <th>Delivery Method</th>
//                 <th>Tags</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedOrders.includes(order.id)}
//                       onChange={() => handleCheckboxChange(order.id)}
//                     />
//                   </td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.id}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.date}</td>
//                   <td className="text-nowrap">
//                     <span onClick={() => handleCustomerClick(order.customerDetail)} style={{ cursor: 'pointer', color: 'blue' }}>
//                       {order.customer}
//                     </span>
//                   </td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.channel}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.total}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.paymentStatus}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.fulfillmentStatus}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.items}</td>
//                   <td className="text-nowrap">
//                   <p>Status: {order.deliveryStatus}</p>
//   <select
//     className="h-25 form-select form-select-sm" // Bootstrap's form-select for smaller size
//     value={order.deliveryStatus}
//     onChange={(e) => handleDeliveryStatusChange(order.id, e.target.value)}
//   >
//     <option value="Placed">Placed</option>
//     <option value="Pending">Pending</option>
//     <option value="Delivered">Delivered</option>
//   </select>
// </td>

//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.deliveryMethod}</td>
//                   <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.tags}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {popupCustomer && (
//           <Popup customer={popupCustomer} onClose={closePopup} />
//         )}
//         <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
//           <ul className="pagination">
//             <li className="page-item">
//               <a className="page-link" href="#" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//               </a>
//             </li>
//             <li className="page-item">
//               <a className="page-link" href="#">
//                 1
//               </a>
//             </li>
//             <li className="page-item">
//               <a className="page-link" href="#" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//               </a>
//             </li>
//           </ul>
//           <p>Showing 1 to {orders.length} of {orders.length} entries</p>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default OrderTable;



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './popup';  // Import the Popup component
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { CiSearch } from "react-icons/ci";
import { useDelete, useFetchByLoad, usePatch } from '../../contexts';
import { message } from 'antd';

interface Order {
  id: string;
  date: string;
  customer: string;
  customerDetail: string;
  channel: string;
  total: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  items: string;
  deliveryStatus: string;
  deliveryMethod: string;
  tags: string;
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [popupCustomer, setPopupCustomer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page state
  const [ordersPerPage] = useState<number>(5); // Number of orders per page

  const { fetch, data ,loading} = useFetchByLoad();
  const { remove } = useDelete();
  const { edit } = usePatch();

  useEffect(() => {
    fetch({ url: '/cart/getOrder' });
  }, []);

  useEffect(() => {
    if (data?.orders) {
      const apiOrders = data.orders.map((order: any) => ({
        id: order.order_unique_id,
        date: new Date(order.orderDate).toLocaleString(),
        customer: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        customerDetail: order,
        channel: 'Online Store',  // Static since API doesn't provide it
        total: `$${order.orderItems.reduce((sum: number, detail: any) => sum + detail.totalAmount, 0).toFixed(2)}`,
        paymentStatus: order.paymentDetails.paymentStatus,
        fulfillmentStatus: 'Unfulfilled', // Static, adjust as needed
        items: `${order.orderItems.length} item${order.orderItems.length > 1 ? 's' : ''}`,
        deliveryStatus: order.orderStatus || 'Pending', // Default to Pending if not provided
        deliveryMethod: order.shippingDetails.shipmentProvider || 'Free Shipping',
        tags: '', // Static or derived
      }));

      setOrders(apiOrders);
    }
  }, [data]);

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Get filtered orders based on the search term
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the orders to display based on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOrders(currentOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await remove('/cart/deleteOrder', { _id: selectedOrders });
      message.success("Selected orders deleted successfully");
      fetch({ url: '/cart/getOrder' });
    } catch (error) {
      console.error("Error deleting orders:", error);
      message.error("Error deleting orders");
    }
    setSelectedOrders([]);
  };

  const handleCustomerClick = (customer: string) => {
    setPopupCustomer(customer);
  };

  const closePopup = () => {
    setPopupCustomer(null);
  };

  const navigate = useNavigate();

  const handleViewAllPage = () => {
    navigate("/all-orders");
  };

  const handleDeliveryStatusChange = async(id: string, status: string) => {
    // setOrders((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order.id === id ? { ...order, deliveryStatus: status } : order
    //   )
    // );
    await edit('/cart/updateOrderStatus', { orderId:id, newStatus:status});
     await  fetch({ url: '/cart/getOrder' });
    message.success("Selected order status updated successfully");
  };

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage); // Calculate total pages

  return (
    <div className='d-flex flex-column'>
      <Breadcrumbs pageName="Orders" />
      <div className="container mt-4">
        {selectedOrders.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-danger"
              onClick={handleDeleteSelected}
              disabled={selectedOrders.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}

        <div className='d-flex justify-content-between align-items-center mb-4 order_upper_block'>
          {/* <div className='d-flex p-2 bg-white' style={{ gap: "0.5rem", border: "1px solid gray", borderRadius: "1rem" }}>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>All</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Unpaid</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Open</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Newest</p>
          </div> */}

          <div className="input-group p-1 rounded w-50" style={{ position: "relative" }}>
            <input
              type="search"
              className="form-control rounded-5"
              placeholder="Search by Order ID"
              aria-label="Search"
              aria-describedby="search-addon"
              style={{ border: "1px solid gray" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="input-group-text border-0" id="search-addon" style={{ position: "absolute", right: "1rem", top: "0.7rem" }}>
              <CiSearch style={{ fontSize: "1.5rem" }} />
            </span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === currentOrders.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Channel</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Fulfillment Status</th>
                <th>Items</th>
                <th className=" d-inline-block" style={{ width: "120px", }}> Delivery Status</th>

                <th>Delivery Method</th>
                <th>Tags</th>
              </tr>
            </thead>
            {loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.id}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.date}</td>
                  <td className="text-nowrap">
                    <span onClick={() => handleCustomerClick(order.customerDetail)} style={{ cursor: 'pointer', color: 'blue' }}>
                      {order.customer}
                    </span>
                  </td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.channel}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.total}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.paymentStatus}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.fulfillmentStatus}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.items}</td>
                  <td className="text-nowrap">
                    <select
                      className="h-25 form-select form-select-sm" // Bootstrap's form-select for smaller size
                      value={order.deliveryStatus}
                      onChange={(e) => handleDeliveryStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Placed">Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.deliveryMethod}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.tags}</td>
                </tr>
              ))}
            </tbody>
              )}
          </table>
        </div>

        {/* Pagination Controls */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>

        {/* Popup Component */}
        {popupCustomer && <Popup onClose={closePopup} customer={popupCustomer} />}
      </div>
    </div>
  );
};

export default OrderTable;
