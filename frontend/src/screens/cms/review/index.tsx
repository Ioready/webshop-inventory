import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RxCross1 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Delete from './delete';

interface Review {
  id: string;
  user: string;
  rating: string;
  comment: string;
  image: string;
  date: string;
}

const initialReview: Review[] = [
  {
    id: '1',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'Good product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '2024-01-01',
  },
  {
    id: '2',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'Good product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '2024-01-01',
  },
  {
    id: '3',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'Good product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '2024-01-01',
  },
  {
    id: '4',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'Good product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '2024-01-01',
  },
  {
    id: '5',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'Good product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '2024-01-01',
  }
];

const Review: React.FC = () => {
  const [review, setReview] = useState<Review[]>(initialReview);
  const [popupCustomer, setPopupCustomer] = useState(false);

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const handleDeleteClick = () => {
    setPopupCustomer(true);
  };

  return (
    <div className="container mt-4">
      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>All Reviews</h3>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">User</th>
              <th className="text-center">Rating</th>
              <th className="text-center">Comment</th>
              <th className="text-center">Image</th>
              <th className="text-center">Modified Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {review.map(order => (
              <tr key={order.id}>
                <td className="text-center">{order.user}</td>
                <td className="text-center">{order.rating}</td>
                <td className="text-center">{order.comment}</td>
                <td className="text-center">
                  <img src={order.image} alt={order.user} className='img-fluid' style={{ height: "5rem", objectFit: 'cover' }} />
                </td>
                <td className="text-center">{order.date}</td>
                <td className="text-center d-flex justify-content-center align-items-center gap-2">
                  <Link to="/cms/edit-review"><HiPencil /></Link>
                  <RxCross1 onClick={handleDeleteClick} style={{ cursor: "pointer" }} />
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
        <p>Showing 1 to {review.length} of {review.length} entries</p>
      </nav>
    </div>
  );
};

export default Review;
