import { InputBox, ButtonBox } from "../../components/RenderFroms";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "antd";

const newStore = {
  location: "",
  qty: "1",
  laps: "0",
};

const initialData = {
  stores: [newStore],
};

export function FormDataLaps({ initialValues, handleUpdate, loading }: any) {
    
  const validationSchema = Yup.object().shape({
    stores: Yup.array().of(
      Yup.object().shape({
        location: Yup.string().required("Location is required"),
        qty: Yup.string().required("Quantity is required"),
      })
    ),
  });

  return (
    <Formik
      initialValues={
        initialValues?.stores && initialValues.stores[0]
          ? initialValues
          : initialData
      }
      validationSchema={validationSchema}
      onSubmit={(values) =>
        handleUpdate({ id: initialValues._id, stores: values.stores })
      }
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <>
          <FieldArray name="stores">
            {({ remove, push }) => (
              <div>
                {values.stores.length > 0 &&
                  values?.stores?.map((store: any, index: any) => (
                    <div className="row" key={index}>
                      <div className="col-5">
                        <InputBox
                          readOnly
                          name={`stores.${index}.location`}
                          placeholder="Store Location"
                        />
                      </div>

                      <div className="col-2">
                        <InputBox
                          readOnly
                          name={`stores.${index}.qty`}
                          placeholder="QTY"
                          value={Number(store.qty) - Number(store.laps)}
                        />
                      </div>

                      <div className="col-5 d-flex align-items-center">
                        <Button
                          type="primary"
                          onClick={() => {
                            let stores = values?.stores;
                            if (Number(stores[index].laps) > 0) {
                              stores[index] = {
                                ...stores[index],
                                laps: String(Number(stores[index].laps) - 1),
                              };
                              setFieldValue("stores", stores);
                            }
                          }}
                        >
                          -
                        </Button>
                        <div className="mx-2">
                          <InputBox
                            type="number"
                            name={`stores.${index}.laps`}
                            label="Stock Out"
                            placeholder="Stock Out"
                            onChange={(obj: any) => {
                              let stores = values?.stores;
                              if (
                                Number(obj.target.value) >= 0 &&
                                Number(stores[index].qty) >
                                  Number(obj.target.value)
                              ) {
                                stores[index] = {
                                  ...stores[index],
                                  laps: String(obj.target.value),
                                };
                                setFieldValue("stores", stores);
                              }
                            }}
                          />
                        </div>
                        <Button
                          type="primary"
                          onClick={() => {
                            let stores = values?.stores;
                            if (
                              Number(stores[index].qty) >
                              Number(stores[index].laps)
                            ) {
                              stores[index] = {
                                ...stores[index],
                                laps: String(Number(stores[index].laps) + 1),
                              };
                              setFieldValue("stores", stores);
                            }
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>

          <ButtonBox
            type="submit"
            value="Update"
            loading={loading}
            onClick={handleSubmit}
          />
        </>
      )}
    </Formik>
  );
}
