import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import './category.css';
import { usePost } from '../../contexts';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebase';
import { toast } from 'react-toastify';

interface AddCategoryProps {
  onClose: () => void;
  item: string;
}
const resource = 'addCategory';
const AddCategoryPopup: React.FC<AddCategoryProps> = ({ onClose, item }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string>('');
  const { create } = usePost();

  const handleSubmit = async () => {
    const body = {
      categories: [
        {
          name,
          image,
        }
      ]
    };

    try {
      await create(resource, body);
      toast.success('Category added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add category. Please try again.');
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${file?.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImage(url);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Add {item}</h3>

        <div className="col-12 mb-3">
          <h4 className="font-weight-bold m-0">Image</h4>
        </div>
        <div className="col-12 mb-3">
          <label 
            className="d-block border p-2" 
            style={{ cursor: 'pointer' }}
          >
            {image ? (
              <img 
                src={image}
                alt="upload" 
                className="img-fluid" 
                style={{ height: "7rem", objectFit: "cover" }}
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
            />
          </label>
        </div>

        <input
          type="text"
          className="form-control h-25"
          placeholder={`${item}`}
          onChange={(e) => setName(e.target.value)} 
        />
        <div className='d-flex align-items-center mt-2'>
          <button onClick={handleSubmit} className="btn btn-info">Save</button>
          <button onClick={onClose} className="btn btn-danger ms-1">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPopup;
