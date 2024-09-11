import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './popup';  // Import the Popup component
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { CiSearch } from "react-icons/ci";
import { useDelete, useFetchByLoad } from '../../contexts';
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

  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();

  useEffect(() => {
    fetch({ url: '/cart/getOrder' });
  }, []);

  useEffect(() => {
    if (data?.orders) {
      const apiOrders = data.orders.map((order: any) => ({
        id: order._id,
        date: new Date(order.date).toLocaleString(),
        customer: `${order.userId.firstName} ${order.userId.lastName}`,
        customerDetail: order,
        channel: 'Online Store',  // Static since API doesn't provide it
        total: `$${order.orderDetails.reduce((sum: number, detail: any) => sum + detail.totalAmount, 0).toFixed(2)}`,
        paymentStatus: 'Paid', // Static, assuming paid; adjust based on actual logic
        fulfillmentStatus: 'Unfulfilled', // Static, adjust as needed
        items: `${order.orderDetails.length} item${order.orderDetails.length > 1 ? 's' : ''}`,
        deliveryStatus: '',  // Static or derived
        deliveryMethod: 'Free Shipping', // Static, adjust as needed
        tags: '',  // Static or derived
      }));

      setOrders(apiOrders);
    }
  }, [data]);

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

  const handleDeleteSelected = async () => {
    console.log('selectedOrders',selectedOrders)
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
          <div className='d-flex p-2 bg-white' style={{ gap: "0.5rem", border: "1px solid gray", borderRadius: "1rem" }}>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>All</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Unpaid</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Open</p>
            <p className='text-black m-0 order_page_text' style={{ cursor: "pointer" }}>Newest</p>
          </div>

          <div className="input-group p-1 rounded w-50" style={{ position: "relative" }}>
            <input type="search" className="form-control rounded-5" placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ border: "1px solid gray" }} />
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
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.id.slice(0, 4)}</td>
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
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.deliveryStatus}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.deliveryMethod}</td>
                  <td className="text-nowrap" onClick={handleViewAllPage} style={{ cursor: "pointer" }}>{order.tags}</td>
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
