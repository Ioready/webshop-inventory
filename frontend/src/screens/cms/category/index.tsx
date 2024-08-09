import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import Delete from './delete';
import Select from 'react-select';

interface Customers {
  id: string;
  category: string;
  image: string;
}

const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'beauty', label: 'Beauty' }
];

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

const TopCategory: React.FC = () => {
  const [customers, setCustomers] = useState<Customers[]>(initialCustomers);
  const [popupCustomer, setPopupCustomer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ value: string, label: string } | null>(null);

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const handleDeleteClick = () => {
    setPopupCustomer(true);
  };

  return (
    <div className="container mt-4">
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
      <h3>Top Category</h3>
      </div>

      <div className=' d-flex mb-4' style={{gap:"1rem"}}>
      
      <Select
            options={categoryOptions}
            onChange={setSelectedCategory}
            placeholder="Select a category"
            value={selectedCategory}
          />
      <button className=' btn btn-info text-white'>Add Category</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">category</th>
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
                  <button  onClick={handleDeleteClick} className="btn btn-danger btn-sm ml-2">Remove</button>
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

export default TopCategory;
