// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
// import EditPopup from './EditPopup';
// import DeletePopup from './DeletePopup';
// import { useDelete, useFetchByLoad, usePatch } from '../../contexts';
// import { message, Upload, Button } from 'antd';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../firebase/firebase';

// interface SubSubCategory {
//   name: string;
// }

// interface SubCategory {
//   name: string;
//   subSubCategories?: SubSubCategory[];
// }

// interface Category {
//   name: string;
//   image: string;
//   subCategories: SubCategory[];
// }

// const TopCategories: React.FC = () => {
//   const [showIconsFor, setShowIconsFor] = useState<string | null>(null);
//   const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string; isImageEdit?: boolean } | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<{ categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number } | null>(null);
//   const [editedName, setEditedName] = useState<string>('');
//   const [imageUpload, setImageUpload] = useState<File | null>(null); // For image upload

//   const { fetch, data } = useFetchByLoad();
//   const { edit } = usePatch();
//   const { remove } = useDelete();

//   useEffect(() => {
//     fetch({ url: "getCategory" });
//   }, []);

//   const handleTextClick = (item: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number) => {
//     setShowIconsFor(item);
//     setSelectedCategory({ categoryIndex, subCategoryIndex, subSubCategoryIndex });
//   };

//   const handleImageClick = (categoryIndex: number) => {
//     setShowIconsFor(`image-${categoryIndex}`);
//     setSelectedCategory({ categoryIndex });
//   };

//   const handleEditClick = () => {
//     if (showIconsFor) {
//       const isImageEdit = showIconsFor.startsWith('image-');
      
//       // Open the edit popup based on user action, like clicking an icon
//       setPopup({ type: 'edit', item: showIconsFor, isImageEdit });
      
//       // If there's an uploaded image, you can update the form with the new image
//       if (isImageEdit && imageUpload) {
//         console.log('Editing image with URL:', imageUpload);
//         // Handle the image edit logic here
//       }
//     }
//   };
  

//   const handleDeleteClick = () => {
//     if (showIconsFor) setPopup({ type: 'delete', item: showIconsFor });
//   };

//   const closePopup = () => {
//     setPopup(null);
//     setShowIconsFor(null);
//     setSelectedCategory(null);
//     setEditedName('');
//     setImageUpload(null);
//   };

//   const handleDeleteSelected = async () => {
//     if (!selectedCategory) return;

//     const url = '/deleteCategory';
//     const categoryId = data?.categories[0]?._id;
//     const payload: any = {
//       id: categoryId,
//       selectedCategory: selectedCategory.categoryIndex,
//       selectedSubCategory: selectedCategory.subCategoryIndex,
//       selectedSubSubCategory: selectedCategory.subSubCategoryIndex
//     };

//     try {
//       await remove(url, payload);
//       message.success("Selected category deleted successfully");
//       fetch({ url: '/getCategory' });
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       message.error("Error deleting category");
//     }
//     closePopup();
//   };

//   // const handleEdit = async () => {
//   //   if (!selectedCategory) return;
  
//   //   const url = `/editCategory`;
//   //   const categoryId = data?.categories[0]?._id;
//   //   // const updatedFields = new FormData(); // Handle image and data
  
//   //   // // Prepare and append each field directly, not in an updatedFields object
//   //   // updatedFields.append('id', categoryId); // Assuming 'categoryId' is needed as a separate field
//   //   // updatedFields.append('name', editedName); // The category name
//   //   // //@ts-ignore
//   //   // updatedFields.append('selectedCategories', selectedCategory?.categoryIndex);
    
//   //   // // Append subcategory only if available
//   //   // if (selectedCategory?.subCategoryIndex !== undefined) {
//   //   //   //@ts-ignore
//   //   //   updatedFields.append('selectedSubCategories', selectedCategory.subCategoryIndex);
//   //   // }
  
//   //   // // Append sub-subcategory only if available
//   //   // if (selectedCategory?.subSubCategoryIndex !== undefined) {
//   //   //   //@ts-ignore
//   //   //   updatedFields.append('selectedSubSubCategories', selectedCategory.subSubCategoryIndex);
//   //   // }
  
//   //   // // Append image if it's being updated
//   //   // if (popup?.isImageEdit && imageUpload) {
//   //   //   updatedFields.append('image', imageUpload);
//   //   // }
//   //   const updatedFields ={id:categoryId,name:editedName,selectedCategories:selectedCategory?.categoryIndex,selectedSubCategories:selectedCategory.subCategoryIndex,selectedSubSubCategories:selectedCategory.subSubCategoryIndex}
//   //   try {
//   //     await edit(url,updatedFields );  
//   //     message.success("Category updated successfully");
//   //     fetch({ url: "getCategory" });
//   //     closePopup();
//   //   } catch (error) {
//   //     console.error("Error updating category:", error);
//   //     message.error(`Error updating category`);
//   //   }
//   // };
  
//   const handleEdit = async () => {
//     if (!selectedCategory) return;
//     const categoryId = data?.categories[0]?._id;
//     const url = `/editCategory`;
    
  
//     // Prepare the payload directly as a JSON object, not FormData
//     const updatedFields = {
//       id: categoryId,
//       name: editedName,
//       selectedCategory: selectedCategory?.categoryIndex,
//       selectedSubCategory: selectedCategory?.subCategoryIndex,
//       selectedSubSubCategory: selectedCategory?.subSubCategoryIndex,
//     };

//     if (popup?.isImageEdit && imageUpload) {
//       //@ts-ignore
//       updatedFields.image = imageUpload;  // Add the uploaded image URL to the payload
//     }
  
//     try {
//       // Send the payload as JSON
//       await edit(url, {updatedFields}); 
//       message.success("Category updated successfully");
//       fetch({ url: "getCategory" });
//       closePopup();
//     } catch (error) {
//       console.error("Error updating category:", error);
//       message.error("Error updating category");
//     }
//   };
  

//   // const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (event.target.files) {
//   //     const file = event.target.files[0]; // Assuming a single file upload
//   //     const storageRef = ref(storage, `images/${file.name}`);
//   //     await uploadBytes(storageRef, file);
//   //     const url = await getDownloadURL(storageRef);
      
//   //     // Store the image URL in the state
//   //     //@ts-ignore
//   //     setImageUpload(url);
//   //     console.log('setImageUpload',imageUpload)
//   //   }
//   // };
  
//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, categoryIndex: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0]; // Assuming single image upload
//       const storageRef = ref(storage, `images/${file.name}`);
  
//       try {
//         await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(storageRef);
        
//         //@ts-ignore
//         setImageUpload(url);
//         console.log('Uploaded image URL:', url);
//         handleEdit();
 
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         message.error("Error uploading image");
//       }
//     }
//   };
  
  
  

//   return (
//     <div className="container mt-5">
//       <h3 className="my-2">Categories list</h3>

//       <table className="table table-striped table-bordered table-hover mt-3">
//         <thead className="thead-dark">
//           <tr>
//             <th>Category Image</th>
//             <th>Category Name</th>
//             <th>Sub-Category Name</th>
//             <th>Sub-Sub Categories</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.categories[0]?.categories?.map((category: any, categoryIndex: any) => {
//             const hasSubCategories = category.subCategories && category.subCategories.length > 0;

//             if (!hasSubCategories) {
//               return (
//                 <tr key={categoryIndex}>
//                   <td style={{ cursor: 'pointer' }}>
//                     {category.image ? (
//                       <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
//                     ) : (
//                       <div>
//                         <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg d-flex align-items-center justify-content-center" style={{ height: '9rem', borderColor: '#ced4da', cursor: 'pointer' }}>
//                           <input
//                             type="file"
//                             className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                             onChange={(e) => handleImageChange(e, categoryIndex)}
//                           />
//                           <div className="text-center d-flex flex-column align-items-center">
//                             <FaUpload className="text-success mb-2" style={{ fontSize: '3rem' }} />
//                             <span className="text-muted">Drag and drop file to upload</span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {showIconsFor === `image-${categoryIndex}` && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                   <td onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
//                     {category.name}
//                     {showIconsFor === category.name && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             }

//             return category.subCategories.map((subCategory: any, subCategoryIndex: any) => (
//               <tr key={`${categoryIndex}-${subCategoryIndex}`}>
//                 {subCategoryIndex === 0 && (
//                   <>
//                     <td rowSpan={category.subCategories.length} style={{ cursor: 'pointer' }}>
//                       {category.image ? (
//                         <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
//                       ) : (
//                         <div>
//                           <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg d-flex align-items-center justify-content-center" style={{ height: '9rem', borderColor: '#ced4da', cursor: 'pointer' }}>
//                             <input
//                               type="file"
//                               className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                               onChange={(e) => handleImageChange(e, categoryIndex)}
//                             />
//                             <div className="text-center d-flex flex-column align-items-center">
//                               <FaUpload className="text-success mb-2" style={{ fontSize: '2rem' }} />
//                               <span className="text-muted" >Drag and drop file to upload</span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       {showIconsFor === `image-${categoryIndex}` && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                     <td rowSpan={category.subCategories.length} onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
//                       {category.name}
//                       {showIconsFor === category.name && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                   </>
//                 )}
//                 <td onClick={() => handleTextClick(subCategory.name, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }}>
//                   {subCategory.name}
//                   {showIconsFor === subCategory.name && (
//                     <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                       <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                       <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                     </div>
//                   )}
//                 </td>
//                 <td>
//                   {subCategory.subSubCategories?.map((subSubCategory: any, subSubCategoryIndex: any) => (
//                     <div
//                       key={subSubCategoryIndex}
//                       onClick={() => handleTextClick(subSubCategory.name, categoryIndex, subCategoryIndex, subSubCategoryIndex)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       {subSubCategory.name}
//                       {showIconsFor === subSubCategory.name && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ));
//           })}
//         </tbody>
//       </table>

//       {popup && popup.type === "edit" && (
//         <EditPopup
//           item={popup.item}
//           onClose={closePopup}
//           onSave={handleEdit}
//           editedName={editedName}
//           setEditedName={setEditedName}
//           isImageEdit={popup.isImageEdit}
//         >
//           {/* Only show the image upload component if it's an image edit */}
//           {popup.isImageEdit && (
//             <Upload beforeUpload={(file) => { setImageUpload(file); return false; }}>
//               <Button>Click to Upload New Image</Button>
//             </Upload>
//           )}
//         </EditPopup>
//       )}

//       {popup && popup.type === "delete" && (
//         <DeletePopup
//           item={popup.item}
//           onClose={closePopup}
//           onDelete={handleDeleteSelected}
//         />
//       )}
//     </div>
//   );
// };

// export default TopCategories;



// ----NEW CODE ADDED-----
// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
// import EditPopup from './EditPopup';
// import DeletePopup from './DeletePopup';
// import { useDelete, useFetchByLoad, usePatch } from '../../contexts';
// import { message, Upload, Button } from 'antd';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../firebase/firebase';

// interface SubSubCategory {
//   name: string;
// }

// interface SubCategory {
//   name: string;
//   subSubCategories?: SubSubCategory[];
// }

// interface Category {
//   name: string;
//   image: string;
//   subCategories: SubCategory[];
// }

// const TopCategories: React.FC = () => {
//   const [showIconsFor, setShowIconsFor] = useState<string | null>(null);
//   const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string; isImageEdit?: boolean } | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<{ categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number } | null>(null);
//   const [editedName, setEditedName] = useState<string>('');
//   const [imageUpload, setImageUpload] = useState<File | null>(null); // For image upload

//   const { fetch, data } = useFetchByLoad();
//   const { edit } = usePatch();
//   const { remove } = useDelete();

//   useEffect(() => {
//     fetch({ url: "getCategory" });
//   }, []);

//   const handleTextClick = (item: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number) => {
//     setShowIconsFor(item);
//     setSelectedCategory({ categoryIndex, subCategoryIndex, subSubCategoryIndex });
//   };

//   const handleImageClick = (categoryIndex: number) => {
//     setShowIconsFor(`image-${categoryIndex}`);
//     setSelectedCategory({ categoryIndex });
//   };

//   const handleEditClick = () => {
//     if (showIconsFor) {
//       const isImageEdit = showIconsFor.startsWith('image-');
      
//       // Open the edit popup based on user action, like clicking an icon
//       setPopup({ type: 'edit', item: showIconsFor, isImageEdit });
      
//       // If there's an uploaded image, you can update the form with the new image
//       if (isImageEdit && imageUpload) {
//         console.log('Editing image with URL:', imageUpload);
//         // Handle the image edit logic here
//       }
//     }
//   };
  

//   const handleDeleteClick = () => {
//     if (showIconsFor) setPopup({ type: 'delete', item: showIconsFor });
//   };

//   const closePopup = () => {
//     setPopup(null);
//     setShowIconsFor(null);
//     setSelectedCategory(null);
//     setEditedName('');
//     setImageUpload(null);
//   };

//   const handleDeleteSelected = async () => {
//     if (!selectedCategory) return;

//     const url = '/deleteCategory';
//     const categoryId = data?.categories[0]?._id;
//     const payload: any = {
//       id: categoryId,
//       selectedCategory: selectedCategory.categoryIndex,
//       selectedSubCategory: selectedCategory.subCategoryIndex,
//       selectedSubSubCategory: selectedCategory.subSubCategoryIndex
//     };

//     try {
//       await remove(url, payload);
//       message.success("Selected category deleted successfully");
//       fetch({ url: '/getCategory' });
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       message.error("Error deleting category");
//     }
//     closePopup();
//   };

//   const handleEdit = async () => {
//     if (showIconsFor && selectedCategory) {
//       const isImageEdit = showIconsFor.startsWith('image-');
  
//       const updatedFields: any = {
//         id: data?.categories[0]?._id, // Category document ID
//         selectedCategory: selectedCategory.categoryIndex, // Send the selected category index
//       };
  
//       // If editing an image, only update the image, not the name
//       if (isImageEdit && imageUpload) {
//         try {
//           const storageRef = ref(storage, `images/${imageUpload.name}`);
//           await uploadBytes(storageRef, imageUpload);
//           const imageUrl = await getDownloadURL(storageRef);
//   console.log("handleEditimageUrl:-",imageUrl)
//           updatedFields.image = imageUrl; // Add the uploaded image URL to the payload
  
//           // Send the API request to update the image
//           await edit('/editCategory', { updatedFields });
//           message.success("Category image updated successfully");
//           fetch({ url: "getCategory" });
//           closePopup();
//         } catch (error) {
//           console.error("Error uploading image:", error);
//           message.error("Error uploading image");
//           return;
//         }
//       } else {
//         // Handle name editing (same as before)
//         if (selectedCategory.subCategoryIndex === undefined && selectedCategory.subSubCategoryIndex === undefined) {
//           updatedFields.name = editedName; // Main category name edit
//           updatedFields.selectedCategory = selectedCategory.categoryIndex;
//         }
  
//         // Subcategory name editing
//         if (selectedCategory.subCategoryIndex !== undefined && selectedCategory.subSubCategoryIndex === undefined) {
//           updatedFields.name = editedName; // Subcategory name edit
//           updatedFields.selectedCategory = selectedCategory.categoryIndex;
//           updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
//         }
  
//         // Subsubcategory name editing
//         if (selectedCategory.subSubCategoryIndex !== undefined) {
//           updatedFields.name = editedName; // Subsubcategory name edit
//           updatedFields.selectedCategory = selectedCategory.categoryIndex;
//           updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
//           updatedFields.selectedSubSubCategory = selectedCategory.subSubCategoryIndex;
//         }
  
//         try {
//           await edit('/editCategory', { updatedFields });
//           message.success("Category updated successfully");
//           fetch({ url: "getCategory" });
//           closePopup();
//         } catch (error) {
//           console.error("Error updating category:", error);
//           message.error("Error updating category");
//         }
//       }
//     }
//   };
    
//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, categoryIndex: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0]; // Assuming single image upload
//       const storageRef = ref(storage, `images/${file.name}`);
  
//       try {
//         // Upload image to Firebase
//         await uploadBytes(storageRef, file);
//         const imageUrl = await getDownloadURL(storageRef); // Get image URL
//         console.log("imageUrl:-",imageUrl)
  
//         // Prepare payload for the edit request
//         const updatedFields: any = {
//           id: data?.categories[0]?._id, // Category document ID
//           selectedCategory: categoryIndex, // Send the selected category index
//           image: imageUrl, // Add the uploaded image URL to the payload
//         };
  
//         // Send the API request to update the image in the database
//         await edit('/editCategory', {updatedFields});
//         message.success("Category image updated successfully");
  
//         // Fetch updated categories and reset states
//         fetch({ url: "getCategory" });
//         closePopup();
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         message.error("Error uploading image");
//       }
//     }
//   };
    

//   return (
//     <div className="container mt-5">
//       <h3 className="my-2">Categories list</h3>

//       <table className="table table-striped table-bordered table-hover mt-3">
//         <thead className="thead-dark">
//           <tr>
//             <th>Category Image</th>
//             <th>Category Name</th>
//             <th>Sub-Category Name</th>
//             <th>Sub-Sub Categories</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.categories[0]?.categories?.map((category: any, categoryIndex: any) => {
//             const hasSubCategories = category.subCategories && category.subCategories.length > 0;

//             if (!hasSubCategories) {
//               return (
//                 <tr key={categoryIndex}>
//                   <td style={{ cursor: 'pointer' }}>
//                     {category.image ? (
//                       <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
//                     ) : (
//                       <div>
//                         <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg d-flex align-items-center justify-content-center" style={{ height: '9rem', borderColor: '#ced4da', cursor: 'pointer' }}>
//                           <input
//                             type="file"
//                             className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                             onChange={(e) => handleImageChange(e, categoryIndex)}
//                           />
//                           <div className="text-center d-flex flex-column align-items-center">
//                             <FaUpload className="text-success mb-2" style={{ fontSize: '3rem' }} />
//                             <span className="text-muted">Drag and drop file to upload</span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {showIconsFor === `image-${categoryIndex}` && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                   <td onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
//                     {category.name}
//                     {showIconsFor === category.name && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             }

//             return category.subCategories.map((subCategory: any, subCategoryIndex: any) => (
//               <tr key={`${categoryIndex}-${subCategoryIndex}`}>
//                 {subCategoryIndex === 0 && (
//                   <>
//                     <td rowSpan={category.subCategories.length} style={{ cursor: 'pointer' }}>
//                       {category.image ? (
//                         <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: "5rem", objectFit: 'cover' }} />
//                       ) : (
//                         <div>
//                           <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg d-flex align-items-center justify-content-center" style={{ height: '9rem', borderColor: '#ced4da', cursor: 'pointer' }}>
//                             <input
//                               type="file"
//                               className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                               onChange={(e) => handleImageChange(e, categoryIndex)}
//                             />
//                             <div className="text-center d-flex flex-column align-items-center">
//                               <FaUpload className="text-success mb-2" style={{ fontSize: '2rem' }} />
//                               <span className="text-muted" >Drag and drop file to upload</span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       {showIconsFor === `image-${categoryIndex}` && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                     <td rowSpan={category.subCategories.length} onClick={() => handleTextClick(category.name, categoryIndex)} style={{ cursor: 'pointer' }}>
//                       {category.name}
//                       {showIconsFor === category.name && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                   </>
//                 )}
//                 <td onClick={() => handleTextClick(subCategory.name, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }}>
//                   {subCategory.name}
//                   {showIconsFor === subCategory.name && (
//                     <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                       <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                       <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                     </div>
//                   )}
//                 </td>
//                 <td>
//                   {subCategory.subSubCategories?.map((subSubCategory: any, subSubCategoryIndex: any) => (
//                     <div
//                       key={subSubCategoryIndex}
//                       onClick={() => handleTextClick(subSubCategory.name, categoryIndex, subCategoryIndex, subSubCategoryIndex)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       {subSubCategory.name}
//                       {showIconsFor === subSubCategory.name && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: "white", padding: "3px", borderRadius: "5px" }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ));
//           })}
//         </tbody>
//       </table>

//       {popup && popup.type === "edit" && (
//         <EditPopup
//           item={popup.item}
//           onClose={closePopup}
//           onSave={handleEdit}
//           editedName={editedName}
//           setEditedName={setEditedName}
//           isImageEdit={popup.isImageEdit}
//         >
//           {/* Only show the image upload component if it's an image edit */}
//           {popup.isImageEdit && (
//             <Upload beforeUpload={(file) => { setImageUpload(file); return false; }}>
//               <Button>Click to Upload New Image</Button>
//             </Upload>
//           )}
//         </EditPopup>
//       )}

//       {popup && popup.type === "delete" && (
//         <DeletePopup
//           item={popup.item}
//           onClose={closePopup}
//           onDelete={handleDeleteSelected}
//         />
//       )}
//     </div>
//   );
// };

// export default TopCategories;


// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
// import EditPopup from './EditPopup';
// import DeletePopup from './DeletePopup';
// import { useFetchByLoad, usePatch } from '../../contexts';
// import { message, Upload, Button } from 'antd';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../firebase/firebase';
// import axios from 'axios';

// interface SubSubCategory {
//   name: string;
// }

// interface SubCategory {
//   name: string;
//   subSubCategories?: SubSubCategory[];
// }

// interface Category {
//   name: string;
//   image: string;
//   subCategories: SubCategory[];
// }

// const TopCategories: React.FC = () => {
//   const [showIconsFor, setShowIconsFor] = useState<string | null>(null);
//   const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string; isImageEdit?: boolean } | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<{ categoryId: string; categoryIndex: number; subCategoryIndex?: number; subSubCategoryIndex?: number, removeImageOnly?:boolean } | null>(null);
//   const [editedName, setEditedName] = useState<string>(''); // For editing category names
//   const [imageUpload, setImageUpload] = useState<File | null>(null); // For image uploads

//   const { fetch, data } = useFetchByLoad();
//   const { edit } = usePatch();

//   useEffect(() => {
//     fetch({ url: 'getCategory' });
//   }, []);

//   const handleTextClick = (categoryId: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number) => {
//     setShowIconsFor(categoryId);
//     setSelectedCategory({ categoryId, categoryIndex, subCategoryIndex, subSubCategoryIndex });
//   };

//   const handleImageClick = (categoryIndex: number) => {
//     setShowIconsFor(`image-${categoryIndex}`);
//     setSelectedCategory({ categoryId: data?.categories[0].categories[categoryIndex]._id, categoryIndex });
//   };

//   const handleEditClick = () => {
//     if (showIconsFor) {
//       const isImageEdit = showIconsFor.startsWith('image-');
//       setPopup({ type: 'edit', item: showIconsFor, isImageEdit });
//     }
//   };

//   const handleDeleteClick = (categoryId: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number,removeImageOnly?:boolean) => {
//     setPopup({ type: 'delete', item: categoryId });
//     setSelectedCategory({ categoryId, categoryIndex, subCategoryIndex, subSubCategoryIndex,removeImageOnly });
//   };

//   const handleDeleteSelected = async () => {
//     if (!selectedCategory) return;

//     const requestBody = {
//       id: data?.categories[0]?._id, // Document ID
//       categoryId: selectedCategory.categoryId, // Category, Subcategory or SubSubcategory ID
//       removeImageOnly:selectedCategory.removeImageOnly, // Full deletion, not just image
//     };

//     try {
//       const response = await axios.post('https://api.ioready.io/deleteCategory', requestBody);
//       if (response.status === 200) {
//         message.success('Category deleted successfully');
//         fetch({ url: 'getCategory' });
//       }
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       message.error('Error deleting category');
//     }
//     closePopup();
//   };

//   const handleEdit = async () => {
//     if (!showIconsFor || !selectedCategory) return;

//     const isImageEdit = showIconsFor.startsWith('image-');
//     const updatedFields: any = {
//       id: data?.categories[0]?._id, // Document ID
//       selectedCategory: selectedCategory.categoryIndex, // Send the selected category index
//     };

//     if (isImageEdit && imageUpload) {
//       try {
//         const storageRef = ref(storage, `images/${imageUpload.name}`);
//         await uploadBytes(storageRef, imageUpload);
//         const imageUrl = await getDownloadURL(storageRef);

//         updatedFields.image = imageUrl;

//         await edit('/editCategory', { updatedFields });
//         message.success('Category image updated successfully');
//         fetch({ url: 'getCategory' });
//         closePopup();
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         message.error('Error uploading image');
//       }
//     } else {
//       if (selectedCategory.subCategoryIndex === undefined && selectedCategory.subSubCategoryIndex === undefined) {
//         updatedFields.name = editedName;
//       } else if (selectedCategory.subCategoryIndex !== undefined && selectedCategory.subSubCategoryIndex === undefined) {
//         updatedFields.name = editedName;
//         updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
//       } else if (selectedCategory.subSubCategoryIndex !== undefined) {
//         updatedFields.name = editedName;
//         updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
//         updatedFields.selectedSubSubCategory = selectedCategory.subSubCategoryIndex;
//       }

//       try {
//         await edit('/editCategory', { updatedFields });
//         message.success('Category updated successfully');
//         fetch({ url: 'getCategory' });
//         closePopup();
//       } catch (error) {
//         console.error('Error updating category:', error);
//         message.error('Error updating category');
//       }
//     }
//   };

//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, categoryIndex: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       const storageRef = ref(storage, `images/${file.name}`);

//       try {
//         await uploadBytes(storageRef, file);
//         const imageUrl = await getDownloadURL(storageRef);

//         const updatedFields = {
//           id: data?.categories[0]?._id,
//           selectedCategory: categoryIndex,
//           image: imageUrl,
//         };

//         await edit('/editCategory', { updatedFields });
//         message.success('Category image updated successfully');
//         fetch({ url: 'getCategory' });
//         closePopup();
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         message.error('Error uploading image');
//       }
//     }
//   };

//   const closePopup = () => {
//     setPopup(null);
//     setShowIconsFor(null);
//     setSelectedCategory(null);
//     setEditedName('');
//     setImageUpload(null);
//   };

//   return (
//     <div className="container mt-5">
//       <h3 className="my-2">Categories List</h3>
//       <table className="table table-striped table-bordered table-hover mt-3">
//         <thead className="thead-dark">
//           <tr>
//             <th>Category Image</th>
//             <th>Category Name</th>
//             <th>Sub-Category Name</th>
//             <th>Sub-Sub Categories</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.categories[0]?.categories?.map((category: any, categoryIndex: any) => {
//             const hasSubCategories = category.subCategories && category.subCategories.length > 0;

//             if (!hasSubCategories) {
//               return (
//                 <tr key={categoryIndex}>
//                   <td>
//                     {category.image ? (
//                       <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: '5rem', objectFit: 'cover' }} />
//                     ) : (
//                       <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg">
//                         <input
//                           type="file"
//                           className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                           onChange={(e) => handleImageChange(e, categoryIndex)}
//                         />
//                         <div className="text-center d-flex flex-column align-items-center">
//                           <FaUpload className="text-success mb-2" style={{ fontSize: '3rem' }} />
//                           <span className="text-muted">Drag and drop file to upload</span>
//                         </div>
//                       </div>
//                     )}
//                     {showIconsFor === `image-${categoryIndex}` && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex,undefined, undefined, true)} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                   <td onClick={() => handleTextClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }}>
//                     {category.name}
//                     {showIconsFor === category._id && (
//                       <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                         <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                         <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             }

//             return category.subCategories.map((subCategory: any, subCategoryIndex: any) => (
//               <tr key={`${categoryIndex}-${subCategoryIndex}`}>
//                 {subCategoryIndex === 0 && (
//                   <>
//                     <td rowSpan={category.subCategories.length}>
//                       {category.image ? (
//                         <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: '5rem', objectFit: 'cover' }} />
//                       ) : (
//                         <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg">
//                           <input
//                             type="file"
//                             className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
//                             onChange={(e) => handleImageChange(e, categoryIndex)}
//                           />
//                           <div className="text-center d-flex flex-column align-items-center">
//                             <FaUpload className="text-success mb-2" style={{ fontSize: '2rem' }} />
//                             <span className="text-muted">Drag and drop file to upload</span>
//                           </div>
//                         </div>
//                       )}
//                       {showIconsFor === `image-${categoryIndex}` && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                     <td rowSpan={category.subCategories.length} onClick={() => handleTextClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }}>
//                       {category.name}
//                       {showIconsFor === category._id && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </td>
//                   </>
//                 )}
//                 <td onClick={() => handleTextClick(subCategory._id, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }}>
//                   {subCategory.name}
//                   {showIconsFor === subCategory._id && (
//                     <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                       <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                       <FaTrash onClick={() => handleDeleteClick(subCategory._id, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }} />
//                     </div>
//                   )}
//                 </td>
//                 <td>
//                   {subCategory.subSubCategories?.map((subSubCategory: any, subSubCategoryIndex: any) => (
//                     <div key={subSubCategoryIndex} onClick={() => handleTextClick(subSubCategory._id, categoryIndex, subCategoryIndex, subSubCategoryIndex)} style={{ cursor: 'pointer' }}>
//                       {subSubCategory.name}
//                       {showIconsFor === subSubCategory._id && (
//                         <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
//                           <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
//                           <FaTrash onClick={() => handleDeleteClick(subSubCategory._id, categoryIndex, subCategoryIndex, subSubCategoryIndex)} style={{ cursor: 'pointer' }} />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ));
//           })}
//         </tbody>
//       </table>

//       {/* Edit Popup */}
//       {popup && popup.type === 'edit' && (
//         <EditPopup
//           item={popup.item}
//           onClose={closePopup}
//           onSave={handleEdit}
//           editedName={editedName}
//           setEditedName={setEditedName}
//           isImageEdit={popup.isImageEdit}
//         >
//           {popup.isImageEdit && (
//             <Upload beforeUpload={(file) => { setImageUpload(file); return false; }}>
//               <Button>Click to Upload New Image</Button>
//             </Upload>
//           )}
//         </EditPopup>
//       )}

//       {/* Delete Popup */}
//       {popup && popup.type === 'delete' && (
//         <DeletePopup
//           item={popup.item}
//           onClose={closePopup}
//           onDelete={handleDeleteSelected}
//         />
//       )}
//     </div>
//   );
// };

// export default TopCategories;


import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import { useFetchByLoad, usePatch } from '../../contexts';
import { message, Upload, Button } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import axios from 'axios';

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
  const [popup, setPopup] = useState<{ type: 'edit' | 'delete'; item: string; isImageEdit?: boolean } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{ categoryId: string; categoryIndex: number; subCategoryIndex?: number; subSubCategoryIndex?: number, removeImageOnly?:boolean } | null>(null);
  const [editedName, setEditedName] = useState<string>(''); // For editing category names
  const [imageUpload, setImageUpload] = useState<File | null>(null); // For image uploads

  const { fetch, data,loading } = useFetchByLoad();
  const { edit } = usePatch();

  useEffect(() => {
    fetch({ url: 'getCategory' });
  }, []);

  const handleTextClick = (item: string,categoryId: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number) => {
    setShowIconsFor(item);
    setSelectedCategory({ categoryId, categoryIndex, subCategoryIndex, subSubCategoryIndex });
  };

  const handleImageClick = (categoryIndex: number) => {
    setShowIconsFor(`image-${categoryIndex}`);
    setSelectedCategory({ categoryId: data?.categories[0].categories[categoryIndex]._id, categoryIndex });
  };

  const handleEditClick = () => {
    if (showIconsFor) {
      const isImageEdit = showIconsFor.startsWith('image-');
      setPopup({ type: 'edit', item: showIconsFor, isImageEdit });
    }
  };

  const handleDeleteClick = (categoryId: string, categoryIndex: number, subCategoryIndex?: number, subSubCategoryIndex?: number,removeImageOnly?:boolean) => {
    //@ts-ignore
    setPopup({ type: 'delete', item: showIconsFor });
    setSelectedCategory({ categoryId, categoryIndex, subCategoryIndex, subSubCategoryIndex,removeImageOnly });
  };

  const handleDeleteSelected = async () => {
    if (!selectedCategory) return;

    const requestBody = {
      id: data?.categories[0]?._id, // Document ID
      categoryId: selectedCategory.categoryId, // Category, Subcategory or SubSubcategory ID
      removeImageOnly:selectedCategory.removeImageOnly, // Full deletion, not just image
    };

    try {
      const response = await axios.post('https://api.ioready.io/deleteCategory', requestBody);
      if (response.status === 200) {
        message.success('Category deleted successfully');
        fetch({ url: 'getCategory' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Error deleting category');
    }
    closePopup();
  };

  const handleEdit = async () => {
    if (!showIconsFor || !selectedCategory) return;

    const isImageEdit = showIconsFor.startsWith('image-');
    const updatedFields: any = {
      id: data?.categories[0]?._id, // Document ID
      selectedCategory: selectedCategory.categoryIndex, // Send the selected category index
    };

    if (isImageEdit && imageUpload) {
      try {
        const storageRef = ref(storage, `images/${imageUpload.name}`);
        await uploadBytes(storageRef, imageUpload);
        const imageUrl = await getDownloadURL(storageRef);

        updatedFields.image = imageUrl;

        await edit('/editCategory', { updatedFields });
        message.success('Category image updated successfully');
        fetch({ url: 'getCategory' });
        closePopup();
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Error uploading image');
      }
    } else {
      if (selectedCategory.subCategoryIndex === undefined && selectedCategory.subSubCategoryIndex === undefined) {
        updatedFields.name = editedName;
      } else if (selectedCategory.subCategoryIndex !== undefined && selectedCategory.subSubCategoryIndex === undefined) {
        updatedFields.name = editedName;
        updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
      } else if (selectedCategory.subSubCategoryIndex !== undefined) {
        updatedFields.name = editedName;
        updatedFields.selectedSubCategory = selectedCategory.subCategoryIndex;
        updatedFields.selectedSubSubCategory = selectedCategory.subSubCategoryIndex;
      }

      try {
        await edit('/editCategory', { updatedFields });
        message.success('Category updated successfully');
        fetch({ url: 'getCategory' });
        closePopup();
      } catch (error) {
        console.error('Error updating category:', error);
        message.error('Error updating category');
      }
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, categoryIndex: number) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        const updatedFields = {
          id: data?.categories[0]?._id,
          selectedCategory: categoryIndex,
          image: imageUrl,
        };

        await edit('/editCategory', { updatedFields });
        message.success('Category image updated successfully');
        fetch({ url: 'getCategory' });
        closePopup();
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Error uploading image');
      }
    }
  };

  const closePopup = () => {
    setPopup(null);
    setShowIconsFor(null);
    setSelectedCategory(null);
    setEditedName('');
    setImageUpload(null);
  };

  return (
    <div className="container mt-5">
      <h3 className="my-2">Categories List</h3>
      <table className="table table-striped table-bordered table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Sub-Category Name</th>
            <th>Sub-Sub Categories</th>
          </tr>
        </thead>
        {loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
        <tbody>
          {data?.categories[0]?.categories?.map((category: any, categoryIndex: any) => {
            const hasSubCategories = category.subCategories && category.subCategories.length > 0;

            if (!hasSubCategories) {
              return (
                <tr key={categoryIndex}>
                  <td>
                    {category.image ? (
                      <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: '5rem', objectFit: 'cover' }} />
                    ) : (
                      <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg">
                        <input
                          type="file"
                          className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                          onChange={(e) => handleImageChange(e, categoryIndex)}
                        />
                        <div className="text-center d-flex flex-column align-items-center">
                          <FaUpload className="text-success mb-2" style={{ fontSize: '3rem' }} />
                          <span className="text-muted">Drag and drop file to upload</span>
                        </div>
                      </div>
                    )}
                    {showIconsFor === `image-${categoryIndex}` && (
                      <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                        <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex,undefined, undefined, true)} style={{ cursor: 'pointer' }} />
                      </div>
                    )}
                  </td>
                  <td onClick={() => handleTextClick(category.name ,category._id, categoryIndex)} style={{ cursor: 'pointer' }}>
                    {category.name}
                    {showIconsFor === category.name && (
                      <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                        <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
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
                    <td rowSpan={category.subCategories.length}>
                      {category.image ? (
                        <img onClick={() => handleImageClick(categoryIndex)} src={category.image} alt={category.name} style={{ height: '5rem', objectFit: 'cover' }} />
                      ) : (
                        <div className="file-upload position-relative w-100 p-3 border border-dashed rounded-lg">
                          <input
                            type="file"
                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                            onChange={(e) => handleImageChange(e, categoryIndex)}
                          />
                          <div className="text-center d-flex flex-column align-items-center">
                            <FaUpload className="text-success mb-2" style={{ fontSize: '2rem' }} />
                            <span className="text-muted">Drag and drop file to upload</span>
                          </div>
                        </div>
                      )}
                      {showIconsFor === `image-${categoryIndex}` && (
                        <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                          <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                          <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </td>
                    <td rowSpan={category.subCategories.length} onClick={() => handleTextClick(category.name,category._id, categoryIndex)} style={{ cursor: 'pointer' }}>
                      {category.name}
                      {showIconsFor === category.name && (
                        <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                          <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                          <FaTrash onClick={() => handleDeleteClick(category._id, categoryIndex)} style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </td>
                  </>
                )}
                <td onClick={() => handleTextClick(subCategory.name,subCategory._id, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }}>
                  {subCategory.name}
                  {showIconsFor === subCategory.name && (
                    <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                      <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                      <FaTrash onClick={() => handleDeleteClick(subCategory._id, categoryIndex, subCategoryIndex)} style={{ cursor: 'pointer' }} />
                    </div>
                  )}
                </td>
                <td>
                  {subCategory.subSubCategories?.map((subSubCategory: any, subSubCategoryIndex: any) => (
                    <div key={subSubCategoryIndex} onClick={() => handleTextClick(subSubCategory.name,subSubCategory._id, categoryIndex, subCategoryIndex, subSubCategoryIndex)} style={{ cursor: 'pointer' }}>
                      {subSubCategory.name}
                      {showIconsFor === subSubCategory.name && (
                        <div className='ms-1 shadow-lg' style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: 'white', padding: '3px', borderRadius: '5px' }}>
                          <FaEdit onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                          <FaTrash onClick={() => handleDeleteClick(subSubCategory._id, categoryIndex, subCategoryIndex, subSubCategoryIndex)} style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </td>
              </tr>
            ));
          })}
        </tbody>
              )}
      </table>

      {/* Edit Popup */}
      {popup && popup.type === 'edit' && (
        <EditPopup
          item={popup.item}
          onClose={closePopup}
          onSave={handleEdit}
          editedName={editedName}
          setEditedName={setEditedName}
          isImageEdit={popup.isImageEdit}
        >
          {popup.isImageEdit && (
            <Upload beforeUpload={(file) => { setImageUpload(file); return false; }}>
              <Button>Click to Upload New Image</Button>
            </Upload>
          )}
        </EditPopup>
      )}

      {/* Delete Popup */}
      {popup && popup.type === 'delete' && (
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
