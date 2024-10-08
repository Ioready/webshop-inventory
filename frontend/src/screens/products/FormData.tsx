// import React, { useState } from 'react';
// import { MultiSelectBox, InputBox, TextareaBox, SelectBox, ButtonBox } from "../../components/RenderFroms";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useFetch } from "../../contexts";
// import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
// import Select, { SingleValue } from 'react-select';
// import { Link } from "react-router-dom";
// import AddCategoryPopup from "./addcategory";
// import AddSubCategoryPopup from "./addsubcategory";
// import AddSubSubCategoryPopup from "./addsubsubcategory";
// import './category.css';

// interface OptionType {
//   value: string;
//   label: string;
//   index:number;
//   // _id: number;
// }

// const resource = "addCategory";
// const initialData = {
//   title: "",
//   description: "",
//   status: true,
//   sku: "",
//   language: "nl_NL",
//   categories: "",
//   subCategories: "",
//   subSubCategories: "",
//   images: [],
//   tags: " allow webshop",
//   weight: "",
//   taxValue: 21,
//   ean: "",
//   supplierRef: "",
//   brand: "",
//   size: "",
//   sizeMixed: "",
//   colors: "",
//   dogJacketType: "",
//   supplier: "",
//   dogJacketSize: "",
//   scanCode: "",
//   purchasePrice: "",
//   price: "",
//   platform: [],
// };

// export function FormData({ initialValues, handleUpdate, loading, categoryData }: any) {
//   const [imageFields, setImageFields] = useState(
//     initialValues?.edit ?
//       (initialValues.images.length > 0 ? initialValues.images.map((image: string, index: any) => ({ id: index + 1, value: image })) : [{ id: 1, value: "" }])
//       :
//       [{ id: 1, value: "" }]
//   );
//   const [selectedCategory, setSelectedCategory] = useState<number>(0);
//   const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
//   const [selectedPlatform, setSelectedPlatform] = useState(initialValues?.platform?.split(",") || []);
//   const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
//   const [isSubCategoryPopupOpen, setIsSubCategoryPopupOpen] = useState(false);
//   const [isSubSubCategoryPopupOpen, setIsSubSubCategoryPopupOpen] = useState(false);

//   const handleAddImageField = () => {
//     const newId = imageFields.length + 1;
//     setImageFields([...imageFields, { id: newId, value: "" }]);
//   };

//   const handleDeleteImageField = (idToRemove: any) => {
//     const updatedImageFields = imageFields.filter((field: any) => field.id !== idToRemove);
//     setImageFields(updatedImageFields);
//   };

//   const handlePlatformChange = (platform: string) => {
//     if (selectedPlatform.includes(platform)) {
//       setSelectedPlatform(selectedPlatform?.filter((p: string) => p !== platform));
//     } else {
//       setSelectedPlatform([...selectedPlatform, platform]);
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     status: Yup.boolean().required("Status is required"),
//     sku: Yup.number().required("SKU is required"),
//     language: Yup.string().required("Language is required"),
//     categories: Yup.string().required("Category is required"),
//     subCategories: Yup.string().required("Subcategory is required"),
//     subSubCategories: Yup.string().required("Subsubcategory is required"),
//     tags: Yup.string().required("Tag is required"),
//     price: Yup.string().required("Price is required"),
//     weight: Yup.number().required("Weight is required"),
//     taxValue: Yup.number().required("Tax is required"),
//     ean: Yup.number().required("EAN is required"),
//     supplierRef: Yup.string().required("Supplier Ref is required"),
//     brand: Yup.string().required("Brand is required"),
//     size: Yup.string().required("Size is required"),
//     colors: Yup.string().required("Color is required"),
//     supplier: Yup.string().required("Supplier is required"),
//   });

//   const formattedInitialValues = {
//     ...initialData,
//     ...initialValues,
//     categories: initialValues?.categories?.value || initialValues?.categories,
//     subCategories: initialValues?.subCategories?.value || initialValues?.subCategories,
//     subSubCategories: initialValues?.subSubCategories?.value || initialValues?.subSubCategories,
//   };

//   const handleSubmitt=(values:any)=>{
// // console.log('data',data)
// handleUpdate({
//   ...values,
//   sku: +values.sku,
//   weight: +values.weight,
//   taxValue: +values.taxValue,
//   ean: values.ean,
//   platform: selectedPlatform?.join(","),
//   // categories: selectedCategory,
//   // subCategories: selectedSubCategory,
// });
//   }

//   return (
//     <>
//       <Formik
//         initialValues={initialValues?.edit ? formattedInitialValues : initialData}
//         validationSchema={validationSchema}
//         onSubmit={async (values) => {
//           console.log('values',values)
//           handleUpdate({
//             ...values,
//             sku: +values.sku,
//             weight: +values.weight,
//             taxValue: +values.taxValue,
//             ean: values.ean,
//             platform: selectedPlatform?.join(","),
//             categories: selectedCategory,
//             subCategories: selectedSubCategory,
//           });
//         }}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
//           <div className="w-full p-3">
//             <div className="mb-4 d-flex" style={{ gap: "1rem" }}>
//               <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
//                 <input
//                   type="checkbox"
//                   onChange={() => handlePlatformChange('amazon')}
//                 />
//                 <label className="m-0">Amazon</label>
//               </div>
//               <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
//                 <input
//                   type="checkbox"
//                   onChange={() => handlePlatformChange('bol.com')}
//                 />
//                 <label className=" m-0">Bol.com</label>
//               </div>
//               <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
//                 <input
//                   type="checkbox"
//                   onChange={() => handlePlatformChange('webshop')}
//                 />
//                 <label className="m-0">Webshop</label>
//               </div>
//             </div>
//             <div className="mb-4">
//               <InputBox
//                 required={true}
//                 name="title"
//                 label="Title"
//                 placeholder="Enter Title"
//                 icon={<MdOutlineSubtitles />}
//               />
//             </div>
//             <div className="mb-4">
//               <TextareaBox
//                 required={true}
//                 name="description"
//                 label="Description"
//                 placeholder="Enter Description"
//               />
//             </div>
//             <div className="mb-4">
//               <InputBox
//                 required={true}
//                 name="sku"
//                 label="SKU"
//                 type="number"
//                 placeholder="Enter SKU"
//                 icon={<MdOutlineSubtitles />}
//               />
//             </div>
//             <div className="mb-4">
//               <InputBox
//                 required={true}
//                 name="language"
//                 label="Language"
//                 placeholder="Enter Language"
//                 icon={<MdOutlineSubtitles />}
//               />
//             </div>

//             <p className=' mb-1'>Main Category</p>
//             <div className="mb-2 d-flex w-100">
//               <Select
//               className=' w-100 me-1'
//               //@ts-ignore
//                 value={typeof values.categories === 'string'
//                   ? { value: values.categories, label: values.categories }
//                   : { value: values.categories.name, label: values.categories.name } // Assuming categories is an object
//                 }

//                 name="categories"
//                 options={categoryData?.categories[0]?.categories?.map((category: any,i:number) => ({
//                   value: category.name, // Use name instead of categories
//                   label: category.name ,// Use name instead of categories
//                   index:i
//                 })) || []}

//                 placeholder="Select Category"
//                 //@ts-ignore
//                 onChange={(option: SingleValue<OptionType>) => {
//                   setFieldValue('categories', option ? option.value : '');
//                   setSelectedCategory(option ? option?.index : 0);
//                   // setSelectedSubCategory(); // Reset subcategory when category changes
//                   setFieldValue('subCategories', ''); // Reset subcategory value in form
//                   setFieldValue('subSubCategories', ''); // Reset subsubcategory value in form
//                 }}
//               />

//               <div>
//                 <button
//                   type="button"
//                   className="btn border-1 btn-outline-secondary"
//                   onClick={() => setIsCategoryPopupOpen(true)}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             <p className=' mb-1'>Sub Category</p>
//             <div className="mb-2 d-flex w-100 z-3">
//               <Select
//                 value={values.subCategories && typeof values.subCategories === 'string'
//                   ? { value: values.subCategories, label: values.subCategories }
//                   : values.subCategories
//                 }
//                 className=' w-100 me-1'
//                 name="subCategories"
//                 options={categoryData?.categories[0]?.categories?.find((cat: any,i:number) => i === selectedCategory)?.subCategories?.map((subCategory: any,i:number) => ({
//                   value: subCategory.name, // Access the name property correctly
//                   label: subCategory.name,  // Access the name property correctly
//                   index:i
//                 })) || []}

//                 placeholder="Select Subcategory"
//                 onChange={(option: SingleValue<OptionType>) => {
//                   setFieldValue('subCategories', option ? option.value : '');
//                   //@ts-ignore
//                   setSelectedSubCategory(option ? option.index : 0);
//                   setFieldValue('subSubCategories', ''); // Reset subsubcategory value in form
//                 }}
//               />

//               <div>
//                 <button
//                   type="button"
//                   className="btn border-1 btn-outline-secondary"
//                   onClick={() => setIsSubCategoryPopupOpen(true)}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             <p className=' mb-1'>Sub Sub Category</p>
//             <div className="mb-2 d-flex w-100">
//               <Select
//                 value={values.subSubCategories && typeof values.subSubCategories === 'string'
//                   ? { value: values.subSubCategories, label: values.subSubCategories }
//                   : values.subSubCategories
//                 }
//                 name="subSubCategories"
//                 className=' w-100 me-1'
//                 options={categoryData?.categories[0]?.categories?.find((cat: any,i:number) => i === selectedCategory)?.subCategories?.find((subCat: any,i:number) => i === selectedSubCategory)?.subSubCategories?.map((subSubCategory: any) => ({
//                   value: subSubCategory.name, // Access the name property correctly
//                   label: subSubCategory.name  // Access the name property correctly
//                 })) || []}

//                 placeholder="Select Sub-subcategory"
//                 onChange={(option: SingleValue<OptionType>) => setFieldValue('subSubCategories', option ? option.value : '') }
//               />

//               <div>
//                 <button
//                   type="button"
//                   className="btn border-1 btn-outline-secondary"
//                   onClick={() => setIsSubSubCategoryPopupOpen(true)}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {imageFields.map((field:any, index:any) => (
//                         <div key={field.id} className="mb-4 flex items-center">
//                             <InputBox
//                                 name={`images[${index}]`}
//                                 label={`Image ${index + 1}`}
//                                 placeholder="Enter Image URL"
//                                 defaultValue={field.value}
//                                 icon={<MdOutlineSubtitles />}
//                             />
//                             {index === imageFields.length - 1 && (
//                                 <button type="button" className="btn btn-success" onClick={handleAddImageField}>
//                                     + Add Image
//                                 </button>
//                             )}
//                             {index !== 0 && (
//                                 <button type="button" className="btn btn-danger mx-3" onClick={() => handleDeleteImageField(field.id)}>
//                                     Delete
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="tags"
//                             label="Tag"
//                             placeholder="Enter Tag"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="weight"
//                             label="Weight"
//                             type="number"
//                             placeholder="Enter Weight"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="taxValue"
//                             label="Tax Value"
//                             type="number"
//                             placeholder="Enter Tax Value"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="ean"
//                             label="Ean"
//                             type="number"
//                             placeholder="Enter Ean"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="supplierRef"
//                             label="Supplier Ref"
//                             placeholder="Enter Supplier Ref"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="brand"
//                             label="Brand"
//                             placeholder="Enter Brand"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="size"
//                             label="Size"
//                             placeholder="Enter Size"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             // required={true}
//                             name="sizeMixed"
//                             label="Size Mixed"
//                             placeholder="Enter Size Mixed"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="colors"
//                             label="Color"
//                             placeholder="Enter Color"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             // required={true}
//                             name="dogJacketType"
//                             label="Dog Jacket Type"
//                             placeholder="Enter Dog Jacket Type"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="supplier"
//                             label="Supplier"
//                             placeholder="Enter Supplier"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             // required={true}
//                             name="dogJacketSize"
//                             label="Dog Jacket Size"
//                             placeholder="Enter Dog Jacket Size"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="scanCode"
//                             label="Scan Code"
//                             placeholder="Enter Scan Code"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="purchasePrice"
//                             label="Purchase Price"
//                             placeholder="Enter Purchase Price"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <InputBox
//                             required={true}
//                             name="price"
//                             label="Webshop Price"
//                             placeholder="Enter Webshop Price"
//                             icon={<MdOutlineSubtitles />}
//                         />
//                     </div>
//             {/* Add more fields as needed */}
//             <div className="d-flex">
//               <ButtonBox
//                 type="submit"
//                 value={loading ? "Please wait..." : initialValues?.edit ? "Update" : "Submit"}
//                 disabled={loading}
//                 onClick={()=>{console.log('ehe'); handleSubmitt(values)}}
//               />
//               <Link to="/categories" className="btn border-1 btn-outline-secondary w-100 ms-1">
//                 Cancel
//               </Link>
//             </div>
//           </div>
//         )}
//       </Formik>
//       {/* Category Popup */}
//       {isCategoryPopupOpen && <AddCategoryPopup item='Category' onClose={() => setIsCategoryPopupOpen(false)} />}
//       {/* Subcategory Popup */}
//       {isSubCategoryPopupOpen && <AddSubCategoryPopup selectedCategory={selectedCategory} item='Sub-Category' onClose={() => setIsSubCategoryPopupOpen(false)} />}
//       {/* Sub-subcategory Popup */}
//       {isSubSubCategoryPopupOpen && <AddSubSubCategoryPopup item='Sub-Sub Category' selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} onClose={() => setIsSubSubCategoryPopupOpen(false)} />}
//     </>
//   );
// }

import React, { useState } from "react";
import {
  MultiSelectBox,
  InputBox,
  TextareaBox,
  SelectBox,
  ButtonBox,
} from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "../../contexts";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import Select, { SingleValue } from "react-select";
import { Link } from "react-router-dom";
import AddCategoryPopup from "./addcategory";
import AddSubCategoryPopup from "./addsubcategory";
import AddSubSubCategoryPopup from "./addsubsubcategory";
import "./category.css";

import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import axios from "axios";

interface OptionType {
  value: string;
  label: string;
  index: number;
  // _id: number;
}

const resource = "addCategory";
const initialData = {
  title: "",
  description: "",
  status: true,
  sku: "",
  language: "nl_NL",
  categories: "",
  subCategories: "",
  subSubCategories: "",
  images: [],
  tags: " allow webshop",
  weight: "",
  taxValue: 21,
  ean: "",
  supplierRef: "",
  brand: "",
  size: "",
  sizeMixed: "",
  colors: "",
  dogJacketType: "",
  supplier: "",
  dogJacketSize: "",
  scanCode: "",
  purchasePrice: "",
  price: "",
  platform: [],
};

export function FormData({
  initialValues,
  handleUpdate,
  loading,
  categoryData,
}: any) {
  const [imageFields, setImageFields] = useState(
    initialValues?.edit
      ? initialValues.images.length > 0
        ? initialValues.images.map((image: string, index: any) => ({
            id: index + 1,
            value: image,
          }))
        : [{ id: 1, value: "" }]
      : [{ id: 1, value: "" }]
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState(
    initialValues?.platform?.split(",") || []
  );
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isSubCategoryPopupOpen, setIsSubCategoryPopupOpen] = useState(false);
  const [isSubSubCategoryPopupOpen, setIsSubSubCategoryPopupOpen] =
    useState(false);

  // const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialValues?.colors ? initialValues.colors.split(",") : []
  );
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch colors based on input change (e.g., "w" or "r")
  const fetchColors = async (query: string) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://api.ioready.io/colors?query=${query}`
        ); // Adjust the endpoint
        setColorOptions(response.data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    } else {
      setColorOptions([]); // Reset options if input is empty
    }
  };

  const handleAddImageField = () => {
    const newId = imageFields.length + 1;
    setImageFields([...imageFields, { id: newId, value: "" }]);
    console.log('handleDeleteImageField',imageFields)
  };

  const handleDeleteImageField = (idToRemove: any, setFieldValue: any) => {
    const updatedImageFields = imageFields.filter(
      (field: any) => field.id !== idToRemove
    );
    
    setImageFields([...updatedImageFields]);
  
    // Update Formik form values for the images
    const updatedImageValues = updatedImageFields.map((field: any) => field.value);
    setFieldValue("images", updatedImageValues);
  };
  

  const handlePlatformChange = (platform: string) => {
    if (selectedPlatform.includes(platform)) {
      setSelectedPlatform(
        selectedPlatform?.filter((p: string) => p !== platform)
      );
    } else {
      setSelectedPlatform([...selectedPlatform, platform]);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.boolean().required("Status is required"),
    sku: Yup.number().required("SKU is required"),
    language: Yup.string().required("Language is required"),
    categories: Yup.string().required("Category is required"),
    subCategories: Yup.string().required("Subcategory is required"),
    subSubCategories: Yup.string().required("Subsubcategory is required"),
    tags: Yup.string().required("Tag is required"),
    price: Yup.string().required("Price is required"),
    weight: Yup.number().required("Weight is required"),
    taxValue: Yup.number().required("Tax is required"),
    ean: Yup.number().required("EAN is required"),
    supplierRef: Yup.string().required("Supplier Ref is required"),
    brand: Yup.string().required("Brand is required"),
    size: Yup.string().required("Size is required"),
    colors: Yup.string().required("Color is required"),
    supplier: Yup.string().required("Supplier is required"),
  });

  const formattedInitialValues = {
    ...initialData,
    ...initialValues,
    categories: initialValues?.categories?.value || initialValues?.categories,
    subCategories:
      initialValues?.subCategories?.value || initialValues?.subCategories,
    subSubCategories:
      initialValues?.subSubCategories?.value || initialValues?.subSubCategories,
  };

  const handleSubmitt = (values: any) => {
    // console.log('data',data)
    handleUpdate({
      ...values,
      sku: +values.sku,
      weight: +values.weight,
      taxValue: +values.taxValue,
      ean: values.ean,
      platform: selectedPlatform?.join(","),
      colors: selectedColors.join(","),
      // categories: selectedCategory,
      // subCategories: selectedSubCategory,
    });
  };

  return (
    <>
      <Formik
        initialValues={
          initialValues?.edit ? formattedInitialValues : initialData
        }
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log("values", values);
          handleUpdate({
            ...values,
            sku: +values.sku,
            weight: +values.weight,
            taxValue: +values.taxValue,
            ean: values.ean,
            platform: selectedPlatform?.join(","),
            categories: selectedCategory,
            subCategories: selectedSubCategory,
            colors: selectedColors.join(","),
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <div className="w-full p-3">
            <div className="mb-4 d-flex" style={{ gap: "1rem" }}>
              <div
                className=" d-flex align-items-center"
                style={{ gap: "6px" }}
              >
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange("amazon")}
                />
                <label className="m-0">Amazon</label>
              </div>
              <div
                className=" d-flex align-items-center"
                style={{ gap: "6px" }}
              >
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange("bol.com")}
                />
                <label className=" m-0">Bol.com</label>
              </div>
              <div
                className=" d-flex align-items-center"
                style={{ gap: "6px" }}
              >
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange("webshop")}
                />
                <label className="m-0">Webshop</label>
              </div>
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="title"
                label="Title"
                placeholder="Enter Title"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <TextareaBox
                required={true}
                name="description"
                label="Description"
                placeholder="Enter Description"
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="sku"
                label="SKU"
                type="number"
                placeholder="Enter SKU"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="language"
                label="Language"
                placeholder="Enter Language"
                icon={<MdOutlineSubtitles />}
              />
            </div>

            <p className=" mb-1">Main Category</p>
            <div className="mb-2 d-flex w-100">
              <Select
                className=" w-100 me-1"
                //@ts-ignore
                value={
                  typeof values.categories === "string"
                    ? { value: values.categories, label: values.categories }
                    : {
                        value: values.categories.name,
                        label: values.categories.name,
                      } // Assuming categories is an object
                }
                name="categories"
                options={
                  categoryData?.categories[0]?.categories?.map(
                    (category: any, i: number) => ({
                      value: category.name, // Use name instead of categories
                      label: category.name, // Use name instead of categories
                      index: i,
                    })
                  ) || []
                }
                placeholder="Select Category"
                //@ts-ignore
                onChange={(option: SingleValue<OptionType>) => {
                  setFieldValue("categories", option ? option.value : "");
                  setSelectedCategory(option ? option?.index : 0);
                  // setSelectedSubCategory(); // Reset subcategory when category changes
                  setFieldValue("subCategories", ""); // Reset subcategory value in form
                  setFieldValue("subSubCategories", ""); // Reset subsubcategory value in form
                }}
              />

              <div>
                <button
                  type="button"
                  className="btn border-1 btn-outline-secondary"
                  onClick={() => setIsCategoryPopupOpen(true)}
                >
                  Add
                </button>
              </div>
            </div>

            <p className=" mb-1">Sub Category</p>
            <div className="mb-2 d-flex w-100 z-3">
              <Select
                value={
                  values.subCategories &&
                  typeof values.subCategories === "string"
                    ? {
                        value: values.subCategories,
                        label: values.subCategories,
                      }
                    : values.subCategories
                }
                className=" w-100 me-1"
                name="subCategories"
                options={
                  categoryData?.categories[0]?.categories
                    ?.find((cat: any, i: number) => i === selectedCategory)
                    ?.subCategories?.map((subCategory: any, i: number) => ({
                      value: subCategory.name, // Access the name property correctly
                      label: subCategory.name, // Access the name property correctly
                      index: i,
                    })) || []
                }
                placeholder="Select Subcategory"
                onChange={(option: SingleValue<OptionType>) => {
                  setFieldValue("subCategories", option ? option.value : "");
                  //@ts-ignore
                  setSelectedSubCategory(option ? option.index : 0);
                  setFieldValue("subSubCategories", ""); // Reset subsubcategory value in form
                }}
              />

              <div>
                <button
                  type="button"
                  className="btn border-1 btn-outline-secondary"
                  onClick={() => setIsSubCategoryPopupOpen(true)}
                >
                  Add
                </button>
              </div>
            </div>

            <p className=" mb-1">Sub Sub Category</p>
            <div className="mb-2 d-flex w-100">
              <Select
                value={
                  values.subSubCategories &&
                  typeof values.subSubCategories === "string"
                    ? {
                        value: values.subSubCategories,
                        label: values.subSubCategories,
                      }
                    : values.subSubCategories
                }
                name="subSubCategories"
                className=" w-100 me-1"
                options={
                  categoryData?.categories[0]?.categories
                    ?.find((cat: any, i: number) => i === selectedCategory)
                    ?.subCategories?.find(
                      (subCat: any, i: number) => i === selectedSubCategory
                    )
                    ?.subSubCategories?.map((subSubCategory: any) => ({
                      value: subSubCategory.name, // Access the name property correctly
                      label: subSubCategory.name, // Access the name property correctly
                    })) || []
                }
                placeholder="Select Sub-subcategory"
                onChange={(option: SingleValue<OptionType>) =>
                  setFieldValue("subSubCategories", option ? option.value : "")
                }
              />

              <div>
                <button
                  type="button"
                  className="btn border-1 btn-outline-secondary"
                  onClick={() => setIsSubSubCategoryPopupOpen(true)}
                >
                  Add
                </button>
              </div>
            </div>

            {imageFields.map((field: any, index: any) => (
              <div key={field.id} className="mb-4 flex items-center">
                <InputBox
                  name={`images[${index}]`}
                  label={`Image ${index + 1}`}
                  placeholder="Enter Image URL"
                  defaultValue={field.value}
                  icon={<MdOutlineSubtitles />}
                />
                {index === imageFields.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddImageField}
                  >
                    + Add Image
                  </button>
                )}
                {index !== 0 && (
                  <button
                    type="button"
                    className="btn btn-danger mx-3"
                    onClick={() => handleDeleteImageField(field.id, setFieldValue)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <div className="mb-4">
              <InputBox
                required={true}
                name="tags"
                label="Tag"
                placeholder="Enter Tag"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="weight"
                label="Weight"
                type="number"
                placeholder="Enter Weight"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="taxValue"
                label="Tax Value"
                type="number"
                placeholder="Enter Tax Value"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="ean"
                label="Ean"
                type="number"
                placeholder="Enter Ean"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="supplierRef"
                label="Supplier Ref"
                placeholder="Enter Supplier Ref"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="brand"
                label="Brand"
                placeholder="Enter Brand"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="size"
                label="Size"
                placeholder="Enter Size"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                // required={true}
                name="sizeMixed"
                label="Size Mixed"
                placeholder="Enter Size Mixed"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
           

              <label>Enter Colors</label>

              <div className="aon-inputicon-box">
                {/* <InputBox
                            required={true}
                            name="colors"
                            label="Color"
                            placeholder="Enter Color"
                            icon={<MdOutlineSubtitles />}
                        /> */}
                <Autocomplete
                  multiple
                  freeSolo // This allows users to add their own colors that aren't in the list
                  limitTags={4}
                  options={colorOptions} // Dynamically fetched colors
                  getOptionLabel={(option) => option} // Assuming the option is a simple string (color name)
                  value={selectedColors} // Selected colors
                  onChange={(event, newValue) => {
                    console.log(newValue, "newValue");
                    setSelectedColors(newValue); // Set selected colors
                  }}
                  inputValue={inputValue} // The current input value
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue); // Update the input value
                    fetchColors(newInputValue); // Fetch colors dynamically based on input
                  }}
                  renderInput={(params) => (
                    <div className="aon-inputicon-box">
                    <TextField
                      {...params}
                      // label="Colors"
                      className="form-control sf-form-control"
                      placeholder="Enter Color"
                    />
                    <span className="aon-input-icon"><MdOutlineSubtitles /></span>
                    </div>
                  )}
                  sx={{
                    width: "auto",
                    "& .MuiAutocomplete-endAdornment": {
                      display: "none", // Hide the end adornment (the clear and dropdown icon)
                    },
                  }} // Adjust width if needed
                />
              </div>
            </div>
            <div className="mb-4">
              <InputBox
                // required={true}
                name="dogJacketType"
                label="Dog Jacket Type"
                placeholder="Enter Dog Jacket Type"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="supplier"
                label="Supplier"
                placeholder="Enter Supplier"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                // required={true}
                name="dogJacketSize"
                label="Dog Jacket Size"
                placeholder="Enter Dog Jacket Size"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="scanCode"
                label="Scan Code"
                placeholder="Enter Scan Code"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="purchasePrice"
                label="Purchase Price"
                placeholder="Enter Purchase Price"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            <div className="mb-4">
              <InputBox
                required={true}
                name="price"
                label="Webshop Price"
                placeholder="Enter Webshop Price"
                icon={<MdOutlineSubtitles />}
              />
            </div>
            {/* Add more fields as needed */}
            <div className="d-flex">
              <ButtonBox
                type="submit"
                value={
                  loading
                    ? "Please wait..."
                    : initialValues?.edit
                    ? "Update"
                    : "Submit"
                }
                disabled={loading}
                onClick={() => {
                  console.log(values, "ehe");
                  handleSubmitt(values);
                }}
              />
              <Link
                to="/categories"
                className="btn border-1 btn-outline-secondary w-100 ms-1"
              >
                Cancel
              </Link>
            </div>
          </div>
        )}
      </Formik>
      {/* Category Popup */}
      {isCategoryPopupOpen && (
        <AddCategoryPopup
          item="Category"
          onClose={() => setIsCategoryPopupOpen(false)}
        />
      )}
      {/* Subcategory Popup */}
      {isSubCategoryPopupOpen && (
        <AddSubCategoryPopup
          selectedCategory={selectedCategory}
          item="Sub-Category"
          onClose={() => setIsSubCategoryPopupOpen(false)}
        />
      )}
      {/* Sub-subcategory Popup */}
      {isSubSubCategoryPopupOpen && (
        <AddSubSubCategoryPopup
          item="Sub-Sub Category"
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onClose={() => setIsSubSubCategoryPopupOpen(false)}
        />
      )}
    </>
  );
}
