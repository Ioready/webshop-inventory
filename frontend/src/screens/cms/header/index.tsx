import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import { useFetchByLoad, usePost } from '../../../contexts'; // Assuming you have a custom hook for posting data
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string>(''); // Path to your initial image

  const { create} = usePost();
  const { fetch, data } = useFetchByLoad();
  const navigate = useNavigate();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]; // Get the first file
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url); // Set single logo URL
      } catch (error) {
        toast.error('Failed to upload image.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
      try {
        if (data && data.header) {
          setEmail(data.header.email);
          setContent(data.header.slogan);
          setImage(data.header.logo);
          setPhone(data.header.phone);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        header: {
          logo: image,
          slogan: content,
          phone,
          email,
        },
      };
      await create('addCms', body);
      toast.success('Header updated successfully');
    } catch (error) {
      toast.error('Failed to update header');
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <h3 className='my-2'>Header</h3>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 mb-3">
          <label className="form-label">Slogan:</label>
          <input 
            type="text" 
            className="form-control" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div className="col-12 mb-3">
          <h4 className="font-weight-bold m-0">Logo</h4>
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

        <div className="col-12 mb-3">
          <label className="form-label">Phone:</label>
          <input 
            type="text" 
            className="form-control" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <div className="col-12 my-2">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
