import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFetchByLoad, usePost } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/firebase';

interface Section {
  id: number;
  description: string;
  image: string;
}

const Herosection: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    // { id: Date.now(), description: 'Welkom bij Classis', image: '' },
  ]);

  const { create} = usePost();
  const { fetch, data } = useFetchByLoad();
  const navigate = useNavigate();
  
 
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' });
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
    useEffect(() => {
    fetchData();
  }, []);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSections(sections.map(section => 
        section.id === id ? { ...section, image: imageUrl } : section
      ));
    }
  };

  const handleDescriptionChange = (value: string, id: number) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, description: value } : section
    ));
  };

  const handleAddSection = () => {
    setSections([...sections, { id: Date.now(), description: '', image: '' }]);
  };

  const handleRemoveSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log('what',data)
    event.preventDefault();
    
    const body = {
      herosection: sections.map(({ id, ...rest }) => rest),  // Removing `id` before sending to backend
    };
    
    try {
      await create('addCms', body);
      
      toast.success('Hero Section added successfully!')
      // navigate('/cms/hero-list');
    } catch (error) {
      toast.error('Failed to add Hero Section.')
    }
  };

  return (
    <div className="container mt-4">
      <h3 className=' my-2'>Herosection</h3>
      <form onSubmit={handleSubmit}>
        {data?.herosection?.map((section:any) => (
          <div className='row mb-4 d-flex justify-content-between align-items-center'  key={section.id} style={{gap:"1rem"}}>
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
                      onClick={() => document.getElementById(`imageUpload-${section.id}`)?.click()} 
                    />
                  ) : (
                    <div className="text-center">
                      <MdCloudUpload size="3em" />
                      <div>Click to upload an image</div>
                    </div>
                  )}
                  <input 
                    type="file" 
                    id={`imageUpload-${section.id}`} 
                    className="d-none" 
                    onChange={(e) => handleImageChange(e, section.id)} 
                  />
                </label>
              </div>
            </div>
            
            <div className="col-12 col-md-8">
              <div className="form-group">
                <input 
                  value={section.description} 
                  onChange={(event) => handleDescriptionChange(event.target.value, section.id)} 
                  placeholder="Please Write Your Content Here" 
                />
              </div>
            </div>
            
            <div className="col-12 text-right">
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={() => handleRemoveSection(section.id)}
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
          <button type="submit" className="btn btn-primary mt-3 " >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Herosection;

