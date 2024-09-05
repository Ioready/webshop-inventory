import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import { useFetchByLoad } from '../../contexts';

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

const TopCategories: React.FC = () => {
    const [showIconsFor, setShowIconsFor] = useState<string | null>(null);
    const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string } | null>(null);
  
    const { fetch, data } = useFetchByLoad();

    useEffect(() => {
      fetch({ url: "getCategory" })
      console.log('getCategory',data?.categories[0]?.categories);
    }, []);

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
  <h3 className="my-2">Categories list</h3>
  {/* <div className='d-flex' style={{ gap: "1rem" }}>
    <input
      type="text"
      className="form-control w-25 h-50"
      placeholder='EAN Code'
    />
    <button className='btn btn-info text-white'>Add Category</button>
  </div> */}

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
  {data?.categories[0]?.categories?.map((category: any, categoryIndex: any) => {
    const hasSubCategories = category.subCategories && category.subCategories.length > 0;

    if (!hasSubCategories) {
      return (
        <tr key={categoryIndex}>
          <td>
            <img src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
          </td>
          <td onClick={() => handleTextClick(category.name)} style={{ cursor: 'pointer' }}>
            {category.name}
            {showIconsFor === category.name && (
              <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
                <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
              </div>
            )}
          </td>
          {/* <td colSpan={2}>No Subcategories</td> */}
        </tr>
      );
    }

    return category.subCategories.map((subCategory: any, subCategoryIndex: any) => (
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
                <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
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
            <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
              <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
              <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
            </div>
          )}
        </td>
        <td>
          {subCategory.subSubCategories?.map((subSubCategory: any, subSubCategoryIndex: any) => (
            <div
              key={subSubCategoryIndex}
              onClick={() => handleTextClick(subSubCategory.name)}
              style={{ cursor: 'pointer' }}
            >
              {subSubCategory.name}
              {showIconsFor === subSubCategory.name && (
                <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
                  <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                  <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
          ))}
        </td>
      </tr>
    ));
  })}
</tbody>


  </table>

  {popup && popup.type === "edit" && <EditPopup item={popup.item} onClose={closePopup} />}
  {popup && popup.type === "delete" && <DeletePopup item={popup.item} onClose={closePopup} />}
</div>

    );
  };
  
  export default TopCategories;