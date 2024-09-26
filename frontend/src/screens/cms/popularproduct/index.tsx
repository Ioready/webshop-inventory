import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePostToWebshop } from '../../../contexts/usePostToWebshop';
import { message, Table } from 'antd';
import { useFetchByLoad } from '../../../contexts';
import { useNavigate } from 'react-router-dom';

const resource = "products";

const PopularProduct: React.FC = () => {
  const [ean, setEan] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options", popularProduct: "true" });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

  const { update } = usePostToWebshop();
  const { fetch, data } = useFetchByLoad();
  const navigate = useNavigate();

  // Fetch data based on query and pagination
  useEffect(() => {
    const newQuery = { ...query, skip: (pagination.current - 1) * pagination.pageSize, take: pagination.pageSize };
    fetch({ url: resource, query: JSON.stringify(newQuery) });
  }, [query, pagination.current, pagination.pageSize]);

  useEffect(() => {
    if (data?.total) {
      setPagination((prev) => ({
        ...prev,
        total: data.total, // Update total pages from API
      }));
    }
  }, [data?.total]);

  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) });
  };

  const handleBestProductToggle = async (popularProduct: boolean, eanCode?: string) => {
    if (!eanCode && !ean) {
      message.error("EAN code is missing.");
      return;
    }
    try {
      await update(`${resource}/update-webshop-status`, { ean: eanCode || ean, popularProduct });
      refreshData();
      message.success(`Product ${popularProduct ? 'marked as' : 'removed from'} Popular Product`);
    } catch (error) {
      console.error("Error updating product status:", error);
      message.error("Error updating product status");
    }
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (text: string) => <img src={text} alt="Product" className='img-fluid' style={{ height: "5rem", objectFit: 'contain' }} />
    },
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <div style={{ gap: "1rem", display: 'flex' }}>
          <button onClick={() => { setEan(record.ean); handleBestProductToggle(false, record.ean); }} className="btn btn-danger btn-sm">
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>Popular Products</h3>
      </div>

      <div className='d-flex mb-4' style={{ gap: "1rem" }}>
        <input
          type="text"
          className="form-control w-25 h-50"
          placeholder='EAN Code'
          onChange={(e) => { setEan(e.target.value); }}
        />
        <button className='btn btn-info text-white' onClick={() => handleBestProductToggle(true)}>Add Product</button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.count ?? 0,
          onChange: handleTableChange,
        }}
      />
    </div>
  );
};

export default PopularProduct;
