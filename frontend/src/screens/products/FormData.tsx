import { MultiSelectBox, InputBox, TextareaBox, SelectBox, ButtonBox } from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch, usePost } from "../../contexts";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { useState } from "react";
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface OptionType {
    value: string;
    label: string;
  }
const resource="addCategory";
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


export function FormData({ initialValues, handleUpdate, loading,categoryData }: any) {
    const { create, data: respond } = usePost();

    const [imageFields, setImageFields] = useState(
        initialValues?.edit ? 
        (initialValues.images.length > 0 ? initialValues.images.map((image: string, index: any) => ({ id: index + 1, value: image })) : [{ id: 1, value: "" }]) 
        : 
        [{ id: 1, value: "" }]
    );
    
    const [selectedPlatform, setSelectedPlatform] = useState(initialValues?.platform?.split(",") || []);

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
        categories: Yup.string().required("Categorie is required"),
        subCategories: Yup.string().required("sub Categorie is required"),
        subSubCategories: Yup.string().required("sub sub Categorie is required"),
        tags: Yup.string().required("Tag is required"),
        price: Yup.string().required("Price is required"),
        weight: Yup.number().required("Weight is required"),
        taxValue: Yup.number().required("Tax is required"),
        ean: Yup.number().required("Ean is required"),
        supplierRef: Yup.string().required("Supplier Ref is required"),
        brand: Yup.string().required("Brand is required"),
        size: Yup.string().required("Size is required"),
        colors: Yup.string().required("Color is required"),
        supplier: Yup.string().required("Supplier is required"),
    });

    const formattedInitialValues = {
        ...initialData,
        ...initialValues,
        // categories: initialValues?.categories ? { value: initialValues.categories, label: initialValues.categories } : "",
        // subCategories: initialValues?.subCategories ? { value: initialValues.subCategories, label: initialValues.subCategories } : "",
        // subSubCategories: initialValues?.subSubCategories ? { value: initialValues.subSubCategories, label: initialValues.subSubCategories } : "",

        categories: initialValues?.categories?.value || initialValues?.categories,
        subCategories: initialValues?.subCategories?.value || initialValues?.subCategories,
        subSubCategories: initialValues?.subSubCategories?.value || initialValues?.subSubCategories,
    };

    return (
        <Formik
            initialValues={initialValues?.edit ? formattedInitialValues : initialData}
            validationSchema={validationSchema}
            onSubmit={async(values) => { console.log(values, "log value");
                if (values.categories && !categoryData?.categories[0]?.categories.includes(values.categories)) {
                    console.log('Adding new category:', values.categories);
                    await create('addCategory', { name: values.categories });
                }    
            handleUpdate({ ...values, sku: +values.sku, weight: +values.weight, taxValue: +values.taxValue, ean: values.ean, platform: selectedPlatform?.join(",") }) }}
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
                            type="number"categories
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
                    <div className="mb-4">
                        <CreatableSelect
                            value={values.categories && typeof values.categories === 'string' 
                                ? { value: values.categories, label: values.categories } 
                                : values.categories
                              }
                            name="categories"
                            options={categoryData?.categories[0]?.categories.map((category: string) => ({
                                value: category, // The value used internally by the select component
                                label: category  // The label shown to the user
                              })) || []
                            }
                            placeholder="Select Categorie"
                            onChange={(option: SingleValue<OptionType>) => setFieldValue('categories', option ? option.value : '')}
                            onCreateOption={async (newCategory) => {
                                // Add the new category to the list
                                const newOption = { value: newCategory, label: newCategory };
                                await create('addCategory', { name: newCategory });
                                setFieldValue('categories', newCategory);
                            }}  
                        />
                    </div>
                    <div className="mb-4">
                        <CreatableSelect
                            value={values.subCategories && typeof values.subCategories === 'string' 
                                ? { value: values.subCategories, label: values.subCategories } 
                                : values.subCategories
                              }
                            name="subCategories"
                            options={categoryData?.categories[0]?.subCategories.map((category: string) => ({
                                value: category, // The value used internally by the select component
                                label: category  // The label shown to the user
                              })) || []}
                            placeholder="Select Sub Categorie"
                            onChange={(option: SingleValue<OptionType>) => setFieldValue('subCategories', option ? option.value : '')}
                        />
                    </div>
                    <div className="mb-4">
                        <CreatableSelect
                            value={values.subSubCategories && typeof values.subSubCategories === 'string' 
                                ? { value: values.subSubCategories, label: values.subSubCategories } 
                                : values.subSubCategories
                              }
                            name="subSubCategories"
                            options={categoryData?.categories[0]?.subSubCategories.map((category: string) => ({
                                value: category, // The value used internally by the select component
                                label: category  // The label shown to the user
                              })) || []}
                            placeholder="Select Sub Sub Categorie"
                            onChange={(option: SingleValue<OptionType>) => setFieldValue('subSubCategories', option ? option.value : '')}
                        />
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
                                <button type="button" className="btn btn-success" onClick={handleAddImageField}>
                                    + Add Image
                                </button>
                            )}
                            {index !== 0 && (
                                <button type="button" className="btn btn-danger mx-3" onClick={() => handleDeleteImageField(field.id)}>
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
                            name="sizeMixed"
                            label="Size Mixed"
                            placeholder="Enter Size Mixed"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="colors"
                            label="Color"
                            placeholder="Enter Color"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
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
                    <div className="fixedBottom">
                        <ButtonBox value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={() => {console.log(values, "log value"); handleSubmit()}} />
                    </div>
                </div>
            )}
        </Formik>
    );
}
