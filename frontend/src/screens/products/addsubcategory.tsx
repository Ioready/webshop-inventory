import React from 'react';
import './category.css';

interface AddSubCategoryProps {
  onClose: () => void;
  item: string;
}

const AddSubCategoryPopup: React.FC<AddSubCategoryProps> = ({ onClose, item }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Add {item}</h3>

        <input
          type="text"
          className="form-control h-25"
          placeholder={`${item}`}
        />
        <div className=' d-flex align-items-center mt-2'>
          <button onClick={onClose} className="btn btn-info">Save</button>
          <button onClick={onClose} className="btn btn-danger ms-1">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryPopup;
