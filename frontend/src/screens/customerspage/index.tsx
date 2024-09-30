// // import React, { useEffect, useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useNavigate } from 'react-router-dom';
// // import Breadcrumbs from '../../components/Breadcrumbs';
// // import { useFetchByLoad, useDelete } from '../../contexts';
// // import { message } from 'antd';

// // interface Customers {
// //   id: string;
// //   customer: string;
// //   email: string;
// //   location: string;
// //   order: string;
// //   amount: string;
// //   fullData: string;
// // }

// // export interface CustomerDetails {
// //   name: string;
// //   location: string;
// //   Customers: string;
// //   email: string;
// //   phone: string;
// //   fullData: string;
// // }

// // const CustomerPage: React.FC = () => {
// //   const [Customers, setCustomers] = useState<Customers[]>([]);
// //   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
// //   const { fetch, data } = useFetchByLoad();
// //   const { remove } = useDelete();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch({ url: '/cart/getOrder' });
// //   }, []);

// //   useEffect(() => {
// //     if (data) {
// //       const transformedCustomers = data.orders.map((order: any) => ({
// //         id: order._id,
// //         customer: `${order.userId.firstName} ${order.userId.lastName}`,
// //         email: order.userId.email,
// //         location: `${order.address.city}, ${order.address.state}, ${order.address.country}`,
// //         order: 'Paid',
// //         amount: `${order.orderDetails.reduce((acc: number, detail: any) => acc + detail.totalAmount, 0)}`,
// //         fullData: order // Include all customer data
// //       }));
// //       setCustomers(transformedCustomers);
// //     }
// //   }, [data]);

// //   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.checked) {
// //       setSelectedCustomers(Customers.map(customer => customer.id));
// //     } else {
// //       setSelectedCustomers([]);
// //     }
// //   };

// //   const handleCheckboxChange = (id: string) => {
// //     if (selectedCustomers.includes(id)) {
// //       setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
// //     } else {
// //       setSelectedCustomers([...selectedCustomers, id]);
// //     }
// //   };

// //   const handleDeleteSelected = async () => {
// //     try {
// //       await remove('/cart/deleteOrder', { _id: selectedCustomers });
// //       message.success("Selected customers deleted successfully");
// //       fetch({ url: '/cart/getOrder' });
// //     } catch (error) {
// //       console.error("Error deleting customers:", error);
// //       message.error("Error deleting customers");
// //     }
// //     setSelectedCustomers([]);
// //   };

// //   const handleViewAllPage = (customer: Customers) => {
// //     navigate("/customer-details", { state: { customer } });
// //   };

// //   return (
// //     <div className='d-flex flex-column'>
// //       <Breadcrumbs pageName="Customers" />
// //       <div className="container mt-4">
// //         {selectedCustomers.length > 0 && (
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <button
// //               className="btn btn-danger"
// //               onClick={handleDeleteSelected}
// //               disabled={selectedCustomers.length === 0}
// //             >
// //               Delete Selected
// //             </button>
// //           </div>
// //         )}
// //         <div className="table-responsive">
// //           <table className="table table-striped table-bordered table-hover">
// //             <thead className="thead-dark">
// //               <tr>
// //                 <th>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedCustomers.length === Customers.length}
// //                     onChange={handleSelectAll}
// //                   />
// //                 </th>
// //                 <th>Customer</th>
// //                 <th>Email</th>
// //                 <th>Location</th>
// //                 <th>Order</th>
// //                 <th>Amount Spend</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {Customers.map(customer => (
// //                 <tr key={customer.id}>
// //                   <td>
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedCustomers.includes(customer.id)}
// //                       onChange={() => handleCheckboxChange(customer.id)}
// //                     />
// //                   </td>
// //                   <td className="text-nowrap" onClick={//@ts-ignore
// //                     () => handleViewAllPage(customer.fullData)} style={{ cursor: "pointer" }}>
// //                     {customer.customer}
// //                   </td>
// //                   <td className="text-nowrap">{customer.email}</td>
// //                   <td className="text-nowrap">{customer.location}</td>
// //                   <td className="text-nowrap">{customer.order}</td>
// //                   <td className="text-nowrap">{customer.amount}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
// //           <ul className="pagination">
// //             <li className="page-item">
// //               <a className="page-link" href="#" aria-label="Previous">
// //                 <span aria-hidden="true">&laquo;</span>
// //               </a>
// //             </li>
// //             <li className="page-item">
// //               <a className="page-link" href="#">
// //                 1
// //               </a>
// //             </li>
// //             <li className="page-item">
// //               <a className="page-link" href="#" aria-label="Next">
// //                 <span aria-hidden="true">&raquo;</span>
// //               </a>
// //             </li>
// //           </ul>
// //           <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
// //         </nav>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CustomerPage;














// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from '../../components/Breadcrumbs';
// import { useFetchByLoad, useDelete } from '../../contexts';
// import { message } from 'antd';

// interface Customers {
//   id: string;
//   customer: string;
//   email: string;
//   location: string;
//   order: string;
//   amount: string;
//   fullData: string;
// }

// export interface CustomerDetails {
//   name: string;
//   location: string;
//   Customers: string;
//   email: string;
//   phone: string;
//   fullData: string;
// }

// const CustomerPage: React.FC = () => {
//   const [Customers, setCustomers] = useState<Customers[]>([]);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const { fetch, data } = useFetchByLoad();
//   const { remove } = useDelete();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch({ url: '/cart/getOrder' });
//   }, []);
//   useEffect(() => {
//     if (data) {
//       const transformedCustomers = data.orders.map((order: any) => {
//         const { addressLine1, addressLine2, city, state, country } = order.shippingAddress || {};
  
//         // Construct location string, handling missing parts safely
//         const location = [
//           addressLine1 ? addressLine1 : '', // If addressLine1 exists, use it, otherwise empty string
//           addressLine2 ? addressLine2 : '', // Same for addressLine2
//           city ? city : 'N/A',              // Default to 'N/A' if city is missing
//           state ? state : 'N/A',            // Default to 'N/A' if state is missing
//           country ? country : 'N/A'         // Default to 'N/A' if country is missing
//         ].filter(Boolean).join(', ');       // Remove any empty values and join with commas
  
//         // Check if orderDetails is an array before applying reduce
//         const totalAmount = Array.isArray(order.orderDetails)
//           ? order.orderDetails.reduce((acc: number, detail: any) => acc + detail.totalAmount, 0)
//           : 0;
  
//         return {
//           id: order._id,
//           customer: `${order.userId.firstName} ${order.userId.lastName}`,
//           email: order.userId.email,
//           location: location,  // Updated location string
//           order: 'Paid',
//           amount: totalAmount.toString(),
//           fullData: order, // Include all customer data
//         };
//       });
  
//       setCustomers(transformedCustomers);
//     }
//   }, [data]);
  

//   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       setSelectedCustomers(Customers.map(customer => customer.id));
//     } else {
//       setSelectedCustomers([]);
//     }
//   };

//   const handleCheckboxChange = (id: string) => {
//     if (selectedCustomers.includes(id)) {
//       setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
//     } else {
//       setSelectedCustomers([...selectedCustomers, id]);
//     }
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       await remove('/cart/deleteOrder', { _id: selectedCustomers });
//       message.success("Selected customers deleted successfully");
//       fetch({ url: '/cart/getOrder' });
//     } catch (error) {
//       console.error("Error deleting customers:", error);
//       message.error("Error deleting customers");
//     }
//     setSelectedCustomers([]);
//   };

//   const handleViewAllPage = (customer: Customers) => {
//     navigate("/customer-details", { state: { customer } });
//   };

//   return (
//     <div className='d-flex flex-column'>
//       <Breadcrumbs pageName="Customers" />
//       <div className="container mt-4">
//         {selectedCustomers.length > 0 && (
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <button
//               className="btn btn-danger"
//               onClick={handleDeleteSelected}
//               disabled={selectedCustomers.length === 0}
//             >
//               Delete Selected
//             </button>
//           </div>
//         )}
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered table-hover">
//             <thead className="thead-dark">
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectedCustomers.length === Customers.length}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>Customer Id</th>
//                 <th>Customer</th>
//                 <th>Email</th>
//                 <th>Location</th>
//                 <th>Order</th>
//                 <th>Amount Spend</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Customers.map(customer => (
//                 <tr key={customer.id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedCustomers.includes(customer.id)}
//                       onChange={() => handleCheckboxChange(customer.id)}
//                     />
//                   </td>
//                   <td className="text-nowrap">{customer.id}</td>
//                   <td className="text-nowrap" onClick={//@ts-ignore
//                     () => handleViewAllPage(customer.fullData)} style={{ cursor: "pointer" }}>
//                     {customer.customer}
//                   </td>
//                   <td className="text-nowrap">{customer.email}</td>
//                   <td className="text-nowrap">{customer.location}</td>
//                   <td className="text-nowrap">{customer.order}</td>
//                   <td className="text-nowrap">{customer.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
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
//           <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useFetchByLoad, useDelete } from '../../contexts';
import { message } from 'antd';

interface Customers {
  id: string;
  customer: string;
  email: string;
  dob: string;
  order: string;
  amount: string;
  fullData: any;
}

export interface CustomerDetails {
  name: string;
  dob: string;
  email: string;
  phone: string;
  fullData: any;
}

const CustomerPage: React.FC = () => {
  const [Customers, setCustomers] = useState<Customers[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();
  const navigate = useNavigate();

  // Fetch data from the /getAllWebShopUsers route
  useEffect(() => {
    fetch({ url: '/getAllWebShopUsers' });
  }, []);

  // Transform data once fetched
  useEffect(() => {
    if (data) {
      console.log(data,"data")
      const transformedCustomers = data.map((user: any) => {
        const totalOrders = user.totalOrders || 0;
        const totalAmountSpent = user.totalAmountSpent || 0;

        return {
          id: user._id,
          customer: `${user.firstName} ${user.lastName}`,
          email: user.email,
          dob: user.birthDate || 'N/A',
          order: totalOrders.toString(),
          amount: totalAmountSpent.toFixed(2), // Format amount to two decimal places
          fullData: user, // Include all user data
        };
      });

      setCustomers(transformedCustomers);
    }
  }, [data]);

  // Handle select all checkbox
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCustomers(Customers.map(customer => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  // Handle delete selected customers
  const handleDeleteSelected = async () => {
    try {
      await remove('/deleteWebShopUsers', { _id: selectedCustomers });
      message.success("Selected customers deleted successfully");
      fetch({ url: '/getAllWebShopUsers' });
    } catch (error) {
      console.error("Error deleting customers:", error);
      message.error("Error deleting customers");
    }
    setSelectedCustomers([]);
  };

  // Navigate to customer details page with userId
  const handleViewAllPage = (userId: string) => {
    // navigate("/customer-details", { state: { userId } });
    navigate(`/customerDetails/${userId}`)
  };

  return (
    <div className='d-flex flex-column'>
      <Breadcrumbs pageName="Customers" />
      <div className="container mt-4">
        {selectedCustomers.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-danger"
              onClick={handleDeleteSelected}
              disabled={selectedCustomers.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === Customers.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Customer Id</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Total Orders</th>
                <th>Amount Spent</th>
              </tr>
            </thead>
            <tbody>
              {Customers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleCheckboxChange(customer.id)}
                    />
                  </td>
                  <td className="text-nowrap">{customer.id}</td>
                  <td
                    className="text-nowrap"
                    onClick={() => handleViewAllPage(customer.id)}
                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  >
                    {customer.customer}
                  </td>
                  <td className="text-nowrap">{customer.email}</td>
                  <td className="text-nowrap">{customer.dob}</td>
                  <td className="text-nowrap">{customer.order}</td>
                  <td className="text-nowrap">€{customer.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
          <ul className="pagination">
            {/* Pagination controls can be implemented here */}
          </ul>
          <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
        </nav>
      </div>
    </div>
  );
};

export default CustomerPage;

