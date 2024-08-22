import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import './category.css';

interface AddCategoryProps {
  onClose: () => void;
  item: string;
}

const AddCategoryPopup: React.FC<AddCategoryProps> = ({ onClose, item }) => {

  const [image, setImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Add {item}</h3>

        <div className="col-12 mb-3">
          <h4 className="font-weight-bold m-0">Logo</h4>
        </div>
        <div className="col-12 mb-3">
          <label 
            className="d-block border p-2" 
            style={{ cursor: 'pointer' }}
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            {image ? (
              <img 
                src={image}
                alt="upload" 
                className="img-fluid" 
                style={{height:"7rem", objectFit:"cover"}}
              />
            ) : (
              <div className="text-center">
                <MdCloudUpload size="3em" />
                <div>Click to upload an image</div>
              </div>
            )}
            <input 
              type="file" 
              id="imageUpload" 
              className="d-none" 
              onChange={handleImageChange} 
              style={{height:"7rem"}}
            />
          </label>
        </div>

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

export default AddCategoryPopup;
