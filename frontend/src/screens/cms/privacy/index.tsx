import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchByLoad, usePost } from '../../../contexts'; // Assuming you have custom hooks for posting data and fetching data
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const { fetch, data } = useFetchByLoad();
  const { create } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load privacy policy');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.privacyPolicy) {
      setContent(data.privacyPolicy); // Populate editor content from data on load
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        privacyPolicy: content,
      };
      await create('addCms', body);
      toast.success('Privacy Policy updated successfully');
    } catch (error) {
      toast.error('Failed to update Privacy Policy')
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <h3>Privacy Policy</h3>
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

export default Privacy;
