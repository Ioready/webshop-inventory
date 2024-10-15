"use client";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Table,
  Space,
  Input,
  Button,
  Dropdown,
  Avatar,
  Menu,
  message,
  Modal,
} from "antd";
import {DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { LiaProductHunt } from "react-icons/lia";
import { usePostFile, useFetchByLoad, usePatch, useDelete } from "../../contexts";
import { CiMenuKebab } from "react-icons/ci";
import { FormData } from "./FormData";
import { ViewData } from "./ViewData";
import {
  CreateDataDrawer,
  EditDataDrawer,
  DeleteDataModal,
  StatusDataModal,
  ViewDataDrawer,
} from "../../components/Forms";
import { CSVLink } from "react-csv";
import { usePostToWebshop } from "../../contexts/usePostToWebshop";
import {saveAs} from 'file-saver';
import Papa from 'papaparse';
const resource = "products";
const resource2 = "getCategory";


export default function Lists() {
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);
  const { create, data: file, loading: loadingFile } = usePostFile();
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options",isWebshopProduct:"true" });
  const { fetch, data, loading } = useFetchByLoad();
  const { edit, data: patchData, loading: patchLoading } = usePatch();
  const { remove, loading: deleteLoading } = useDelete();
  const { fetch: fetchCategories, data: categoryData, loading: loadingCategories } = useFetchByLoad();
  const { fetch:productFetch, data:productData } = useFetchByLoad();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const { update, data:webShopData, loading:webShopLoading } = usePostToWebshop();

  const dotStyle = (status: any) => ({
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
    backgroundColor: status ? 'green' : 'red',
  });

  useEffect(() => {
    fetch({ url: resource, query: JSON.stringify(query) })
      .then(() => {
        if (data?.data) {
          // Log the product data and IDs
          console.log("Fetched Product Data:", data.data);
          data.data.forEach((item: any) => {
            console.log("Product ID:", item.id);
          });
        }
      });
  }, [query, file]);

  useEffect(() => {
    fetchCategories({ url: resource2 })
  }, []);
  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) })
      .then(() => {
        if (data?.data) {
          // Log the product data and IDs
          console.log("Fetched Product Data (refresh):", data.data);
          data.data.forEach((item: any) => {
            console.log("Product ID (refresh):", item.id);
          });
        }
      });
    setDetail(null);
    setSelectedRowKeys([]);
  };


  const updateProducts = async (csvData: any) => {
    const url = `/${resource}/csv`;
    try {
      await edit(url, csvData);
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product `);
    }
  };

  const createProductData = (data: any) => {
    let minSellingPrice = 0;
    if (data?.purchasePrice) {
      const purchasePrice = data?.purchasePrice;
      if (data.platform === "bol.com") {
        const x = 1.42353 + 8.38459;
        let y = purchasePrice * x;

        if (y < 10) {
          minSellingPrice = parseFloat((y + 1.27).toFixed(2));
        } else if (y >= 10 && y < 20) {
          minSellingPrice = parseFloat((y + 1.57).toFixed(2));
        } else if (y >= 20) {
          minSellingPrice = parseFloat((y + 2).toFixed(2));
        } else {
          minSellingPrice = 0;
        }
      } else {
        minSellingPrice = parseFloat((((purchasePrice * 1.42353) + 8.38459) - 5.53).toFixed(2));
      }
    }
    console.log('minSellingPrice', data);
    return minSellingPrice;
  };

  const calculateTotalQuantity = (data: any) => {
    let totalQuantity = 0;
    if (data) {
      for (const item of data) {
        totalQuantity += item.quantity;
      }
      return totalQuantity;
    } else {
      return totalQuantity;
    }
  };



  const downloadCsv = () => {
    // Trigger the fetch on button click with a static query for webshop products
    productFetch({ url: "allproduct", query: JSON.stringify({ isWebshopProduct: true }) });
  };
  
  useEffect(() => {
    if (productData?.data && productData?.data.length > 0) {
      console.log('Product data fetched:', productData?.data);
  
      // Convert data to CSV format
      //@ts-ignore
      const csvData = Papa?.unparse(productData?.data);
      const blob = new Blob([csvData], { type: 'text/csv' });
  
      // Trigger file download
      saveAs(blob, 'products.csv');
    }
  }, [productData]);

  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Confirm Delete",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete the selected products?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          remove(`${resource}`, { _id: selectedRowKeys })
          message.success("Selected products deleted successfully");
          refreshData();
        } catch (error) {
          console.error("Error deleting products:", error);
          message.error("Error deleting products");
        }
      },
    });
  };


  const handleRemoveToWebshop =()=>{
    Modal.confirm({
      title: "Confirm To Remove Webshop",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to remove the selected products?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          update(`${resource}/update-webshop-status`, { productIds: selectedRowKeys ,isWebshopProduct:false})
          message.success("Selected products remove successfully");
          refreshData();
        } catch (error) {
          console.error("Error removing products:", error);
          message.error("Error removing products");
        }
      },
    });
  }
  // const handleStatusChange = (record: any, key: string) => {
  //   setProducts(products.map(product =>
  //     product.id === record.id ? { ...product, status: key } : product
  //   ));
  //   message.success(`Product status changed to ${key}`);
  // };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any[]) => { setSelectedRowKeys(selectedKeys) },
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      render: (images: string[]) => {
        const firstImage = images && images.length > 0 ? images[0] : null;
        return firstImage ? (
          <Avatar shape="square" src={firstImage} />
        ) : (
          <LiaProductHunt size={30} />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Ean Barcode",
      dataIndex: "ean",
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
      render: (data: any) => calculateTotalQuantity(data),
    },
    {
      title: "Supplier Ref",
      dataIndex: "supplierRef",
      sorter: true,
    },
    {
      title: "Selling Price",
      dataIndex: "data",
      sorter: true,
      render: (text: any, record: any) => createProductData(record),
    },
    {
      title: "Platform",
      dataIndex: "platform",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
            //  onClick={({ key }) => handleStatusChange(record, key)}
             >
               <Menu.Item key="3">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, active: true })}
                >
                  {record.status ? "INACTIVE" : "ACTIVE"}
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
          <span style={dotStyle(record.status)}></span>
          {/* {record.status ? "ACTIVE" : "INACTIVE"} */}
          <DownOutlined />
          </Button>
        </Dropdown>
      ),
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
                  onClick={() => setDetail({ ...record, view: true })}
                >
                  VIEW
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, edit: true })}
                >
                  EDIT
                </Button>
              </Menu.Item>
              <Menu.Item key="4">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, delete: true })}
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

  const dropdownMenu = (
    <Menu
      onClick={({ key }) => {
        if (key !== "Filter Options") {
          setQuery((prevQuery) => ({ ...prevQuery, filterKey: key }));
        }
      }}
    >
      <Menu.Item key="Filter Options">Filter Options</Menu.Item>
      <Menu.Item key="images">Product has no image</Menu.Item>
      <Menu.Item key="color">Product has no color</Menu.Item>
      <Menu.Item key="size">Product has no size</Menu.Item>
      <Menu.Item key="categories">Product has no category</Menu.Item>
      <Menu.Item key="subCategories">Product has no sub category</Menu.Item>
      <Menu.Item key="subSubCategories">Product has no sub sub category</Menu.Item>
    </Menu>
  );

  return (
    <div className=" d-flex flex-column">
      <Breadcrumbs pageName="Webshop Products" />
      <div className="headerRight">
        <Space>
          <Dropdown overlay={dropdownMenu}>
            <Button type="primary">
              {query.filterKey !== "Filter Options" ? query.filterKey : "Select Filter"} <DownOutlined />
            </Button>
          </Dropdown>
          <Button onClick={downloadCsv} type="primary">
            {/* <CSVLink data={csvData} filename={"stock_product.csv"}> */}
              Download Stock CSV
            {/* </CSVLink> */}
          </Button>
          {selectedRowKeys.length > 0 && (
            <>
              <Button
                type="primary"
                danger
                onClick={handleDeleteSelected}
                loading={deleteLoading}
              >
                Delete Selected
              </Button>

              <Button
            onClick={handleRemoveToWebshop}
            style={{backgroundColor:"#1677ff",  color:"white"}}
            >
            Not Allow Webshop
            </Button>
            </>
          )}
        </Space>
      </div>
      {/* <div className="fixed">
        <Button
          type="primary"
          onClick={() => setDetail({ add: true })}
          className="addButton"
        >
          ADD
        </Button>
      </div> */}
      <div className="viewDetails">
        <Input
          autoFocus
          placeholder="title / barcode / scancode / supplierref / brand / supplier / location"
          value={search}
          onChange={(obj) => {
            setSearch(obj.target.value);
            setQuery({ ...query, search: obj.target.value });
          }}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        className="mainTable"
        loading={loading}
        dataSource={data?.data.map((item: any) => ({
          ...item,
          key: item._id,
        })) ?? []}
        columns={columns}
        pagination={{
          showQuickJumper: true,
          total: data?.data.length,
          onChange: (page, pageSize) => {
            setQuery({ ...query, skip: (page - 1) * pageSize, take: pageSize });
          },
        }}
        scroll={{ x: 'max-content' }}
      />
      {detail && detail.add && (
        <CreateDataDrawer
          resource={resource}
          close={refreshData}
          FormData={FormData}
          categoryData={categoryData}
          data={detail}
        />
      )}
      {detail && detail.edit && (
        <EditDataDrawer
          resource={resource}
          close={refreshData}
          FormData={FormData}
          categoryData={categoryData}
          data={detail}
        />
      )}
      {detail && detail.delete && (
        <DeleteDataModal
          resource={resource}
          close={refreshData}
          data={detail}
        />
      )}
      {detail && detail.active && (
        <StatusDataModal
          resource={resource}
          close={refreshData}
          data={detail}
        />
      )}
      {detail && detail.view && (
        <ViewDataDrawer
          resource={resource}
          close={refreshData}
          ViewData={ViewData}
          data={detail}
        />
      )}
    </div>
  );
}
