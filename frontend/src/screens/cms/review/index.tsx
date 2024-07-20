import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RxCross1 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi2";


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
    comment: 'good Product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '2',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'good Product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '3',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'good Product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '4',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'good Product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  },
  {
    id: '5',
    user: 'Jennifer Miyakubo',
    rating: '2.5',
    comment: 'good Product',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
    date: '$1.00',
  }
];

const Review: React.FC = () => {
  const [review, setReview] = useState<Review[]>(initialReview);

  return (
    <div className="container mt-4">
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
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
              <th className="text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {review.map(order => (
              <tr key={order.id}>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.user}</td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.rating}</td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.comment}</td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>
                  <img src={order.image} alt={order.user} className='img-fluid' style={{height:"5rem", objectFit: 'cover'}} />
                </td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.date}</td>
                <td className="text-center text-nowrap d-flex justify-content-center align-items-center" style={{cursor:"pointer", gap:"1rem"}}>
                    <HiPencil/>
                    <RxCross1/>
                </td>
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
        <p>Showing 1 to {review.length} of {review.length} entries</p>
      </nav>
    </div>
  );
};

export default Review;
