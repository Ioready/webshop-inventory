import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './popup';  // Import the Popup component
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Order {
  id: string;
  date: string;
  customer: string;
  channel: string;
  total: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  items: string;
  deliveryStatus: string;
  deliveryMethod: string;
  tags: string;
}

const initialOrders: Order[] = [
  {
    id: '#1008',
    date: 'Apr 8 at 11:43 am',
    customer: 'Jennifer Miyakubo',
    channel: 'Online Store',
    total: '$1.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Unfulfilled',
    items: '1 item',
    deliveryStatus: '',
    deliveryMethod: 'Free Shipping',
    tags: ''
  },
  {
    id: '#1006',
    date: 'Mar 27 at 4:44 am',
    customer: 'Jennifer Miyakubo',
    channel: 'Online Store',
    total: '$0.00',
    paymentStatus: 'Voided',
    fulfillmentStatus: 'Unfulfilled',
    items: '0 items',
    deliveryStatus: '',
    deliveryMethod: 'Free Shipping',
    tags: ''
  },
  {
    id: '#1004',
    date: 'Mar 13 at 8:09 am',
    customer: 'Tai Nguyen',
    channel: 'Online Store',
    total: '$2,598.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    items: '2 items',
    deliveryStatus: '',
    deliveryMethod: 'Free Shipping',
    tags: ''
  },
  {
    id: '#1003',
    date: 'Nov 28 at 8:24 pm',
    customer: 'Robi Lahdo',
    channel: 'Online Store',
    total: '$6,613.93',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Chargeback lost',
    items: '3 items',
    deliveryStatus: '',
    deliveryMethod: 'Custom Shipping',
    tags: ''
  },
  {
    id: '#1001',
    date: 'Jun 12, 2023',
    customer: 'marina Mizruh',
    channel: 'Online Store',
    total: '$2,594.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    items: '2 items',
    deliveryStatus: 'Tracking added',
    deliveryMethod: 'Free Shipping',
    tags: ''
  }
];

export interface CustomerDetails {
  name: string;
  location: string;
  orders: string;
  email: string;
  phone: string;
}

const customerDetailsMap: { [key: string]: CustomerDetails } = {
  'Jennifer Miyakubo': {
    name: 'Jennifer Miyakubo',
    location: 'New York, NY, United States',
    orders: '2 orders',
    email: 'jennifer@example.com',
    phone: '+1234567890',
  },
  'Tai Nguyen': {
    name: 'Tai Nguyen',
    location: 'San Francisco, CA, United States',
    orders: '1 order',
    email: 'tai@example.com',
    phone: '+1987654321',
  },
  'Robi Lahdo': {
    name: 'Robi Lahdo',
    location: 'Chicago, IL, United States',
    orders: '1 order',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  'marina Mizruh': {
    name: 'marina Mizruh',
    location: 'Los Angeles, CA, United States',
    orders: '1 order',
    email: 'marina@example.com',
    phone: '+1098765432',
  }
};

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [popupCustomer, setPopupCustomer] = useState<CustomerDetails | null>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOrders(orders.map(order => order.id));
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

  const handleDeleteSelected = () => {
    const newOrders = orders.filter(order => !selectedOrders.includes(order.id));
    setOrders(newOrders);
    setSelectedOrders([]);
  };

  const handleCustomerClick = (customer: string) => {
    setPopupCustomer(customerDetailsMap[customer] || null);
  };

  const closePopup = () => {
    setPopupCustomer(null);
  };

  const Navigate = useNavigate();

  const handleviewallpage = () => {
    Navigate("/all-orders");
  }

  return (
    <div className=' d-flex flex-column'>
    <Breadcrumbs pageName="Orders" />
    <div className="container mt-4">
      {selectedOrders.length >0 && (<div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedOrders.length === 0}
        >
          Delete Selected
        </button>
        
      </div>
      )
}

      <div className=' d-flex p-2 bg-white mb-4' style={{ gap:"0.5rem", border:"1px solid gray", borderRadius:"1rem"}}>
        <p className=' text-black m-0 order_page_text' style={{cursor:"pointer"}}>All</p>
        <p className=' text-black m-0 order_page_text' style={{cursor:"pointer"}}>Unpaid</p>
        <p className=' text-black m-0 order_page_text' style={{cursor:"pointer"}}>Open</p>
        <p className=' text-black m-0 order_page_text' style={{cursor:"pointer"}}>Newest</p>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length}
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
              <th>Delivery Status</th>
              <th>Delivery Method</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleCheckboxChange(order.id)}
                  />
                </td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.id}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.date}</td>
                <td className="text-nowrap">
                  <span onClick={() => handleCustomerClick(order.customer)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {order.customer}
                  </span>
                </td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.channel}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.total}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.paymentStatus}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.fulfillmentStatus}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.items}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.deliveryStatus}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.deliveryMethod}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupCustomer && (
        <Popup customer={popupCustomer} onClose={closePopup} />
      )}
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
        <p>Showing 1 to {orders.length} of {orders.length} entries</p>
      </nav>
    </div>
    </div>
  );
};

export default OrderTable;
