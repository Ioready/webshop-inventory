import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Delete from './delete';
import Select from 'react-select';
import { useFetchByLoad, usePatch } from '../../../contexts';
import { message, Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Customers {
  id: string;
  category: string;
  image: string;
}

const TopCategory: React.FC = () => {
  const [popupCustomer, setPopupCustomer] = useState(false);
  const { fetch, data } = useFetchByLoad();
  const [selectedCategory, setSelectedCategory] = useState<{ value: string, label: string } | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const navigate = useNavigate();
  const { edit } = usePatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetch({ url: "getCategory" });
    };

    fetchData();
  }, []);

  const topCategories = data?.categories[0]?.categories.filter((category: any) => category.topCategory === true);

  const handleClick = async (selectedIndex: number, topCategory: boolean) => {
    const url = `/${"editCategory"}`;
    const categoryId = data?.categories[0]?._id;

    if (!categoryId) {
      console.error("Category ID not found");
      return;
    }

    try {
      const updatedFields = {
        id: categoryId,
        selectedCategory: selectedIndex,
        topCategory,
      };

      await edit(url, { updatedFields });
      fetch({ url: "getCategory" });
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product`);
    }
  };

  const handleRemove = async (id: number) => {
    const index = data?.categories[0].categories.findIndex(
      (category: any) => category._id === id
    );

    const url = `/${"editCategory"}`;
    const categoryId = data?.categories[0]?._id;

    try {
      const updatedFields = {
        id: categoryId,
        selectedCategory: index,
        topCategory: false
      };

      await edit(url, { updatedFields });
      fetch({ url: "getCategory" });
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product`);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="category" style={{ height: '5rem', objectFit: 'contain' }} />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, category: any) => (
        //@ts-ignore
        <Button type="danger" onClick={() => handleRemove(category._id)} className="btn btn-danger btn-sm">
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className='w-100 d-flex justify-content-between align-items-center my-2'>
        <h3>Top Category</h3>
      </div>

      <div className='d-flex mb-4' style={{ gap: "1rem" }}>
        <Select
          options={
            data?.categories[0]?.categories.map((category: any, i: number) => ({
              value: category.name,
              label: category.name,
              index: i
            }))
          }
          //@ts-ignore
          onChange={(option) => { setSelectedCategory(option ? option?.index : 0); }}
          placeholder="Select a category"
          value={
            //@ts-ignore
            data?.categories[0]?.categories[selectedCategory] ? { value: selectedCategory, label: data?.categories[0]?.categories[selectedCategory].name }
              : null
          }
        />

        <button className='btn btn-info text-white'
          //@ts-ignore
          onClick={() => handleClick(selectedCategory, true)}>Add Category</button>
      </div>

      <Table
        columns={columns}
        dataSource={topCategories}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.count ?? 0,
        }}
        onChange={handleTableChange}
        rowKey="_id"
      />

      {popupCustomer && (
        <Delete onClose={closePopup} />
      )}
    </div>
  );
};

export default TopCategory;
