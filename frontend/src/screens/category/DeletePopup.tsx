import React from 'react';
import './category.css';

interface DeletePopupProps {
  onClose: () => void;
  item: string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ onClose, item }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Delete {item}</h3>
        <p>Are you sure you want to delete {item}?</p>
        <button onClick={onClose} className="btn btn-danger">Delete</button>
        <button onClick={onClose} className="btn btn-secondary ms-2">Cancel</button>
      </div>
    </div>
  );
};

export default DeletePopup;
