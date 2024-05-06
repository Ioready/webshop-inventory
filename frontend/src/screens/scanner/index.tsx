"use client";
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Spin, Input, Button, Select, Descriptions, Row, Col } from "antd";
import { useFetchByLoad, usePatch } from "../../contexts";
import { ViewData } from "../products/ViewData";
import { FormData } from "./FormData";
import { FormDataLaps } from "./FormDataLapsData";
import { EditDataModal } from "../../components/Forms";
import { Checkbox, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { platform } from "os";
const { Option } = Select;
const resource = "products";

interface OptionType {
  value: string;
  label: string;
}

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const { edit, data :patchData, loading:patchLoading} = usePatch();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [isStockOut, setIsStockOut] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([
    { value: "Out", label: "Out" },
    { value: "Not available", label: "Not available" },
    { value: "available in week.......", label: "available in week......." },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const initialPlatforms = data && data.data ? data.data[0]?.platform?.split(",") : [];
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialPlatforms);
  // const handleUpdate = () => {
  //   if (inputValue.trim() !== '') {
  //     setDropdownOptions([...dropdownOptions, inputValue]);
  //     setInputValue('');
  //   }
  // };

  // const handleSelectChange = (value: any) => {
  //   console.log('Selected:', value);
  // };

  useEffect(() => {
    // Load data from local storage when the component mounts
    const savedInputValue = localStorage.getItem('inputValue');
    const savedSelectedOption = localStorage.getItem('selectedOption');
    if (savedInputValue && savedSelectedOption) {
      setInputValue(savedInputValue);
      setSelectedOption(savedSelectedOption);
    }
  }, []);

  let timer = useRef<number | undefined>(undefined);

  const editProduct = (checkedValues:any) => {
    edit(resource, { platform: checkedValues.join(","), _id: data?.data[0]?._id });
    setSelectedPlatforms(checkedValues);
    // fetchData(search);
  };

  const statment = () => {
    edit(resource, { stockedOutStatment: inputValue, _id: data?.data[0]?._id });
    // fetchData(search);
  };

  useEffect(() => {
    if (data?.count > 0) {
      setSearch(null);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    fetchData(value);

  };

    const fetchData = (search: string | null) => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      fetch({ url: resource, query: JSON.stringify({ search }) });
    }, 500);
  };

  const handleRemoveOption = (value: string) => {
    const updatedOptions = options.filter((option) => option.value !== value);
    setOptions(updatedOptions);
  };
  const handleUpdate = () => {
    // Update state with new input value and selected option
    setInputValue(selectedOption);
    setSelectedOption(selectedOption);
  
    // Save data to local storage
    localStorage.setItem('inputValue', inputValue);
    localStorage.setItem('selectedOption', selectedOption);
  };

  const handleDetailClose = () => {
    setDetail(null);
    fetchData(search);
  };

 
  return (
    <>
      <Breadcrumbs pageName="Scanner" />
      <div className="viewDetails">
        <Input
          autoFocus
          placeholder="title / barcode / scancode / supplierref / brand / supplier"
          value={search || ""}
          onChange={handleSearchChange}
        />

        {loading && (
          <div className="viewDetails" style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}

        {data && data.data && data.data[0] ? (
          <div className="viewDetails">
            <Row gutter={[16, 16]} align="middle" justify="center">
              <Col xs={24}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}>
                  <Form.Item style={{ margin: "10px" }}>
                    <Checkbox.Group onChange={editProduct} value={selectedPlatforms}>
                      <Checkbox value="amazon" style={{ marginRight: "10px" }}>Amazon</Checkbox>
                      <Checkbox value="bol.com">Bol.com</Checkbox>
                      <Checkbox value="Webshop">Webshop</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>

                  <Button
                    type="primary"
                    onClick={() => setDetail({ ...data?.data[0], edit: true })}
                    style={{ margin: "10px" }}
                  >
                    Enter Store Location
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => setDetail({ ...data?.data[0], editLaps: true })}
                    style={{ margin: "10px" }}
                  >
                    Enter Stock Out
                  </Button>

                  {!isStockOut ? (
                    <Button
                      type="primary"
                      onClick={() => setIsStockOut(true)}
                      style={{ margin: "10px" }}
                    >
                      Sold out
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", margin: "10px" }}
                      icon={<CloseOutlined />}
                    >
                      Sold out
                    </Button>
                  )}

                  {isStockOut && (
                    <div style={{ marginLeft: "10px", margin: "10px", display: "flex",flexWrap: "wrap",  alignItems: "center" }}>
                      <Input placeholder="Enter details here..." onChange={(e)=>{setInputValue(e.target.value);}} style={{width: "150px", marginRight: "10px" }} />
                    
                      <Select  value={selectedOption} style={{ width: "150px", marginRight: "10px" }} onChange={(value) => setSelectedOption(value)}>
                        <Option value="">Select Option</Option>
                        {options.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                            {/* <CloseOutlined
                              style={{ marginLeft: "8px", cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOption(option.value);
                              }}
                            /> */}
                          </Option>
                        ))}
                      </Select>
                      <Button type="primary" onClick={()=>{handleUpdate() ; statment();}}>Update</Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <h3>{data.data[0]?.stockedOutStatment}</h3>
            <ViewData data={data.data[0]} />
          </div>
        ) : (
          <div>
            <h3 className="viewDetails">No data found!</h3>
          </div>
        )}

        {detail && detail.edit && (
          <EditDataModal
            resource={resource}
            close={handleDetailClose}
            FormData={FormData}
            data={detail}
          />
        )}

        {detail && detail.editLaps && (
          <EditDataModal
            resource={resource}
            close={handleDetailClose}
            FormData={FormDataLaps}
            data={detail}
          />
        )}
      </div>
    </>
  );
}

