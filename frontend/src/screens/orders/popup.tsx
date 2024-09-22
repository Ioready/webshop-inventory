import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { CustomerDetails } from './index'; // Adjust the path as necessary
import '../../styles/css/style.css'

// interface CustomerDetails {
//   name: string;
//   location: string;
//   orders: string;
//   email: string;
//   phone: string;
// }

interface PopupProps {
  customer:string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ customer, onClose }) => {

  console.log(customer,"customerpopup")
  const popupRef = useRef<HTMLDivElement>(null);
  const Navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewCustomer = () => {
    Navigate('/customer-details', { state: { customer } });
  };

  return (
    <div className="popup_order">
      <div className="popup-content" ref={popupRef}>
        <div className=' d-flex justify-content-between align-items-center' style={{ gap:"1rem"}}>
          <h3>{//@ts-ignore 
          customer?.userId?.firstName} {customer?.userId?.lastName}</h3>
        </div>
        
        <p>{//@ts-ignore
        customer.shippingAddress.addressLine1},  {customer.shippingAddress.addressLine2}, {customer.shippingAddress.state}</p>
        <p>{//@ts-ignore
        `${ customer.orderItems.length} order${ customer.orderItems.length > 1 ? 's' : ''}`
        }</p>
        {/* <p>{customer.email}</p> */}
        <p>{//@ts-ignore
        customer.shippingAddress.phone}</p>
        <button className="btn btn-primary" onClick={handleViewCustomer}>
          View customer
        </button>
      </div>
    </div>
  );
};

export default Popup;
