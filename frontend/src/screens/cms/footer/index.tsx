import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('info@classies.be');
  const [content, setContent] = useState('Vandaag besteld en het wordt bir');
  const [phone, setPhone] = useState('+32 495 76 23 05');
  const [image, setImage] = useState<string>(' '); // Assuming this is the path to your initial image

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ email, content, phone, image });
  };

  return (
    <div className="container mt-4">
        <h3 className=' my-2'>Footer</h3>
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
          <label className="form-label">Email :</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Content:</label>
          <input 
            type="text" 
            className="form-control" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Phone :</label>
          <input 
            type="text" 
            className="form-control" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Address :</label>
          <input 
            type="text" 
            className="form-control" 
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Tax :</label>
          <input 
            type="text" 
            className="form-control" 
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
