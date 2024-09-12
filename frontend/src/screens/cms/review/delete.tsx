import React, { useEffect, useRef } from 'react';

interface PopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Delete: React.FC<PopupProps> = ({ onClose, onConfirm }) => {
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
        <h4 className='text-center'>Are you sure you want to delete this review?</h4>
        <div className='my-2 d-flex justify-content-center' style={{ gap: "1rem" }}>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-info" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
