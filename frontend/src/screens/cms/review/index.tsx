import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, message, Modal } from 'antd';
import { RxCross1 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { useDelete, useFetchByLoad } from '../../../contexts';

interface Review {
  _id: string;
  user: string;
  rating: string;
  comment: string;
  image: string;
  date: string;
}

const resource = 'deleteCms';

const Review: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const { fetch, data } = useFetchByLoad();
  const { remove } = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    fetch({ url: 'getCms' });
  }, []);

  const handleDeleteClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      onOk: handleConfirmDelete,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedReviewId) {
        await remove(resource, { _id: selectedReviewId });
        message.success("Review deleted successfully");
        fetch({ url: 'getCms' });
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      message.error("Error deleting review");
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (text: string) => <span>{text}</span>,
      width: '20%',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '15%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: '30%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: '15%',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: any, record: Review) => (
        <span className="d-flex justify-content-center align-items-center gap-2">
          <Link to="/cms/edit-review" state={{ review: record }}>
            <HiPencil />
          </Link>
          <RxCross1 onClick={() => handleDeleteClick(record._id)} style={{ cursor: "pointer" }} />
        </span>
      ),
      width: '20%',
    },
  ];

  const paginatedData = data?.review?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container mt-4">
      <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>All Reviews</h3>
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
        total={data?.review?.length || 0}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20']}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default Review;
