import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import { useDelete, useFetchByLoad, usePatch } from '../../contexts';
import { message, Upload, Button } from 'antd';

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
  const [selectedCategory, setSelectedCategory] = useState<{ categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number } | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [imageUpload, setImageUpload] = useState<File | null>(null); // For image upload

  const { fetch, data } = useFetchByLoad();
  const { edit } = usePatch();
  const { remove } = useDelete();

  useEffect(() => {
    fetch({ url: "getCategory" });
  }, []);

  const handleTextClick = (item: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number) => {
    setShowIconsFor(item);
    setSelectedCategory({ categoryIndex, subCategoryIndex, subSubCategoryIndex });
  };

  const handleImageClick = (categoryIndex: number) => {
    setShowIconsFor(`image-${categoryIndex}`);
    setSelectedCategory({ categoryIndex });
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
    setSelectedCategory(null);
  };

  const handleDeleteSelected = async () => {
    if (!selectedCategory) return;

    const url = '/deleteCategory';
    const categoryId = data?.categories[0]?._id;
    const payload: any = {
      id: categoryId,
      selectedCategory: selectedCategory.categoryIndex,
      selectedSubCategory: selectedCategory.subCategoryIndex,
      selectedSubSubCategory: selectedCategory.subSubCategoryIndex
    };

    try {
      await remove(url, payload);
      message.success("Selected category deleted successfully");
      fetch({ url: '/getCategory' });
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Error deleting category");
    }
    closePopup();
  };

  const handleEdit = async () => {
    const url = `/editCategory`;
    const categoryId = data?.categories[0]?._id;
    const formData = new FormData(); // Handle image upload

    if (imageUpload) {
      formData.append('image', imageUpload);
    }
    formData.append('name', editedName);

    try {
      await edit(url, formData);
      fetch({ url: "getCategory" });
      closePopup();
    } catch (error) {
      console.error("Error updating category:", error);
      message.error(`Error updating category`);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="my-2">Categories list</h3>

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
                  <td onClick={() => handleImageClick(categoryIndex)} style={{ cursor: 'pointer' }}>
                    {category.image ? (
                      <img src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
                    ) : (
                      <div>
                        <FaUpload />
                      </div>
                    )}
                    {showIconsFor === `image-${categoryIndex}` && (
                      <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
                        <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                      </div>
                    )}
                  </td>
                  <td onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
                    {category.name}
                    {showIconsFor === category.name && (
                      <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
                        <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            }

            return category.subCategories.map((subCategory: any, subCategoryIndex: any) => (
              <tr key={`${categoryIndex}-${subCategoryIndex}`}>
                {subCategoryIndex === 0 && (
                  <>
                    <td rowSpan={category.subCategories.length} onClick={() => handleImageClick(categoryIndex)} style={{ cursor: 'pointer' }}>
                      {category.image ? (
                        <img src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
                      ) : (
                        <div>
                          <FaUpload />
                        </div>
                      )}
                      {showIconsFor === `image-${categoryIndex}` && (
                        <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
                          <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                          <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </td>
                    <td rowSpan={category.subCategories.length} onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
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
                <td onClick={() => handleTextClick(subCategory.name, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }}>
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
                      onClick={() => handleTextClick(subSubCategory.name, categoryIndex, subCategoryIndex, subSubCategoryIndex)}
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

      {popup && popup.type === "edit" && (
        <EditPopup
          item={popup.item}
          onClose={closePopup}
          onSave={handleEdit}
          editedName={editedName}
          setEditedName={setEditedName}
        >
          <Upload beforeUpload={(file) => { setImageUpload(file); return false; }}>
            <Button>Click to Upload New Image</Button>
          </Upload>
        </EditPopup>
      )}
      {popup && popup.type === "delete" && (
        <DeletePopup
          item={popup.item}
          onClose={closePopup}
          onDelete={handleDeleteSelected}
        />
      )}
    </div>
  );
};

export default TopCategories;
