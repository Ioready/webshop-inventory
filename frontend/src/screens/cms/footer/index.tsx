import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import { useFetchByLoad, usePost } from '../../../contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/firebase';
import ReactQuill from 'react-quill';

const Footer: React.FC = () => {
  const [logo, setLogo] = useState<string>(''); // Single logo image URL
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [taxInformation, setTaxInformation] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');

  const { create } = usePost();
  const { fetch, data } = useFetchByLoad();

  // Handle image upload
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]; // Get the first file
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setLogo(url); // Set single logo URL
      } catch (error) {
        toast.error('Failed to upload image.');
      }
    }
  };

  // Fetch footer data on component mount
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

  // Update state when data changes
  useEffect(() => {
    if (data && data.footer) {
      setAddress(data.footer.address);
      setContent(data.footer.content);
      setLogo(data.footer.logo);
      setTaxInformation(data.footer.taxInformation);
      setNewsletterContent(data.footer.newsletterContent);
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        footer: {
          logo,
          content,
          address,
          taxInformation,
          newsletterContent,
        }
      };
      await create('addCms', body);
      toast.success('Footer updated successfully');
    } catch (error) {
      toast.error('Failed to update footer');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className='my-2'>Footer</h3>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 mb-3">
          <label 
            className="d-block border p-2" 
            style={{ cursor: 'pointer' }}
          >
            {logo ? (
              <img 
                src={logo} 
                alt="Logo" 
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

        <div className="col-12 mb-3">
          <label className="form-label">Content:</label>
          <ReactQuill 
            value={content} 
            onChange={(e:string) => setContent(e)} 
            placeholder="Please Write Your Content Here" 
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Address:</label>
          <input 
            type="text" 
            className="form-control" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Tax Information:</label>
          <input 
            type="text" 
            className="form-control" 
            value={taxInformation} 
            onChange={(e) => setTaxInformation(e.target.value)} 
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Newsletter Content:</label>
          <input 
            type="text" 
            className="form-control" 
            value={newsletterContent} 
            onChange={(e) => setNewsletterContent(e.target.value)} 
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

export default Footer;
