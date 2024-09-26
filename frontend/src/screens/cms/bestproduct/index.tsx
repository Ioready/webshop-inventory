import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePostToWebshop } from '../../../contexts/usePostToWebshop';
import { message } from 'antd';
import { useFetchByLoad } from '../../../contexts';
import { useNavigate } from 'react-router-dom';

const resource = "products";

const BestProduct: React.FC = () => {
  const [ean, setEan] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options", bestProduct: "true" });

  const { update } = usePostToWebshop();
  const { fetch, data } = useFetchByLoad();
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    fetch({ url: resource, query: JSON.stringify(query) });
    console.log(data);

  }, [query]);

  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) });
  };


  const handleBestProductToggle = async (bestProduct: boolean, eanCode?: string) => {
    if (!eanCode && !ean) {
      message.error("EAN code is missing.");
      return;
    }
    try {
      await update(`${resource}/update-webshop-status`, { ean: eanCode || ean, bestProduct });
      refreshData();
      message.success(`Product ${bestProduct ? 'marked as' : 'removed from'} Best Product`);
    } catch (error) {
      console.error("Error updating product status:", error);
      message.error("Error updating product status");
    }
  };

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
      ← Back
      </button>

      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>Best Selling Products</h3>
      </div>

      <div className='d-flex mb-4' style={{ gap: "1rem" }}>
        <input
          type="text"
          className="form-control w-25 h-50"
          placeholder='EAN Code'
          onChange={(e) => { setEan(e.target.value) }}
        />
        <button className='btn btn-info text-white' onClick={() => handleBestProductToggle(true)}>Add Product</button>

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
            {data?.data?.map((order: any) => (
              <tr key={order.id}>
                <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>

                  <img
                    src={order.images}
                    alt={order.category}
                    className="img-fluid"
                    style={{ height: "5rem", objectFit: "contain" }}
                  />
                </td>
                <td className="text-center text-nowrap" style={{ cursor: "pointer" }}>
                  {order?.title}
                </td>
                <td className="d-flex" style={{ gap: "1rem" }}>
                  <button
                    onClick={() => {
                      setEan(order.ean);
                      handleBestProductToggle(false, order.ean);
                    }}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    Remove
                  </button>
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
        <p>Showing 1 to 1 of 1 entries</p>

      </nav>
    </div>
  );
};

export default BestProduct;
