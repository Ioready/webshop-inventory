import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDelete, useFetchByLoad } from '../../../contexts';
import Delete from './delete';
import { message } from 'antd';

interface Blog {
  title: string;
  image: string;
  date: string;
  description: string;
}
const resource='deleteCms';
const Blog: React.FC = () => {

  const [popupCustomer, setPopupCustomer] = useState(false);
  const navigate = useNavigate();

  const closePopup = () => {
    setPopupCustomer(false);
  };
  const refreshData = () => {
    fetch({ url: 'getCms' });
    };

  const handleDeleteClick = (_id: number) => {
    // setPopupCustomer(true);
    try {
      remove(`${resource}`, { _id,type:"blogs"})
      message.success("Selected products deleted successfully");
      refreshData();
    } catch (error) {
      console.error("Error deleting products:", error);
      message.error("Error deleting products");
    }
  };

  const { fetch, data } = useFetchByLoad();
  const { remove} = useDelete();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch({ url: 'getCms' })
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);


  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>All Blog</h3>
        <Link to='/add-blog' className='px-2 py-1 rounded-2 bg-black text-white' style={{ cursor: "pointer" }}>
          Add New Blog
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Image</th>
              <th className="text-center">Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.blogs?.length > 0 ? (
              data?.blogs.map((blog:any, index:any) => (
                <tr key={index}>
                  <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>{blog.title}</td>
                  <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>
                    <img src={blog?.image[0]} alt={blog.title} className='img-fluid' style={{ height: "5rem", objectFit: 'cover' }} />
                  </td>
                  <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>
                    {new Date(blog.date).toLocaleDateString()}
                  </td>
                  <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>
                    <Link to={`/add-blog`} state={{ blog }}><MdEdit style={{ fontSize: "x-large" }} /></Link>
                  <button onClick={()=>handleDeleteClick(blog?._id)} className="btn btn-sm ml-2"><MdDelete style={{ fontSize: "x-large" }} className=' text-danger'/></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No blogs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        <p>Showing 1 to {data?.blogs?.length} of {data?.blogs?.length} entries</p>
      </nav>

      {/* {popupCustomer && (
        <Delete onClose={closePopup} />
      )} */}
    </div>
  );
};

export default Blog;
