import { MultiSelectBox, InputBox, TextareaBox, SelectBox, ButtonBox } from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "../../contexts";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { useState } from "react";

const initialData = {
    title: "",
    description: "",
    status: true,
    sku: "",
    language: "nl_NL",
    categories: "",
    images: [],
    tags: "isallowed",
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
    platform: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {
  const [imageFields, setImageFields] = useState(initialValues?.edit ? initialValues.images.map((image:string, index:any) => ({ id: index + 1, value: image })) : [{ id: 1, value: ""}]);
    const [selectedPlatform, setSelectedPlatform] = useState(initialValues?.platform || '');

    const handleAddImageField = () => {
        const newId = imageFields.length + 1;
        setImageFields([...imageFields, { id: newId, value: "" }]);
    };

    const handleDeleteImageField = (idToRemove: any) => {
      const updatedImageFields = imageFields.filter((field:any) => field.id !== idToRemove);
      setImageFields(updatedImageFields);
  };


    const handlePlatformChange = (platform: string) => {
        setSelectedPlatform(platform);
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.boolean().required("Status is required"),
        sku: Yup.number().required("SKU is required"),
        language: Yup.string().required("Language is required"),
        categories: Yup.string().required("Categorie is required"),
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


    return (
        <Formik
            initialValues={initialValues?.edit ? initialValues : initialData }
            validationSchema={validationSchema}
            onSubmit={(values) => { console.log(values, "log value") ; handleUpdate({ ...values, sku: +values.sku, weight: +values.weight, taxValue: +values.taxValue, ean: +values.ean, platform: selectedPlatform })}}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <div className="w-full p-3">
                <div className="mb-4">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlatform === 'amazon'}
                                onChange={() => handlePlatformChange('amazon')}
                            />
                            Amazon
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlatform === 'bol.com'}
                                onChange={() => handlePlatformChange('bol.com')}
                            />
                            Bol.com
                        </label>
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
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="categories"
                            label="Categorie"
                            placeholder="Enter Categorie"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    {imageFields.map((field:any, index:any) => (
                        <div key={field.id} className="mb-4 flex items-center">
                            <InputBox
                                name={`images[${index}]`}
                                label={`Image ${index + 1}`}
                                placeholder="Enter Image URL"
                                defaultValue={field.value}
                                icon={<MdOutlineSubtitles />}
                            />
                            {index === imageFields.length - 1 && (
                                <button type="button" onClick={handleAddImageField}>
                                    + Add Image
                                </button>
                            )}
                            {index !== 0 && (
                                <button type="button" onClick={() => handleDeleteImageField(field.id)}>
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
                    <div className="fixedBottom">
                        <ButtonBox value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}