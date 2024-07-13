import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerDetails } from './index'; // Adjust the path as necessary
import '../../styles/css/style.css'

interface PopupProps {
  customer: CustomerDetails;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ customer, onClose }) => {
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
    Navigate('/customer-details');
  };

  return (
    <div className="popup_order">
      <div className="popup-content" ref={popupRef}>
        <div className=' d-flex justify-content-between align-items-center' style={{ gap:"1rem"}}>
          <h3>{customer.name}</h3>
        </div>
        <p>{customer.location}</p>
        <p>{customer.orders}</p>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
        <button className="btn btn-primary" onClick={handleViewCustomer}>
          View customer
        </button>
      </div>
    </div>
  );
};

export default Popup;
