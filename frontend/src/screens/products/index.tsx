"use client"
import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Table,
  Space,
  Input,
  Tag,
  Button,
  Dropdown,
  Avatar,
  Menu,
  Upload
} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { LiaProductHunt } from "react-icons/lia";
import { usePostFile, useFetchByLoad } from "../../contexts";
import { CiMenuKebab } from "react-icons/ci";
import { FormData } from "./FormData";
import { ViewData } from "./ViewData";
import { CreateDataDrawer, EditDataDrawer, DeleteDataModal, StatusDataModal, ViewDataDrawer } from "../../components/Forms";
const resource = "products";

export default function Lists() {
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);

  const { create, data: file, loading: loadingFile } = usePostFile();

  const [query, setQuery] = useState({ "skip": 0, "take": 10, search: "" })
  const { fetch, data, loading } = useFetchByLoad();

  useEffect(() => {
    fetch({ url: resource, query: JSON.stringify(query) })
  }, [query, file])

  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) })
    setDetail(null)
  }

  const calculateTotalQuantity = (data: any) => {
    let totalQuantity = 0;
    if (data) {
      for (const item of data) {
        totalQuantity += parseInt(item.qty) - parseInt(item.laps);
      }
      return totalQuantity;
    } else {
      return totalQuantity;
    }
  }

  const columns = [
    {
      // title: "Image",
      // dataIndex: "images",
      // render: (text: any) => text ? <Avatar shape="square" src={<img src={text} alt="" />} /> : <LiaProductHunt size={30} />
      title: "Image",
      dataIndex: "images",
      render: (images: string[]) => {
        const firstImage = images && images.length > 0 ? images[0] : null;
        return firstImage ? <Avatar shape="square" src={firstImage} /> : <LiaProductHunt size={30} />;
      }
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Total Stock",
      dataIndex: "stores",
      render: (data: any) => calculateTotalQuantity(data)
    },
    {
      title: "Categories",
      dataIndex: "categories",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render(val: any) {
        return <Tag color={val ? "success" : "error"}>{val ? "ACTIVE" : "INACTIVE"}</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: (_value: any, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "view": true })}
                >
                  VIEW
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "edit": true })}
                >
                  EDIT
                </Button>
              </Menu.Item>
              <Menu.Item key="3">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "active": true })}
                >
                  {record.status ? "INACTIVE" : "ACTIVE"}
                </Button>
              </Menu.Item>
              <Menu.Item key="4">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "delete": true })}
                >
                  DELETE
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" onClick={(e) => e.preventDefault()}>
            <CiMenuKebab />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs pageName="Products" />
      <div className="headerRight">
        <Space>
        <Button type="primary" >Download Stock CSV</Button>
          
          <Upload
            showUploadList={false}
            customRequest={({ file }) => create('products/import_img', file)}>
            <Button type="primary" icon={loadingFile ? <LoadingOutlined /> : <PlusOutlined />}>Import Images</Button>
          </Upload>
          <Upload
            showUploadList={false}
            customRequest={({ file }) => create('products/import', file)}>
            <Button type="primary" icon={loadingFile ? <LoadingOutlined /> : <PlusOutlined />}>Import File</Button>
          </Upload>
        </Space>
      </div>
      <div className="fixed">
        <Button type="primary" onClick={() => setDetail({ "add": true })} className="addButton">
          ADD
        </Button>
      </div>
      <div className="viewDetails">
        <Input autoFocus placeholder="title / barcode / scancode / supplierref / brand / supplier" value={search} onChange={(obj) => { setSearch(obj.target.value); setQuery({ ...query, search: obj.target.value }); }} />
      </div>
      <Table className="mainTable" loading={loading} dataSource={data?.data ?? []} columns={columns} pagination={{
        showQuickJumper: true,
        total: data?.count ?? 0,
        onChange: (page, pageSize) => {
          setQuery({ ...query, "skip": ((page - 1) * pageSize), "take": pageSize });
        },
      }} />
      {(detail && detail.add) && (<CreateDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.edit) && (<EditDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.delete) && (<DeleteDataModal resource={resource} close={refreshData} data={detail} />)}
      {(detail && detail.active) && (<StatusDataModal resource={resource} close={refreshData} data={detail} />)}
      {(detail && detail.view) && (<ViewDataDrawer resource={resource} close={refreshData} ViewData={ViewData} data={detail} />)}
    </>
  );
}