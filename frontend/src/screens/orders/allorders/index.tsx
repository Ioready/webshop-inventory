import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllOrdersPage: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Order #1014</h2>
        
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Unfulfilled</h5>
                
              </div>
              <p className="card-text">Location: Alibaba</p>
              <p className="card-text">Delivery method: Shipping</p>
              <div className="d-flex align-items-center">
                <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg" alt="Product" className="img-thumbnail me-3" style={{ width: '100px' }} />
                <div>
                  <p>Round Dream Lounger Upholstered Movie Bed</p>
                  <p>$6,420.00 x 1</p>
                  <p>Total: $6,420.00</p>
                </div>
              </div>
              <div className=' d-flex justify-content-end'>
          <button className="btn btn-primary">Fulfill item</button>
          </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Paid</h5>
              <p className="card-text">Subtotal: $6,420.00</p>
              <p className="card-text">Total: $6,420.00</p>
              <p className="card-text">Paid: $6,420.00</p>
            </div>
          </div>

        </div>
        <div className="col-md-4">
          {/* <div className="card mb-4">
            <div className="card-body">
              <h5>Notes</h5>
              <p>No notes from customer</p>
            </div>
          </div> */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Customer</h5>
              <p>Mark Hyman</p>
              <p>1 order</p>
              <p><a href="mailto:alli@candidwalls.com">alli@candidwalls.com</a></p>
              <p>+1 413-637-9991</p>
              <p>4321 Far West Blvd, Austin Texas 78731, United States</p>
              <p>Same as shipping address</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;
