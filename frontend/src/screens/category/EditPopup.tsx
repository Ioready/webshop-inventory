import React from 'react';
import './category.css';

interface EditPopupProps {
  onClose: () => void;
  item: string;
}

const EditPopup: React.FC<EditPopupProps> = ({ onClose, item }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Edit {item}</h3>

        <input
            type="text"
            className="form-control h-25"
            placeholder={`${item}`}
          />
        <button onClick={onClose} className="btn btn-danger mt-2">Close</button>
      </div>
    </div>
  );
};

export default EditPopup;
