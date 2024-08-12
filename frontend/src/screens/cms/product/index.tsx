import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { usePostToWebshop } from '../../../contexts/usePostToWebshop';
import { useFetchByLoad } from '../../../contexts';

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [ean, setEan] = useState<string | undefined>(undefined);
  const [groupedData, setGroupedData] = useState<Category[]>([]);
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options", topProduct: "true" });

  const { update } = usePostToWebshop();
  const { fetch, data } = useFetchByLoad();

  useEffect(() => {
    fetch({ url: 'products', query: JSON.stringify(query) });
  }, [query]);

  useEffect(() => {
    if (data?.data) {
      const grouped = data.data.reduce((acc: any, product: any) => {
        const { categories, title, ean } = product;
        const existingCategory = acc.find((item: any) => item.name === categories);
        if (existingCategory) {
          existingCategory.products.push({ name: title, ean });
        } else {
          acc.push({ name: categories, products: [{ name: title, ean }] });
        }
        return acc;
      }, []);
      setGroupedData(grouped);
    }
  }, [data]);

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
      await update(`products/update-webshop-status`, { ean, topProduct: true });
      fetch({ url: 'products', query: JSON.stringify(query) });
      message.success('Product added to Top Products');
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Error adding product");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className='my-2'>Top Product</h3>
      <div className='d-flex' style={{ gap: "1rem" }}>
        <input
          type="text"
          className="form-control w-25 h-50"
          placeholder='EAN Code'
          onChange={(e) => { setEan(e.target.value); }}
        />
        <button className='btn btn-info text-white' onClick={handleAddProduct}>Add Product</button>
      </div>

      <table className="table table-striped table-bordered table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Product Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groupedData?.map((category: any, categoryIndex: any) =>
            category.products.map((product: any, productIndex: any) => (
              <tr key={`${categoryIndex}-${productIndex}`}>
                {productIndex === 0 && (
                  <>
                    <td rowSpan={category.products.length}>
                      <img src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
                    </td>
                    <td rowSpan={category.products.length}>{category.name}</td>
                  </>
                )}
                <td>{product.name}</td>
                <td className='d-flex' style={{ gap: "1rem" }}>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleTopProductToggle(false, categoryIndex, productIndex)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
