import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const AddSubCategory: React.FC = () => {

  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="container mt-4">
      <h3 className="my-2">Add Category</h3>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 mb-3">
          <h4 className="font-weight-bold m-0">Logo</h4>
        </div>
        

        <div className="col-12 mb-3">
          <label className="form-label">Add Sub Category:</label>
          <input
            type="text"
            className="form-control"
          />
        </div>

        <div className="col-12 my-2">
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
