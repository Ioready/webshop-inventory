import React from 'react';
import './category.css';

interface EditPopupProps {
  onClose: () => void;
  onSave: () => void;
  item: string;
  editedName: string;
  setEditedName: (name: string) => void;
  children?: React.ReactNode; // Add children prop
}

const EditPopup: React.FC<EditPopupProps> = ({ onClose, onSave, item, editedName, setEditedName, children }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Edit {item}</h3>

        <input
          type="text"
          className="form-control h-25 mb-1"
          value={editedName} // controlled input
          onChange={handleInputChange} // update the state when input changes
          placeholder={`Enter new name for ${item}`}
        />

        {/* Display the children, if provided */}
        {children}

        <div className="d-flex align-items-center">
          <button onClick={onSave} className="btn btn-info mt-2">Save</button>
          <button onClick={onClose} className="btn btn-danger mt-2 ms-1">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
