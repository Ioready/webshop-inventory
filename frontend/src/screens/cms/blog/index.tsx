import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

interface Customers {
  id: string;
  title: string;
  image: string;
  date: string;
}

const initialCustomers: Customers[] = [
  {
    id: '1',
    title: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '2',
    title: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '3',
    title: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '4',
    title: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '5',
    title: 'Jennifer Miyakubo',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  }
];

const Blog: React.FC = () => {
  const [customers, setCustomers] = useState<Customers[]>(initialCustomers);

  return (
    <div className="container mt-4">
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
      <h3>All Blog</h3>
      <Link to='/add-blog' className=' px-2 py-1 rounded-2 bg-black text-white' style={{cursor:"pointer"}}>Add New Blog</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Edit</th>
              <th className="text-center">Title</th>
              <th className="text-center">Image</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(order => (
              <tr key={order.id}>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}><Link to='/add-blog'><MdEdit style={{fontSize:"x-large"}}/></Link></td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.title}</td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>
                  <img src={order.image} alt={order.title} className='img-fluid' style={{height:"5rem", objectFit: 'cover'}} />
                </td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.date}</td>
              </tr>
            ))}
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
        <p>Showing 1 to {customers.length} of {customers.length} entries</p>
      </nav>
    </div>
  );
};

export default Blog;
