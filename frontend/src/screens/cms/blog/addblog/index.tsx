import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { usePost } from '../../../../contexts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase/firebase';
import ReactQuill from 'react-quill';


const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string[]>([]);

  const { create } = usePost();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const body = {
      blogs: {
        title,
        description,
        image,  // Firebase image URLs
        date: new Date(),
      }
    };

    try {
      await create('addCms', body);
      toast.success('Blog added successfully!');
      navigate('/cms/blog-list');
    } catch (error) {
      toast.error('Failed to add blog. Please try again.');
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          return url;
        })
      );
      setImage((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpdate();
  };

  return (
    <div className="m-3">
        <h3 className=' my-2'>Add Blog Section</h3>
      <form onSubmit={handleSubmit} className=' bg-white p-2 rounded-2'>
        <div className="form-group">
          <label htmlFor="blogTitle">Blog Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="blogTitle" 
            placeholder="Blog" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        
        <div className="form-group mt-3">
          <label htmlFor="blogDescription">Description</label>
          <ReactQuill 
            value={description} 
            onChange={(content: string) => setDescription(content)}
            placeholder="Please Write Your Content Here" 
          />
        </div>

        <div className="form-group mt-3">
          <label>Image Input</label>
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <label 
                className="d-block text-center border p-3" 
                style={{ cursor: 'pointer' }}>
                <MdCloudUpload size="3em" />
                <input 
                  type="file" 
                  multiple 
                  className="d-none" 
                  onChange={handleImageChange} 
                />
                <div>Click to upload an image</div>
              </label>
            </div>
            {image.map((image, index) => (
              <div className="col-12 col-md-4 mb-3" key={index}>
                <img src={image} alt={`upload-${index}`} className="img-fluid" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
