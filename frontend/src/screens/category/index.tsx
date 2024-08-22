import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';

interface SubSubCategory {
  name: string;
}

interface SubCategory {
  name: string;
  subSubCategories?: SubSubCategory[];
}

interface Category {
  name: string;
  image: string;
  subCategories: SubCategory[];
}

const sampleData: Category[] = [
  {
    name: "Electronics",
    image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    subCategories: [
      {
        name: "Laptop",
        subSubCategories: [{ name: "Gaming Laptop" }, { name: "Ultrabook" }]
      },
      {
        name: "Smartphone",
        subSubCategories: [{ name: "Android" }, { name: "iOS" }]
      },
      {
        name: "Camera",
        subSubCategories: [{ name: "DSLR" }, { name: "Mirrorless" }]
      },
      {
        name: "Headphones",
        subSubCategories: [{ name: "Over-ear" }, { name: "In-ear" }]
      }
    ]
  },
  {
    name: "Books",
    image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    subCategories: [
      {
        name: "Fiction",
        subSubCategories: [{ name: "Mystery" }, { name: "Romance" }]
      },
      {
        name: "Non-fiction",
        subSubCategories: [{ name: "Biography" }, { name: "Self-help" }]
      },
      {
        name: "Comics",
        subSubCategories: [{ name: "Manga" }, { name: "Graphic Novels" }]
      },
      {
        name: "Biographies",
        subSubCategories: [{ name: "Historical" }, { name: "Political" }]
      }
    ]
  }
];
const TopCategories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showIconsFor, setShowIconsFor] = useState<string | null>(null);
    const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string } | null>(null);
  
    const handleTextClick = (item: string) => {
      setShowIconsFor(item);
    };
  
    const handleEditClick = () => {
      if (showIconsFor) setPopup({ type: 'edit', item: showIconsFor });
    };
  
    const handleDeleteClick = () => {
      if (showIconsFor) setPopup({ type: 'delete', item: showIconsFor });
    };
  
    const closePopup = () => {
      setPopup(null);
      setShowIconsFor(null);
    };
  
    return (
      <div className="container mt-5">
        <h3 className='my-2'>Top Categories</h3>
        <div className='d-flex' style={{ gap: "1rem" }}>
          <input
            type="text"
            className="form-control w-25 h-50"
            placeholder='EAN Code'
          />
          <button className='btn btn-info text-white'>Add Category</button>
        </div>
  
        <table className="table table-striped table-bordered table-hover mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Category Image</th>
              <th>Category Name</th>
              <th>Sub-Category Name</th>   
              <th>Sub-Sub Categories</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((category, categoryIndex) => 
              category.subCategories.map((subCategory, subCategoryIndex) => (
                <tr key={`${categoryIndex}-${subCategoryIndex}`}>
                  {subCategoryIndex === 0 && (
                    <>
                      <td rowSpan={category.subCategories.length}>
                        <img src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
                      </td>
                      <td 
                        rowSpan={category.subCategories.length} 
                        onClick={() => handleTextClick(category.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {category.name}
                        {showIconsFor === category.name && (
                           <div className=' ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor:"white", padding:"3px", borderRadius:"5px" }}>
                            <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                            <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                          </div>
                        )}
                      </td>
                    </>
                  )}
                  <td 
                    onClick={() => handleTextClick(subCategory.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    {subCategory.name}
                    {showIconsFor === subCategory.name && (
                       <div className=' ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor:"white", padding:"3px", borderRadius:"5px" }}>
                        <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                      </div>
                    )}
                  </td>
                  <td>
                    {subCategory.subSubCategories?.map((subSubCategory, subSubCategoryIndex) => (
                      <div 
                        key={subSubCategoryIndex} 
                        onClick={() => handleTextClick(subSubCategory.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {subSubCategory.name}
                        {showIconsFor === subSubCategory.name && (
                          <div className=' ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor:"white", padding:"3px", borderRadius:"5px" }}>
                            <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                            <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
  
        {popup && popup.type === 'edit' && (
          <EditPopup item={popup.item} onClose={closePopup} />
        )}
        {popup && popup.type === 'delete' && (
          <DeletePopup item={popup.item} onClose={closePopup} />
        )}
      </div>
    );
  };
  
  export default TopCategories;