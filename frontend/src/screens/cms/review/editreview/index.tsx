import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rating } from 'react-simple-star-rating';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePatch } from '../../../../contexts';

const ReviewForm: React.FC = () => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const location = useLocation(); // Get location state
  const navigate = useNavigate();
  const { edit } = usePatch();
  const reviewToEdit = location.state?.review;

  useEffect(() => {
    if (reviewToEdit) {
      setUser(reviewToEdit.user);
      setComment(reviewToEdit.comment);
      setRating(parseFloat(reviewToEdit.rating));
    }
  }, [reviewToEdit]);

  const handleRating = (rate: number) => {
    setRating(rate); // Convert rating to a value between 0 and 5
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (reviewToEdit) {
        await edit('editReview', { reviewId: reviewToEdit._id,user,comment,rating,date:new Date() });
        toast.success('Review updated successfully!');
      }
      navigate('/cms/review');
    } catch (error) {
      toast.error('Failed to save review. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <h3>{reviewToEdit ? 'Edit Review' : 'Add Review'}</h3>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">User:</label>
          <input
            type="text"
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">Rating</label>
          <Rating
            onClick={handleRating}
            initialValue={rating} // convert rating to a value between 0 and 100
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">Comment</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="col-12 my-2">
          <button type="submit" className="btn btn-dark btn-block">
            {reviewToEdit ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
