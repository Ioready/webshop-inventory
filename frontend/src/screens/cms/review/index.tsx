import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RxCross1 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import Delete from './delete';
import { useDelete, useFetchByLoad } from '../../../contexts';
import { message } from 'antd';

interface Review {
  id: string;
  user: string;
  rating: string;
  comment: string;
  image: string;
  date: string;
}

const resource = 'deleteCms';

const Review: React.FC = () => {
  const [review, setReview] = useState<Review[]>([]);
  const [popupCustomer, setPopupCustomer] = useState<{ isOpen: boolean; reviewId?: string }>({ isOpen: false });
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    fetch({ url: 'getCms' });
  }, []);

  const closePopup = () => {
    setPopupCustomer({ isOpen: false });
  };

  const handleDeleteClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setPopupCustomer({ isOpen: true });
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedReviewId) {
        await remove(resource, { _id: selectedReviewId});
        message.success("Review deleted successfully");
        fetch({ url: 'getCms' });
        closePopup();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      message.error("Error deleting review");
    }
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
              <th className="text-center">Modified Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.review?.map((order: Review) => (
              <tr key={order.id}>
                <td className="text-center">{order.user}</td>
                <td className="text-center">{order.rating}</td>
                <td className="text-center">{order.comment}</td>
                <td className="text-center">{order.date}</td>
                <td className="text-center d-flex justify-content-center align-items-center gap-2">
                  <Link to="/cms/edit-review" state={{ review: order }}><HiPencil /></Link>
                  <RxCross1 onClick={() => handleDeleteClick(order.id)} style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupCustomer.isOpen && (
        <Delete onClose={closePopup} onConfirm={handleConfirmDelete} />
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
