import React, { useState } from 'react';
import { MultiSelectBox, InputBox, TextareaBox, SelectBox, ButtonBox } from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch, usePost } from "../../contexts";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Link } from "react-router-dom";
import AddCategoryPopup from "./addcategory";
import AddSubCategoryPopup from "./addsubcategory";
import AddSubSubCategoryPopup from "./addsubsubcategory";
import './category.css';

interface OptionType {
  value: string;
  label: string;
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

export function FormData({ initialValues, handleUpdate, loading, categoryData }: any) {
  const { create, data: respond } = usePost();

  const [imageFields, setImageFields] = useState(
    initialValues?.edit ? 
      (initialValues.images.length > 0 ? initialValues.images.map((image: string, index: any) => ({ id: index + 1, value: image })) : [{ id: 1, value: "" }]) 
      : 
      [{ id: 1, value: "" }]
  );
    
  const [selectedPlatform, setSelectedPlatform] = useState(initialValues?.platform?.split(",") || []);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isSubCategoryPopupOpen, setIsSubCategoryPopupOpen] = useState(false);
  const [isSubSubCategoryPopupOpen, setIsSubSubCategoryPopupOpen] = useState(false);

  const handleAddImageField = () => {
    const newId = imageFields.length + 1;
    setImageFields([...imageFields, { id: newId, value: "" }]);
  };

  const handleDeleteImageField = (idToRemove: any) => {
    const updatedImageFields = imageFields.filter((field: any) => field.id !== idToRemove);
    setImageFields(updatedImageFields);
  };

  const handlePlatformChange = (platform: string) => {
    if (selectedPlatform.includes(platform)) {
      setSelectedPlatform(selectedPlatform?.filter((p: string) => p !== platform));
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
    subCategories: initialValues?.subCategories?.value || initialValues?.subCategories,
    subSubCategories: initialValues?.subSubCategories?.value || initialValues?.subSubCategories,
  };

  return (
    <>
      <Formik
        initialValues={initialValues?.edit ? formattedInitialValues : initialData}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values, "log value");
          if (values.categories && !categoryData?.categories[0]?.categories.includes(values.categories)) {
            console.log('Adding new category:', values.categories);
            await create('addCategory', { name: values.categories });
          }    
          handleUpdate({ 
            ...values, 
            sku: +values.sku, 
            weight: +values.weight, 
            taxValue: +values.taxValue, 
            ean: values.ean, 
            platform: selectedPlatform?.join(",") 
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (   
          <div className="w-full p-3">
            <div className="mb-4 d-flex" style={{ gap: "1rem" }}>
              <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange('amazon')}
                />
                <label className="m-0">Amazon</label>
              </div>
              <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange('bol.com')}
                />
                <label className=" m-0">Bol.com</label>
              </div>
              <div className=" d-flex align-items-center" style={{ gap: "6px" }}>
                <input
                  type="checkbox"
                  onChange={() => handlePlatformChange('webshop')}
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
            <div className="mb-4 d-flex w-100">
              <CreatableSelect
                value={values.categories && typeof values.categories === 'string' 
                  ? { value: values.categories, label: values.categories } 
                  : values.categories
                }
                name="categories"
                className=" w-100"
                options={categoryData?.categories[0]?.categories.map((category: string) => ({
                  value: category, // The value used internally by the select component
                  label: category  // The label shown to the user
                })) || []}
                placeholder="Select Category"
                onChange={(option: SingleValue<OptionType>) => setFieldValue('categories', option ? option.value : '')}
                onCreateOption={async (newCategory) => {
                  const newOption = { value: newCategory, label: newCategory };
                  await create('addCategory', { name: newCategory });
                  setFieldValue('categories', newCategory);
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
            <div className="mb-4 d-flex w-100">
              <CreatableSelect
                value={values.subCategories && typeof values.subCategories === 'string' 
                  ? { value: values.subCategories, label: values.subCategories } 
                  : values.subCategories
                }
                name="subCategories"
                className=" w-100"
                options={categoryData?.categories[0]?.subCategories.map((category: string) => ({
                  value: category, // The value used internally by the select component
                  label: category  // The label shown to the user
                })) || []}
                placeholder="Select Subcategory"
                onChange={(option: SingleValue<OptionType>) => setFieldValue('subCategories', option ? option.value : '')}
                onCreateOption={async (newSubCategory) => {
                  const newOption = { value: newSubCategory, label: newSubCategory };
                  await create('addCategory', { name: newSubCategory });
                  setFieldValue('subCategories', newSubCategory);
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
            <div className="mb-4 d-flex w-100">
              <CreatableSelect
                value={values.subSubCategories && typeof values.subSubCategories === 'string' 
                  ? { value: values.subSubCategories, label: values.subSubCategories } 
                  : values.subSubCategories
                }
                name="subSubCategories"
                className=" w-100"
                options={categoryData?.categories[0]?.subSubCategories.map((category: string) => ({
                  value: category, // The value used internally by the select component
                  label: category  // The label shown to the user
                })) || []}
                placeholder="Select Sub-subcategory"
                onChange={(option: SingleValue<OptionType>) => setFieldValue('subSubCategories', option ? option.value : '')}
                onCreateOption={async (newSubSubCategory) => {
                  const newOption = { value: newSubSubCategory, label: newSubSubCategory };
                  await create('addCategory', { name: newSubSubCategory });
                  setFieldValue('subSubCategories', newSubSubCategory);
                }}  
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
            {/* Add more fields as needed */}
            <div className="d-flex">
              <ButtonBox 
                type="submit" 
                label={loading ? "Please wait..." : initialValues?.edit ? "Update" : "Submit"} 
                disabled={loading}
              />
              <Link to="/categories" className="btn border-1 btn-outline-secondary">
                Cancel
              </Link>
            </div>
          </div>
        )}
      </Formik>
      {/* Category Popup */}
      {isCategoryPopupOpen && <AddCategoryPopup item='Category' onClose={() => setIsCategoryPopupOpen(false)} />}
      {/* Subcategory Popup */}
      {isSubCategoryPopupOpen && <AddSubCategoryPopup item='Sub-Category' onClose={() => setIsSubCategoryPopupOpen(false)} />}
      {/* Sub-subcategory Popup */}
      {isSubSubCategoryPopupOpen && <AddSubSubCategoryPopup item='Sub-Sub Category' onClose={() => setIsSubSubCategoryPopupOpen(false)} />}
    </>
  );
}
