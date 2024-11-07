import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const CustomerViewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = location.state?.customerData;
  const [customerDetails, setCustomerDetails] = useState<any>(null);

  useEffect(() => {
    if (customerData) {
      setCustomerDetails(customerData);
    }
  }, [customerData]);

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customer ID: {customerDetails._id}</h2>
      </div>

      <div className="row">
        {/* Customer Information */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer Information</h5>
              <p><strong>Name:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
              <p><strong>Email:</strong> {customerDetails.email}</p>
              <p><strong>Date of Birth:</strong> {customerDetails.birthDate || 'N/A'}</p>
              <p><strong>Total Orders:</strong> {customerDetails.totalOrders || 0}</p>
              <p><strong>Total Amount Spent:</strong> €{customerDetails.totalAmountSpent?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewPage;
