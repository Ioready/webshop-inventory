import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDelete, useFetchByLoad, usePost } from '../../../contexts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Section {
  _id: number;
  description: string;
  image: string;
}
const resource='deleteCms';

const Herosection: React.FC = () => {
  const [newSections, setNewSections] = useState<Section[]>([]);
  const { create } = usePost();
  const { fetch, data } = useFetchByLoad();
  const { remove} = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    fetch({ url: 'getCms' });
  }, []);

  const refreshData = () => {
    fetch({ url: 'getCms' });
    };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, _id: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setNewSections(prevSections => prevSections.map(section =>
        section._id === _id ? { ...section, image: url } : section
      ));
    }
  };

  const handleDescriptionChange = (value: string, _id: number) => {
    setNewSections(prevSections => {
      const updatedSections = prevSections.map(section =>
        section._id === _id && section.description !== value
          ? { ...section, description: value }
          : section
      );
  
      // Check if any section has been updated
      const isUpdated = updatedSections.some(
        (section, index) => section.description !== prevSections[index].description
      );
  
      // Only update the state if there was an actual change
      return isUpdated ? updatedSections : prevSections;
    });
  };
  


  const handleAddSection = () => {
    const newSection = { _id: Date.now(), description: '', image: '' };
    setNewSections([...newSections, newSection]);
  };

  const handleRemoveSection = async(_id: number) => {
    // setNewSections(newSections.filter(section => section._id !== _id));
      try {
        remove(`${resource}`, { _id,type:"herosection"})
        message.success("Selected products deleted successfully");
        refreshData();
      } catch (error) {
        console.error("Error deleting products:", error);
        message.error("Error deleting products");
      }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = {
      herosection: newSections.map(({ _id, ...rest }) => rest),  // Remove `_id` before sending to backend
    };

    try {
      await create('addCms', body);
      toast.success('Hero Section added successfully!');
      // navigate('/cms/hero-list');
    } catch (error) {
      toast.error('Failed to add Hero Section.');
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <h3 className='my-2'>Herosection</h3>
      <form onSubmit={handleSubmit}>
        {data?.herosection?.map((section:any) => (
          <div className='row mb-4 d-flex justify-content-between align-items-center' key={section._id} style={{ gap: "1rem" }}>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label
                  className="d-block border p-2"
                  style={{ cursor: 'pointer' }}
                >
                  {section.image ? (
                    <img
                      src={section.image}
                      alt="uploaded"
                      className="img-fluid"
                      onClick={() => document.getElementById(`imageUpload-${section._id}`)?.click()}
                    />
                  ) : (
                    <div className="text-center">
                      <MdCloudUpload size="3em" />
                      <div>Click to upload an image</div>
                    </div>
                  )}
                  <input
                    type="file"
                    id={`imageUpload-${section._id}`}
                    className="d-none"
                    onChange={(e) => handleImageChange(e, section._id)}
                  />
                </label>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div className="form-group">
                <ReactQuill
                  value={section.description}
                  onChange={(value) => handleDescriptionChange(value, section._id)}
                  placeholder="Please Write Your Content Here"
                />
              </div>
            </div>

            <div className="col-12 text-right">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveSection(section._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {newSections.map((section) => (
          <div className='row mb-4 d-flex justify-content-between align-items-center' key={section._id} style={{ gap: "1rem" }}>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label
                  className="d-block border p-2"
                  style={{ cursor: 'pointer' }}
                >
                  {section.image ? (
                    <img
                      src={section.image}
                      alt="uploaded"
                      className="img-fluid"
                      onClick={() => document.getElementById(`imageUpload-${section._id}`)?.click()}
                    />
                  ) : (
                    <div className="text-center">
                      <MdCloudUpload size="3em" />
                      <div>Click to upload an image</div>
                    </div>
                  )}
                  <input
                    type="file"
                    id={`imageUpload-${section._id}`}
                    className="d-none"
                    onChange={(e) => handleImageChange(e, section._id)}
                  />
                </label>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div className="form-group">
                <ReactQuill
                  value={section.description}
                  onChange={(value) => handleDescriptionChange(value, section._id)}
                  placeholder="Please Write Your Content Here"
                />
              </div>
            </div>

            <div className="col-12 text-right">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveSection(section?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="col-12">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddSection}
          >
            Add Section
          </button>
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

export default Herosection;
