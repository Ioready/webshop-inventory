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
  location: string;
  order: string;
  amount: string;
  fullData: string;
}

export interface CustomerDetails {
  name: string;
  location: string;
  Customers: string;
  email: string;
  phone: string;
  fullData: string;
}

const CustomerPage: React.FC = () => {
  const [Customers, setCustomers] = useState<Customers[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    fetch({ url: '/cart/getOrder' });
  }, []);

  useEffect(() => {
    if (data) {
      const transformedCustomers = data.orders.map((order: any) => ({
        id: order._id,
        customer: `${order.userId.firstName} ${order.userId.lastName}`,
        email: order.userId.email,
        location: `${order.address.city}, ${order.address.state}, ${order.address.country}`,
        order: 'Paid',
        amount: `${order.orderDetails.reduce((acc: number, detail: any) => acc + detail.totalAmount, 0)}`,
        fullData: order // Include all customer data
      }));
      setCustomers(transformedCustomers);
    }
  }, [data]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCustomers(Customers.map(customer => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await remove('/cart/deleteOrder', { _id: selectedCustomers });
      message.success("Selected customers deleted successfully");
      fetch({ url: '/cart/getOrder' });
    } catch (error) {
      console.error("Error deleting customers:", error);
      message.error("Error deleting customers");
    }
    setSelectedCustomers([]);
  };

  const handleViewAllPage = (customer: Customers) => {
    navigate("/customer-details", { state: { customer } });
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
                <th>Customer</th>
                <th>Email</th>
                <th>Location</th>
                <th>Order</th>
                <th>Amount Spend</th>
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
                  <td className="text-nowrap" onClick={//@ts-ignore
                    () => handleViewAllPage(customer.fullData)} style={{ cursor: "pointer" }}>
                    {customer.customer}
                  </td>
                  <td className="text-nowrap">{customer.email}</td>
                  <td className="text-nowrap">{customer.location}</td>
                  <td className="text-nowrap">{customer.order}</td>
                  <td className="text-nowrap">{customer.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
        </nav>
      </div>
    </div>
  );
};

export default CustomerPage;
