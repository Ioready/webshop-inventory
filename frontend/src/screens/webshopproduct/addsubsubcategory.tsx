import React from 'react';
import './category.css';

interface AddSubSubCategoryProps {
  onClose: () => void;
  item: string;
}

const AddSubSubCategoryPopup: React.FC<AddSubSubCategoryProps> = ({ onClose, item }) => {
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

export default AddSubSubCategoryPopup;
