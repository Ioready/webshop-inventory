import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rating } from 'react-simple-star-rating'


const ReviewForm: React.FC = () => {
  const [user, setUser] = useState('admin@gmail.com');
  const [comment, setComment] = useState('lorem ipsum');
  const [product, setProduct] = useState('Beeztees rvs delux dinerset Lumara hond grijs 16 cm - 2 x 800 ml');
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)

    // other logic
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ user, rating, comment, product });
  };

  return (
    <div className="container mt-4">
      <h3>Edit Reviews</h3>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">User:</label>
          <div>{user}</div>
        </div>

        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">Rating</label>
          <Rating
        onClick={handleRating}
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

        <div className="col-12 mb-3">
          <label className="form-label font-weight-bold">Product</label>
          <div>{product}</div>
        </div>

        <div className="col-12 my-2">
          <button type="submit" className="btn btn-dark btn-block">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
