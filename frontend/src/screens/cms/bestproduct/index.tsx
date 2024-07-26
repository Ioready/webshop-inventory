import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import Delete from './delete';

interface Customers {
  id: string;
  category: string;
  image: string;
}

const initialCustomers: Customers[] = [
  {
    id: '1',
    category: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    
  },
  {
    id: '2',
    category: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
   
  },
  {
    id: '3',
    category: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    
  },
  {
    id: '4',
    category: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
   
  },
  {
    id: '5',
    category: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    
  }
];

const BestProduct: React.FC = () => {
  const [customers, setCustomers] = useState<Customers[]>(initialCustomers);
  const [popupCustomer, setPopupCustomer] = useState(false);

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const handleDeleteClick = () => {
    setPopupCustomer(true);
  };

  return (
    <div className="container mt-4">
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
      <h3>Best Selling Products</h3>
      <Link to='/cms/add-best-product' className=' px-2 py-1 rounded-2 bg-black text-white' style={{cursor:"pointer"}}>Add New Product</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Product</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(order => (
              <tr key={order.id}>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>
                  <img src={order.image} alt={order.category} className='img-fluid' style={{height:"5rem", objectFit: 'cover'}} />
                </td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.category}</td>
                <td className=' d-flex' style={{ gap:"1rem"}}>
                <Link to='/cms/add-best-product' className="btn btn-primary btn-sm">Edit</Link>
                  <button onClick={handleDeleteClick}  className="btn btn-danger btn-sm ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupCustomer && (
        <Delete onClose={closePopup} />
      )}
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
        <p>Showing 1 to {customers.length} of {customers.length} entries</p>
      </nav>
    </div>
  );
};

export default BestProduct;
