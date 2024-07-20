import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Aboutus: React.FC = () => {
  
  return (
    <div className="container mt-4">
        <h3>About Us</h3>
      <form>
            <div className="">
              <div className="form-group">
                <p className=' m-0 fs-5'>Content:</p>
                <ReactQuill 
                  placeholder="Please Write Your Content Here" 
                />
              </div>
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
