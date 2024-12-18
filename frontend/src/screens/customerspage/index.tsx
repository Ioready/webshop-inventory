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
  const { fetch, data, loading } = useFetchByLoad();
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

  const handleCustomerClick = (customer: Customers) => {
    navigate(`/customer-view/${customer.id}`, { state: { customerData: customer.fullData } });
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
          onChange={() =>
            setSelectedCustomers((prev) =>
              prev.includes(record.id)
                ? prev.filter((id) => id !== record.id)
                : [...prev, record.id]
            )
          }
        />
      ),
    },
    {
      title: 'Customer Id',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: Customers) => (
        <span
          style={{ color: 'blue', cursor: 'pointer',  fontWeight: '600'}}
          onClick={() => handleCustomerClick(record)}
        >
          {id}
        </span>
      ),
    },
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
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <Table
           className='table-responsive'
            columns={columns}
            dataSource={Customers}
            loading={loading}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
            }}
            onChange={handleTableChange}
            scroll={{ x: 800 }} // Minimum width for horizontal scrolling
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;


// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from '../../components/Breadcrumbs';
// import { useFetchByLoad, useDelete } from '../../contexts';

// interface Customers {
//   id: string;
//   customer: string;
//   email: string;
//   dob: string;
//   order: string;
//   amount: string;
//   fullData: any;
// }

// const CustomerPage: React.FC = () => {
//   const [Customers, setCustomers] = useState<Customers[]>([]);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
//   const { fetch, data ,loading} = useFetchByLoad();
//   const { remove } = useDelete();
//   const navigate = useNavigate();

//   // Fetch data from the /getAllWebShopUsers route
//   useEffect(() => {
//     fetchData(pagination.current, pagination.pageSize);
//   }, [pagination.current, pagination.pageSize]);

//   // Transform and set fetched data
//   useEffect(() => {
//     if (data) {
//       const transformedCustomers = data.map((user: any) => ({
//         id: user._id,
//         customer: `${user.firstName} ${user.lastName}`,
//         email: user.email,
//         dob: user.birthDate || 'N/A',
//         order: user.totalOrders?.toString() || '0',
//         amount: user.totalAmountSpent?.toFixed(2) || '0.00',
//         fullData: user,
//       }));
//       setCustomers(transformedCustomers);
//       setPagination((prev) => ({ ...prev, total: data.totalCount }));
//     }
//   }, [data]);

//   const fetchData = (page: number, pageSize: number) => {
//     fetch({
//       url: '/getAllWebShopUsers',
//       query: JSON.stringify({ skip: (page - 1) * pageSize, take: pageSize }),
//     });
//   };

//   const handleTableChange = (pagination: any) => {
//     setPagination(pagination);
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       await remove('/deleteWebShopUsers', { _id: selectedCustomers });
//       message.success("Selected customers deleted successfully");
//       fetchData(pagination.current, pagination.pageSize);
//       setSelectedCustomers([]);
//     } catch (error) {
//       message.error("Error deleting customers");
//     }
//   };

//   const columns = [
//     {
//       title: <input type="checkbox" onChange={(e) => setSelectedCustomers(e.target.checked ? Customers.map(c => c.id) : [])} />,
//       dataIndex: 'select',
//       key: 'select',
//       render: (_: any, record: Customers) => (
//         <input
//           type="checkbox"
//           checked={selectedCustomers.includes(record.id)}
//           onChange={() => setSelectedCustomers((prev) =>
//             prev.includes(record.id)
//               ? prev.filter((id) => id !== record.id)
//               : [...prev, record.id]
//           )}
//         />
//       ),
//     },
//     { title: 'Customer Id', dataIndex: 'id', key: 'id' },
//     { title: 'Customer', dataIndex: 'customer', key: 'customer' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
//     { title: 'Total Orders', dataIndex: 'order', key: 'order' },
//     { title: 'Amount Spent', dataIndex: 'amount', key: 'amount', render: (amount: string) => `€${amount}` },
//   ];

//   return (
//     <div className='d-flex flex-column'>
//       <Breadcrumbs pageName="Customers" />
//       <div className="container mt-4">
//         {selectedCustomers.length > 0 && (
//           <button className="btn btn-danger mb-3" onClick={handleDeleteSelected}>
//             Delete Selected
//           </button>
//         )}
//         <Table
//           columns={columns}
//           dataSource={Customers}
//           loading={loading}
//           rowKey="id"
//           pagination={{
//             current: pagination.current,
//             pageSize: pagination.pageSize,
//             total: pagination.total,
//           }}
//           onChange={handleTableChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;




