"use client"
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Spin, Input, Button,Select } from "antd";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
import { FormData } from "./FormData";
import { FormDataLaps } from "./FormDataLapsData";
import { EditDataModal } from "../../components/Forms";
import { Checkbox, Form} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const resource = "products";

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);

  const [isStockOut, setIsStockOut] = useState(false);

  let timer = useRef<any>(null)

  const fetchData = (search: any) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      fetch({ url: resource, query: JSON.stringify({ search }) })
    }, 500)
  }

  useEffect(() => {
    if (data?.count > 0) {
      setSearch(null)
    }
  }, [data])

  return (
    <>
      <Breadcrumbs pageName="Scanner" />
      <div className="viewDetails">

        <div className="viewDetails">
          <Input autoFocus placeholder="title / barcode / scancode / supplierref / brand / supplier" value={search} onChange={(obj) => { setSearch(obj.target.value); fetchData(obj.target.value) }} />
        </div>

        {loading && (<div className="viewDetails" style={{ textAlign: "center" }}><Spin /></div>)}
        {(data && data?.data && data?.data[0]) ? (<div className="viewDetails">
       
      

          <div className="viewDetails" style={{ textAlign: "center", display: 'flex', justifyContent: "flex-start" }}>
          <Form.Item>
        <Checkbox.Group style={{marginLeft:"10px"}}>
          <Checkbox value="">Amazon</Checkbox>
          <Checkbox value="">Bol.com</Checkbox>
        </Checkbox.Group>
      </Form.Item>
            <Button type="primary" onClick={() => setDetail({ ...data?.data[0], "edit": true })}>Enter Store Location</Button>
            <Button type="primary" onClick={() => setDetail({ ...data?.data[0], "editLaps": true })} className="mx-4">Enter Sold out</Button>         
          {/* Stock out button */}
             {!isStockOut ? (
                <Button type="primary"onClick={() => setIsStockOut(true)} >  Stock out </Button>
              ) : (
                <>
                  <Button  type="primary" style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }} icon={<CloseOutlined />} >
                    Stock out
                  </Button>
                  <div style={{ marginLeft: "10px" }}>
                    <Input placeholder="Enter details here..." />
                    <Select defaultValue="" style={{ width: 200, marginTop: "10px" }} >
                      <Option value="">Select Option</Option>
                      <Option value="option1">Option 1</Option>
                      <Option value="option2">Option 2</Option>
                    </Select>
                  </div>
                </>
              )}
              
            </div>
           
          <ViewData data={data.data[0]} />
        </div>) : <div><h3 className="viewDetails">No data found!</h3></div>}

        {(detail && detail.edit) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormData} data={detail} />)}
        {(detail && detail.editLaps) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormDataLaps} data={detail} />)}

      </div>
    </>
  );
}























