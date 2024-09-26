import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchByLoad, usePost } from '../../../contexts';
import { useNavigate } from 'react-router-dom';

const Aboutus: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const { fetch, data } = useFetchByLoad();
  const { create } = usePost();
  const navigate  = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load About Us content');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.aboutUs) {
      setContent(data.aboutUs); // Populate editor content from data on load
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        aboutUs: content,
      };
      await create('addCms', body);
      toast.success('About Us updated successfully');
    } catch (error) {
      toast.error('Failed to update About Us');
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <h3>About Us</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="m-0 fs-5">Content:</p>
          <ReactQuill 
            value={content} 
            onChange={(e:string) => setContent(e)} 
            placeholder="Please Write Your Content Here" 
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Aboutus;
