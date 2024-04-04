import React, { useState, useRef, useEffect } from "react";

export function FormData({ initialValues, handleUpdate, loading }: any) {
    
    const ref = useRef<any>(null);
    const fieldArrayRef = useRef<any>(null);
    const useEffectRef = useRef<boolean>(initialValues?.stores && initialValues.stores[0] ? false : true);
    const { userAgent } = window.navigator;
    const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isTablet = tabletKeywords.some(keyword => userAgent.includes(keyword));
    const [code, setCode] = useState<any>(false);


  const handleDelete = (idToDelete: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };
  
    useEffect(() => {
        if (!useEffectRef.current) {
            useEffectRef.current = true
            fieldArrayRef.current.push(newStore);
        }
    }, [fieldArrayRef]);

    useEffect(() => {
        if (useEffectRef.current) {
            const inputElement = document.querySelector(`input[name="stores.0.location"]`) as HTMLInputElement;
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [useEffectRef]);

    return (
        <>
            <Formik
                initialValues={(initialValues?.stores && initialValues.stores[0]) ? initialValues : initialData}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate({ id: initialValues._id, stores: values.stores })}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                    <>
                    {console.log(values.stores, " values ")
                    }
                        <FieldArray name="stores">
                            {({ remove, push }) => {
                                fieldArrayRef.current = { remove, push };
                                return <div>
                                    {values.stores.length > 0 &&
                                        values?.stores?.map((store: any, index: any) => (
                                            <div className="row" key={index}>
                                                <div className="col-4">
                                                    <InputBox
                                                        required
                                                        autoFocus={useEffectRef.current}
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
                                    <Button type="primary" onClick={() => push(newStore)} className="mb-3">
                                        ADD
                                    </Button>
                                </div>
                            }}
                        </FieldArray>
                        <ButtonBox type="submit" value='Update' loading={loading} onClick={handleSubmit} />
                        {code && (<Modal
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
                        </Modal>)}
                    </>
                )}
            </Formik>
        </>
    );

}
