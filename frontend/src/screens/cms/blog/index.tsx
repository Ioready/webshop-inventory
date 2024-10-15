import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, message } from 'antd';
import { MdEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDelete, useFetchByLoad } from '../../../contexts';

interface Blog {
  _id: string;
  title: string;
  image: string[];
  date: string;
}

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [popupCustomer, setPopupCustomer] = useState(false);
  const navigate = useNavigate();
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const refreshData = () => {
    fetch({ url: 'getCms' });
  };

  const handleDeleteClick = async (_id: string) => {
    try {
      await remove('deleteCms', { _id, type: 'blogs' });
      message.success("Blog deleted successfully");
      refreshData();
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Error deleting blog");
    }
  };

  useEffect(() => {
    fetch({ url: 'getCms' });
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span>{text}</span>,
      width: '20%',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (images: string[]) => (
        <img src={images[0]} alt="Blog" style={{ height: '5rem', objectFit: 'cover' }} />
      ),
      width: '20%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Blog) => (
        <span>
          <Link to={`/add-blog`} state={{ blog: record }}>
            <MdEdit style={{ fontSize: 'x-large' }} />
          </Link>
          <Button
            type="link"
            onClick={() => handleDeleteClick(record._id)}
            icon={<MdDelete style={{ color: 'red', fontSize: 'x-large' }} />}
          />
        </span>
      ),
      width: '20%',
    },
  ];

  const paginatedData = data?.blogs?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container mt-4">
      <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>All Blogs</h3>
        <Link to='/add-blog' className='px-2 py-1 rounded-2 bg-black text-white' style={{ cursor: 'pointer' }}>
          Add New Blog
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey={(record) => record._id}
        pagination={false}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.blogs?.length || 0}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20']}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default Blog;
