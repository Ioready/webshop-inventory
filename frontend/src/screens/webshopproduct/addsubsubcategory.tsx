import React, { useState } from 'react';
import './category.css';
import { usePost } from '../../contexts';
import { toast } from 'react-toastify';

interface AddSubSubCategoryProps {
  onClose: () => void;
  item: string;
  selectedCategory:number;
  selectedSubCategory:number
}
const resource = 'addCategory';
const AddSubSubCategoryPopup: React.FC<AddSubSubCategoryProps> = ({ onClose, item,selectedCategory,selectedSubCategory }) => {
  const [name, setName] = useState('');
  const { create } = usePost();

  const handleSubmit = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category first.');
      return;
    }

    const body = {
      // categories: [{name:selectedCategory}],
      selectedCategory:selectedCategory,
      selectedSubCategory:selectedSubCategory,
      subSubCategories: [
        {
          name,
        }
      ]
    };

    try {
      await create(resource, body);
      toast.success('Subcategory added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add subcategory. Please try again.');
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Add {item}</h3>

        <input
            type="text"
            className="form-control h-25"
            placeholder={`${item}`}
            onChange={(e) => setName(e.target.value)}
          />
          <div className=' d-flex align-items-center mt-2'>
          <button onClick={handleSubmit} className="btn btn-info">Save</button>
          <button onClick={onClose} className="btn btn-danger ms-1">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubSubCategoryPopup;
