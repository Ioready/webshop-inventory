import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  onClose: () => void;
}

const Delete: React.FC<PopupProps> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

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


  return (
    <div className="popup_order">
      <div className="popup-content" ref={popupRef}>
        <h4 className=' text-center'>Are You Sure You Want to Delete</h4>
        <h4 className=' text-center'>This Category</h4>
        <div className=' my-2 d-flex justify-content-center' style={{gap:"1rem"}}>
        <button className="btn btn-danger">
          Delete
        </button>
        <button className="btn btn-info">
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
