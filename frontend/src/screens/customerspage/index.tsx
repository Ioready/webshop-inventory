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
//   dob: string;
//   order: string;
//   amount: string;
//   fullData: any;
// }

// export interface CustomerDetails {
//   name: string;
//   dob: string;
//   email: string;
//   phone: string;
//   fullData: any;
// }

// const CustomerPage: React.FC = () => {
//   const [Customers, setCustomers] = useState<Customers[]>([]);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const { fetch, data } = useFetchByLoad();
//   const { remove } = useDelete();
//   const navigate = useNavigate();

//   // Fetch data from the /getAllWebShopUsers route
//   useEffect(() => {
//     fetch({ url: '/getAllWebShopUsers' });
//   }, []);

//   // Transform data once fetched
//   useEffect(() => {
//     if (data) {
//       console.log(data,"data")
//       const transformedCustomers = data.map((user: any) => {
//         const totalOrders = user.totalOrders || 0;
//         const totalAmountSpent = user.totalAmountSpent || 0;

//         return {
//           id: user._id,
//           customer: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//           dob: user.birthDate || 'N/A',
//           order: totalOrders.toString(),
//           amount: totalAmountSpent.toFixed(2), // Format amount to two decimal places
//           fullData: user, // Include all user data
//         };
//       });

//       setCustomers(transformedCustomers);
//     }
//   }, [data]);

//   // Handle select all checkbox
//   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       setSelectedCustomers(Customers.map(customer => customer.id));
//     } else {
//       setSelectedCustomers([]);
//     }
//   };

//   // Handle individual checkbox change
//   const handleCheckboxChange = (id: string) => {
//     if (selectedCustomers.includes(id)) {
//       setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
//     } else {
//       setSelectedCustomers([...selectedCustomers, id]);
//     }
//   };

//   // Handle delete selected customers
//   const handleDeleteSelected = async () => {
//     try {
//       await remove('/deleteWebShopUsers', { _id: selectedCustomers });
//       message.success("Selected customers deleted successfully");
//       fetch({ url: '/getAllWebShopUsers' });
//     } catch (error) {
//       console.error("Error deleting customers:", error);
//       message.error("Error deleting customers");
//     }
//     setSelectedCustomers([]);
//   };

//   // Navigate to customer details page with userId
//   const handleViewAllPage = (userId: string) => {
//     // navigate("/customer-details", { state: { userId } });
//     navigate(`/customerDetails/${userId}`)
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
//                 <th>Date of Birth</th>
//                 <th>Total Orders</th>
//                 <th>Amount Spent</th>
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
//                   <td
//                     className="text-nowrap"
//                     onClick={() => handleViewAllPage(customer.id)}
//                     style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
//                   >
//                     {customer.customer}
//                   </td>
//                   <td className="text-nowrap">{customer.email}</td>
//                   <td className="text-nowrap">{customer.dob}</td>
//                   <td className="text-nowrap">{customer.order}</td>
//                   <td className="text-nowrap">€{customer.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
//           <ul className="pagination">
//             {/* Pagination controls can be implemented here */}
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
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useFetchByLoad, useDelete } from '../../contexts';

interface Customers {
  id: string;
  customer: string;
  email: string;
  dob: string;
  order: string;
  amount: string;
  fullData: any;
}

const CustomerPage: React.FC = () => {
  const [Customers, setCustomers] = useState<Customers[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();
  const navigate = useNavigate();

  // Fetch data from the /getAllWebShopUsers route
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Transform and set fetched data
  useEffect(() => {
    if (data) {
      const transformedCustomers = data.map((user: any) => ({
        id: user._id,
        customer: `${user.firstName} ${user.lastName}`,
        email: user.email,
        dob: user.birthDate || 'N/A',
        order: user.totalOrders?.toString() || '0',
        amount: user.totalAmountSpent?.toFixed(2) || '0.00',
        fullData: user,
      }));
      setCustomers(transformedCustomers);
      setPagination((prev) => ({ ...prev, total: data.totalCount }));
    }
  }, [data]);

  const fetchData = (page: number, pageSize: number) => {
    fetch({
      url: '/getAllWebShopUsers',
      query: JSON.stringify({ skip: (page - 1) * pageSize, take: pageSize }),
    });
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleDeleteSelected = async () => {
    try {
      await remove('/deleteWebShopUsers', { _id: selectedCustomers });
      message.success("Selected customers deleted successfully");
      fetchData(pagination.current, pagination.pageSize);
      setSelectedCustomers([]);
    } catch (error) {
      message.error("Error deleting customers");
    }
  };

  const columns = [
    {
      title: <input type="checkbox" onChange={(e) => setSelectedCustomers(e.target.checked ? Customers.map(c => c.id) : [])} />,
      dataIndex: 'select',
      key: 'select',
      render: (_: any, record: Customers) => (
        <input
          type="checkbox"
          checked={selectedCustomers.includes(record.id)}
          onChange={() => setSelectedCustomers((prev) =>
            prev.includes(record.id)
              ? prev.filter((id) => id !== record.id)
              : [...prev, record.id]
          )}
        />
      ),
    },
    { title: 'Customer Id', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    { title: 'Total Orders', dataIndex: 'order', key: 'order' },
    { title: 'Amount Spent', dataIndex: 'amount', key: 'amount', render: (amount: string) => `€${amount}` },
  ];

  return (
    <div className='d-flex flex-column'>
      <Breadcrumbs pageName="Customers" />
      <div className="container mt-4">
        {selectedCustomers.length > 0 && (
          <button className="btn btn-danger mb-3" onClick={handleDeleteSelected}>
            Delete Selected
          </button>
        )}
        <Table
          columns={columns}
          dataSource={Customers}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default CustomerPage;

