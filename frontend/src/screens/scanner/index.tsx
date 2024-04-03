"use client"
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Spin, Input, Button } from "antd";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
import { FormData } from "./FormData";
import { FormDataLaps } from "./FormDataLapsData";
import { EditDataModal } from "../../components/Forms";
const resource = "products";

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);

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
          <div className="viewDetails" style={{ textAlign: "center", display: 'flex', justifyContent: "center" }}><Button type="primary" onClick={() => setDetail({ ...data?.data[0], "edit": true })}>Enter Store Location</Button>
            <Button type="primary" onClick={() => setDetail({ ...data?.data[0], "editLaps": true })} className="mx-4">Enter Stock Out</Button></div>
          <ViewData data={data.data[0]} />
        </div>) : <div><h3 className="viewDetails">No data found!</h3></div>}

        {(detail && detail.edit) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormData} data={detail} />)}
        {(detail && detail.editLaps) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormDataLaps} data={detail} />)}

      </div>
    </>
  );
}