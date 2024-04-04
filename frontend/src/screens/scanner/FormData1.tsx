import { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { InputBox, ButtonBox } from "../../components/RenderFroms";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { BsQrCode } from "react-icons/bs";
import { Button } from "antd";
import { QrReader } from 'react-qr-reader';
const mobileKeywords = ['Mobi', 'Android', 'iPhone', 'iPad', 'Windows Phone'];
const tabletKeywords = ['iPad', 'Tablet', 'Android'];

const newStore = {
    location: "",
    qty: "1",
    laps: "0"
}

const initialData = {
    stores: [newStore],
}

export function FormData({ initialValues, handleUpdate, loading }: any) {
    const ref = useRef<any>(null);
    const fieldArrayRef = useRef<any>(null);
    const { userAgent } = window.navigator;
    const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isTablet = tabletKeywords.some(keyword => userAgent.includes(keyword));
    const [code, setCode] = useState<any>(false);
    const [activeStoreIndex, setActiveStoreIndex] = useState<number>(0); // State to track the active store index

    const validationSchema = Yup.object().shape({
        stores: Yup.array().of(
            Yup.object().shape({
                location: Yup.string().required("Location is required"),
                qty: Yup.string().required("Quantity is required")
            })
        )
    });

    useEffect(() => {
        if (fieldArrayRef.current) {
            fieldArrayRef.current.push(newStore);
        }
    }, []);

    return (
        <>
            <Formik
                initialValues={(initialValues?.stores && initialValues.stores[0]) ? initialValues : initialData}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate({ id: initialValues._id, stores: values.stores })}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                    <>
                        <FieldArray name="stores">
                            {({ remove, push }) => {
                                fieldArrayRef.current = { remove, push };
                                return (
                                    <div>
                                        {values.stores.map((store: any, index: number) => (
                                            <div className="row" key={index}>
                                                <div className="col-4">
                                                    <InputBox
                                                        required
                                                        autoFocus={index === values.stores.length - 2} // Autofocus only on the last added store
                                                        name={`stores.${index}.location`}
                                                        label="Store Location"
                                                        placeholder="Store Location"
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <InputBox
                                                        required
                                                        type='number'
                                                        name={`stores.${index}.qty`}
                                                        label="Quantity"
                                                        placeholder="Quantity"
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <InputBox
                                                        readOnly
                                                        name={`stores.${index}.laps`}
                                                        placeholder="Stock Out"
                                                        value={store.laps}
                                                    />
                                                </div>
                                                <div className="col-2 d-flex align-items-center">
                                                    <Button type="primary" danger onClick={() => remove(index)}>X</Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="primary" onClick={() => {
                                            push(newStore);
                                            setActiveStoreIndex(values.stores.length); // Update activeStoreIndex after pushing new store
                                        }} className="mb-3">
                                            ADD
                                        </Button>
                                    </div>
                                );
                            }}
                        </FieldArray>
                        <ButtonBox type="submit" value='Update' loading={loading} onClick={handleSubmit} />
                        {code && (
                            <Modal
                                open={true}
                                onCancel={() => setCode(false)}
                                footer={null}
                            >
                                <QrReader
                                    scanDelay={false}
                                    onResult={(result: any) => {
                                        if (!!result) {
                                            let stores = values?.stores
                                            stores[code?.index] = { ...stores[code?.index], location: result?.text }
                                            setFieldValue('stores', stores);
                                            setCode(false)
                                        }
                                    }}
                                    style={{ width: "100%" }}
                                    ref={ref}
                                    facingMode={isMobile || isTablet ? 'environment' : 'user'}
                                />
                            </Modal>
                        )}
                    </>
                )}
            </Formik>
        </>
    );
}
