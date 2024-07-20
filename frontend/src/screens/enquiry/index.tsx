import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Customers {
  id: string
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialCustomers: Customers[] = [
  {
    id: '1',
    name: 'Robi Lahdo',
    message: 'Hii, This is me',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  {
    id: '2',
    name: 'Robi Lahdo',
    message: 'Hii, This is me',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  {
    id: '3',
    name: 'Robi Lahdo',
    message: 'Hii, This is me',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  {
    id: '4',
    name: 'Robi Lahdo',
    message: 'Hii, This is me',
    email: 'robi@example.com',
    phone: '+1123456789',
  },
  {
    id: '5',
    name: 'Robi Lahdo',
    message: 'Hii, This is me',
    email: 'robi@example.com',
    phone: '+1123456789',
  }
];

const Enqury: React.FC = () => {
  const [Customers, setCustomers] = useState<Customers[]>(initialCustomers);

  const Navigate = useNavigate();

  const handleviewallpage = () => {
    Navigate("/customer-details");
  }

  return (
    <div className=' d-flex flex-column'>
    <Breadcrumbs pageName="Enquiry" />
    <div className="container mt-4">
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>massage</th>
            </tr>
          </thead>
          <tbody>
            {Customers.map(order => (
              <tr key={order.id}>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.name}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.email}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.phone}</td>
                <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.message}</td>
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
        <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
      </nav>
    </div>
    </div>
  );
};

export default Enqury;