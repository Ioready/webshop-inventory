import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { MdCloudUpload } from 'react-icons/md';
import { usePost } from '../../../contexts';


const AddCategory: React.FC = () => {
  const [image, setImage] = useState<string>(''); // Assuming this is the path to your initial image
  const [categorie, setCategorie] = useState<string>('');
  const { create} = usePost();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    // await create('addCategory', { name: categorie ,image });
    const newCategory = {
      categorie, // Ensure 'categorie' holds the correct name
      image, // Assuming 'image' is also correctly defined
      topCategory: false // or true, depending on your logic
  };

  await create('addCategory', { categories: [newCategory] });
  };

  return (
    <div className="container mt-4">
      {/* <h3 className="my-2">Add Category</h3> */}
      <form onSubmit={handleSubmit} className="row">
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
              style={{ height: "7rem" }}
            />
          </label>
        </div>

        

        <div className="col-12 mb-3">
          <label className="form-label">Add Category:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e)=>{setCategorie(e.target.value)}}
          />
        </div>

        <div className="col-12 my-2">
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
