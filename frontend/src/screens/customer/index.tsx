import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Customers {
  id: string
  customer: string;
  subscription: string;
  location: string;
  order: string;
  amount: string;
}

const initialCustomers: Customers[] = [
  {
    id: '1',
    customer: 'Jennifer Miyakubo',
    subscription: 'Online Store',
    location: '$1.00',
    order: 'Paid',
    amount: 'Unfulfilled',
  },
  {
    id: '2',
    customer: 'Jennifer Miyakubo',
    subscription: 'Online Store',
    location: '$1.00',
    order: 'Paid',
    amount: 'Unfulfilled',
  },
  {
    id: '3',
    customer: 'Jennifer Miyakubo',
    subscription: 'Online Store',
    location: '$1.00',
    order: 'Paid',
    amount: 'Unfulfilled',
  },
  {
    id: '4',
    customer: 'Jennifer Miyakubo',
    subscription: 'Online Store',
    location: '$1.00',
    order: 'Paid',
    amount: 'Unfulfilled',
  },
  {
    id: '5',
    customer: 'Jennifer Miyakubo',
    subscription: 'Online Store',
    location: '$1.00',
    order: 'Paid',
    amount: 'Unfulfilled',
  }
];

export interface CustomerDetails {
  name: string;
  location: string;
  Customers: string;
  email: string;
  phone: string;
}

const customerDetailsMap: { [key: string]: CustomerDetails } = {
  'Jennifer Miyakubo': {
    name: 'Jennifer Miyakubo',
    location: 'New York, NY, United States',
    Customers: '2 Customers',
    email: 'jennifer@example.com',
    phone: '+1234567890',
  },
  'Tai Nguyen': {
    name: 'Tai Nguyen',
    location: 'San Francisco, CA, United States',
    Customers: '1 order',
    email: 'tai@example.com',
    phone: '+1987654321',
  },
  'Robi Lahdo': {
    name: 'Robi Lahdo',
    location: 'Chicago, IL, United States',
    Customers: '1 order',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  'marina Mizruh': {
    name: 'marina Mizruh',
    location: 'Los Angeles, CA, United States',
    Customers: '1 order',
    email: 'marina@example.com',
    phone: '+1098765432',
  }
};

const CustomerPage: React.FC = () => {
  const [Customers, setCustomers] = useState<Customers[]>(initialCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [popupCustomer, setPopupCustomer] = useState<CustomerDetails | null>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCustomers(Customers.map(order => order.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(orderId => orderId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleDeleteSelected = () => {
    const newCustomers = Customers.filter(order => !selectedCustomers.includes(order.id));
    setCustomers(newCustomers);
    setSelectedCustomers([]);
  };

  const handleCustomerClick = (customer: string) => {
    setPopupCustomer(customerDetailsMap[customer] || null);
  };

  const closePopup = () => {
    setPopupCustomer(null);
  };

  const Navigate = useNavigate();

  const handleviewallpage = () => {
    Navigate("/all-Customers");
  }

  return (
    <div className=' d-flex flex-column'>
    <Breadcrumbs pageName="Customers" />
    <div className="container mt-4">
      {selectedCustomers.length >0 && (<div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedCustomers.length === 0}
        >
          Delete Selected
        </button>
        
      </div>
      )
}
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
              <th>Email Subscription</th>
              <th>Location</th>
              <th>Order</th>
              <th>Amount Spend</th>
            </tr>
          </thead>
          <tbody>
            {Customers.map(order => (
              <tr key={order.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(order.id)}
                    onChange={() => handleCheckboxChange(order.id)}
                  />
                </td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.customer}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.subscription}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.location}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.order}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.amount}</td>
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
