import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchByLoad, usePost } from '../../../contexts'; // Assuming you have a custom hook for posting data and fetching data

const Terms: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const { fetch, data } = useFetchByLoad();
  const { create } = usePost();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load terms and conditions');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        termAndConditions: 
          content,
      };
      await create('addCms', body);
      toast.success('Terms and Conditions updated successfully');
    } catch (error) {
      toast.error('Failed to update Terms and Conditions');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Terms and Conditions</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="m-0 fs-5">Content:</p>
          <input 
            value={data?.termAndConditions} 
            onChange={(e) => setContent(e.target.value)} 
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

export default Terms;
