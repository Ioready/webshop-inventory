import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { usePostToWebshop } from '../../../contexts/usePostToWebshop';
import { useFetchByLoad } from '../../../contexts';
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  ean: string;
}

interface Category {
  name: string;
  image: string;
  products: Product[];
}

const TopProducts: React.FC = () => {
  const [ean, setEan] = useState<string | undefined>(undefined);
  const [groupedData, setGroupedData] = useState<Category[]>([]);
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options", topProduct: "true", isWebshopProduct: "true" });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

  const { update } = usePostToWebshop();
  const { fetch, data } = useFetchByLoad();
  const { fetch: fetchCategories, data: categoryData } = useFetchByLoad();
  const navigate = useNavigate();

  useEffect(() => {
    const newQuery = { ...query, skip: (pagination.current - 1) * pagination.pageSize, take: pagination.pageSize };
    fetch({ url: 'products', query: JSON.stringify(newQuery) });
  }, [query, pagination.current, pagination.pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories({ url: "getCategory" });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.data && categoryData?.categories?.length) {
      const grouped = data.data.reduce((acc: any, product: any) => {
        const { categories, title, ean } = product;

        const matchingCategory = categoryData.categories[0].categories.find((cat: any) => cat.name === categories);
        const existingCategory = acc.find((item: any) => item.name === categories);
        const categoryImage = matchingCategory ? matchingCategory.image : '';  

        if (existingCategory) {
          existingCategory.products.push({ name: title, ean });
        } else {
          acc.push({ name: categories, image: categoryImage, products: [{ name: title, ean }] });
        }
        return acc;
      }, []);

      setGroupedData(grouped);
    }
  }, [data, categoryData]);

  const refreshData = () => {
    fetch({ url: 'products', query: JSON.stringify(query) });
  };

  const handleTopProductToggle = async (topProduct: boolean, categoryIndex: number, productIndex: number) => {
    try {
      const product = groupedData[categoryIndex].products[productIndex];
      await update(`products/update-webshop-status`, { ean: product.ean, topProduct });

      const updatedGroupedData = [...groupedData];
      updatedGroupedData[categoryIndex].products.splice(productIndex, 1);
      if (updatedGroupedData[categoryIndex].products.length === 0) {
        updatedGroupedData.splice(categoryIndex, 1);
      }
      setGroupedData(updatedGroupedData);
      message.success(`Product ${topProduct ? 'marked as' : 'removed from'} Top Product`);
    } catch (error) {
      console.error("Error updating product status:", error);
      message.error("Error updating product status");
    }
  };

  const handleAddProduct = async () => {
    try {
      await update(`products/update-webshop-status`, { ean, topProduct: true, isWebshopProduct: true });
      refreshData();
      message.success('Product added to Top Products');
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Error adding product");
    }
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  const columns = [
    {
      title: 'Category Image',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="Category" className='img-fluid' style={{ height: "5rem", objectFit: 'contain' }} />,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Name',
      dataIndex: 'products',
      key: 'products',
      render: (_: any, record: any, index: number) => (
        <>
          {record.products.map((product: any, productIndex: any) => (
            <div key={`${index}-${productIndex}`}>
              {product.name}
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any, categoryIndex: number) => (
        <>
          {record.products.map((_: any, productIndex: any) => (
            <div key={`${categoryIndex}-${productIndex}`}>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => handleTopProductToggle(false, categoryIndex, productIndex)}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <button className="btn  mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h3 className='my-2'>Top Products</h3>
      <div className='d-flex mb-4' style={{ gap: "1rem" }}>
        <input
          type="text"
          className="form-control w-25"
          placeholder='EAN Code'
          onChange={(e) => setEan(e.target.value)}
        />
        <button className='btn btn-info text-white' onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={groupedData}
        rowKey="name"
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

export default TopProducts;
