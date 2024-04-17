"use client";
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
import { FormData } from "./FormData";
import { FormDataLaps } from "./FormDataLapsData";
import { EditDataModal } from "../../components/Forms";
import { CloseOutlined } from "@ant-design/icons";
import { Spin, Row, Col, Form, Checkbox, Button, Input, Select } from "antd";

const { Option } = Select;
const resource = "products";

interface OptionType {
  value: string;
  label: string;
}

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [isStockOut, setIsStockOut] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]);

  let timer = useRef<number | undefined>(undefined);

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
                    <Checkbox.Group>
                      <Checkbox value="amazon" style={{ marginRight: "10px" }}>
                        Amazon
                      </Checkbox>
                      <Checkbox value="bol.com">Bol.com</Checkbox>
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
                    Enter Sold Out
                  </Button>

                  {!isStockOut ? (
                    <Button
                      type="primary"
                      onClick={() => setIsStockOut(true)}
                      style={{ margin: "10px" }}
                    >
                      Stock out
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", margin: "10px" }}
                      icon={<CloseOutlined />}
                    >
                      Stock out
                    </Button>
                  )}

                  {isStockOut && (
                    <div style={{ marginLeft: "10px", margin: "10px", display: "flex",flexWrap: "wrap",  alignItems: "center" }}>
                      <Input placeholder="Enter details here..." style={{width: "150px", marginRight: "10px" }} />
                    
                      <Select defaultValue="" style={{ width: "150px", marginRight: "10px" }}>
                        <Option value="">Select Option</Option>
                        {options.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                            <CloseOutlined
                              style={{ marginLeft: "8px", cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOption(option.value);
                              }}
                            />
                          </Option>
                        ))}
                      </Select>
                      <Button type="primary">Update</Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
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














// "use client"
// import { useEffect, useRef, useState } from "react";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useFetchByLoad } from "../../contexts";
// import { ViewData } from "../products/ViewData";
// import { FormData } from "./FormData";
// import { FormDataLaps } from "./FormDataLapsData";
// import { EditDataModal } from "../../components/Forms";
// import { CloseOutlined } from '@ant-design/icons';
// import { Spin,Row, Col, Form, Checkbox, Button, Input, Select } from 'antd';

// const { Option } = Select;
// const resource = "products";


// interface OptionType {
//   value: string;
//   label: string;
// }

// export default function Lists() {
//   const { fetch, data, loading } = useFetchByLoad();
//   const [detail, setDetail] = useState<any>(null);
//   const [search, setSearch] = useState<any>(null);

//   const [isStockOut, setIsStockOut] = useState(false);

//   let timer = useRef<any>(null)

  // const fetchData = (search: any) => {
  //   clearTimeout(timer.current)
  //   timer.current = setTimeout(() => {
  //     fetch({ url: resource, query: JSON.stringify({ search }) })
  //   }, 500)
  // }

//   useEffect(() => {
//     if (data?.count > 0) {
//       setSearch(null)
//     }
//   }, [data])

//   const [options, setOptions] = useState<OptionType[]>([
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' },
// ]);

// const handleRemoveOption = (value: string) => {
//     const updatedOptions = options.filter((option) => option.value !== value);
//     setOptions(updatedOptions);
// };

//   return (
//     <>
//       <Breadcrumbs pageName="Scanner" />
//       <div className="viewDetails">
//         <div className="viewDetails">
//           <Input autoFocus placeholder="title / barcode / scancode / supplierref / brand / supplier" value={search} onChange={(obj) => { setSearch(obj.target.value); fetchData(obj.target.value) }} />
//         </div>
//         {loading && (<div className="viewDetails" style={{ textAlign: "center" }}><Spin /></div>)}
//         {(data && data?.data && data?.data[0]) ? (<div className="viewDetails">
//         <div className="viewDetails" style={{ textAlign: 'center' }}>
//         <Row gutter={[16, 16]} align="middle" justify="center">
//          <Col xs={24} sm={24} md={24} lg={24}>
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
//             <Form.Item style={{ marginRight: '10px',margin:"10px"  }}>
//               <Checkbox.Group>
//                 <Checkbox value="amazon" style={{ marginRight: '10px' }}>Amazon</Checkbox>
//                 <Checkbox value="bol.com">Bol.com</Checkbox>
//               </Checkbox.Group>
//             </Form.Item>

//             <Button type="primary" onClick={() => setDetail({ ...data?.data[0], edit: true })} style={{ marginRight: '10px',margin:"10px"  }}>
//               Enter Store Location
//             </Button>

//             <Button type="primary" onClick={() => setDetail({ ...data?.data[0], editLaps: true })} style={{ marginRight: '10px',margin:"10px"  }}>
//               Enter Sold out
//             </Button>
//             {!isStockOut ? (
//               <Button type="primary" onClick={() => setIsStockOut(true)} style={{ marginRight: '10px' ,margin:"10px" }}>
//                 Stock out
//               </Button>
//             ) : (
//               <Button type="primary" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', marginRight: '10px',margin:"10px"  }} icon={<CloseOutlined />}>
//                 Stock out
//               </Button>
//             )}

//             {isStockOut && (
//               <div style={{ marginLeft: '10px',margin:"10px" , display: 'flex',flexWrap: "wrap",  alignItems: 'center' }}>
//                 <Input placeholder="Enter details here..." style={{ width: '150px',marginRight: '10px' }} />
//                 <Select defaultValue="" style={{ width: '150px', marginRight: '10px' }}>
//                   <Option value="">Select Option</Option>
//                   <Option value="option1">Option 1</Option>
//                   <Option value="option2">Option 2</Option>
//                 </Select>
//                 <Select defaultValue="" style={{ width:'150px', marginRight: '10px' }}>
//                <Option value="">Select Option</Option>
//                  {options.map(option => (
//           <Option key={option.value} value={option.value}>
//             {option.label}
//             <CloseOutlined
//               style={{ marginLeft: '8px', cursor: 'pointer' }}
//               onClick={(e) => {  e.stopPropagation();handleRemoveOption(option.value); }}
//             />
//           </Option>
//         ))}
//       </Select>
//                 <Button type="primary">
//                   Update
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Col>
//       </Row>

    
//     </div>
       
//           <ViewData data={data.data[0]} />
//         </div>) : <div><h3 className="viewDetails">No data found!</h3></div>}

//         {(detail && detail.edit) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormData} data={detail} />)}
//         {(detail && detail.editLaps) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormDataLaps} data={detail} />)}

//       </div>
//     </>
//   );
// }










