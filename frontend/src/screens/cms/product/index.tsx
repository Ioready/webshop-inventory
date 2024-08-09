import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Delete from './delete';

interface Product {
  name: string;
}

interface Category {
  name: string;
  image: string;
  products: Product[];
}

const sampleData: Category[] = [
  {
    name: "Electronics",
    image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    products: [
      { name: "Laptop" },
      { name: "Smartphone" },
      { name: "Camera" },
      { name: "Headphones" }
    ]
  },
  {
    name: "Books",
    image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    products: [
      { name: "Fiction" },
      { name: "Non-fiction" },
      { name: "Comics" },
      { name: "Biographies" }
    ]
  }
];

const TopProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [popupCustomer, setPopupCustomer] = useState(false);

  const closePopup = () => {
    setPopupCustomer(false);
  };

  const handleDeleteClick = () => {
    setPopupCustomer(true);
  };

  const handleSelect = (category: Category | null) => {
    setSelectedCategory(category);
    console.log(`Selected category: ${category?.name}`);
  };

  const categoryOptions = sampleData.map((category) => ({
    value: category.name,
    label: category.name
  }));

  const displayedCategories = selectedCategory ? [selectedCategory] : sampleData;

  return (
    <div className="container mt-5">
      <h3 className=' my-2'>Top Product</h3>
      <div className=' d-flex' style={{gap:"1rem"}}>
      
      <input
            type="text"
            className="form-control w-25 h-50"
            placeholder='EAN Code'
          />
      <button className=' btn btn-info text-white'>Add Product</button>
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
          {displayedCategories.map((category, categoryIndex) => 
            category.products.map((product, productIndex) => (
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
                <td className=' d-flex' style={{ gap:"1rem"}}>
                  <button onClick={handleDeleteClick} className="btn btn-danger btn-sm ml-2">Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {popupCustomer && (
        <Delete onClose={closePopup} />
      )}
    </div>
  );
};

export default TopProducts;
