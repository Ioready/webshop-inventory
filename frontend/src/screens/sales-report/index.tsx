"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Table,
  Space,
  Input,
  Button,
  Avatar,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { LiaProductHunt } from "react-icons/lia";
import { usePostFile, useFetchByLoad } from "../../contexts";

const resource = "products";

export default function ProductList() {
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<string>("");

  // File upload
  const { create, data: fileData, loading: fileLoading } = usePostFile();

  // Data fetching
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "" });
  const { fetch, data, loading } = useFetchByLoad();

  useEffect(() => {
    fetch({ url: resource, query: JSON.stringify(query) });
  }, [query, fileData]);

  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) });
    setDetail(null);
  };

  const calculateTotalQuantity = (data: any) => {
    let totalQuantity = 0;
    if (data) {
      data.forEach((item: any) => {
        totalQuantity += parseInt(item.qty) - parseInt(item.laps);
      });
    }
    return totalQuantity;
  };

  const [csvData, setCsvData] = useState<any[]>([]);

  const downloadCsv = () => {
    fetch({ url: "allproduct", query: JSON.stringify("") });
    const stockData = data?.data?.filter((item: any) => item.stores.length > 0);
    if (data?.data?.length > 10 && stockData?.length > 0) {
      const csvDataFormatted = stockData.map((item: any) => {
        const storeInfo = item.stores.map((store: any) => {
          return `Location: ${store.location}, Quantity: ${store.qty}, Laps: ${store.laps}`;
        }).join("\n");
        return {
          Title: item.title || "",
          EanBarcode: item.ean || "",
          Price: item.price || "",
          TotalStock: calculateTotalQuantity(item.stores) || "",
          SellingPrice: item.minSellingPrice || "",
          SupplierRef: item.supplierRef || "",
          Platform: item.platform || "",
          StoreInfo: storeInfo,
          Image:item.images || "",
        };
      });
      setCsvData(csvDataFormatted);
    } else {
      console.log("No data to export");
    }
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
      title: "Product Name",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Ean Barcode",
      dataIndex: "ean",
      sorter: true,
    },
   
    {
      title: "platform",
      dataIndex: "",
      sorter: true,
    },
    {
      title: "Sold Amount",
      dataIndex: "",
      sorter: true,
    },
   
    {
      title: "Sold Qty",
      dataIndex: "",
      sorter: true,
    },
    {
      title: "InStock Qty",
      dataIndex: "stores",
      render: (stores: any) => calculateTotalQuantity(stores),
    },
  ];

  return (
    <>
      <Breadcrumbs pageName="Products" />
      <div className="headerRight">
        <Space>
          <Button onClick={downloadCsv} type="primary">
            <CSVLink data={csvData} filename={"stock_product.csv"}>
              Download Stock CSV
            </CSVLink>
          </Button>

          <Upload
            showUploadList={false}
            customRequest={({ file }) => create("products/import_img", file)}
          >
            <Button
              type="primary"
              icon={fileLoading ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Import Images
            </Button>
          </Upload>
          <Upload
            showUploadList={false}
            customRequest={({ file }) => create("products/import", file)}
          >
            <Button
              type="primary"
              icon={fileLoading ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Import File
            </Button>
          </Upload>
        </Space>
      </div>

      <div className="viewDetails">
        <Input
          autoFocus
          placeholder="Title / Barcode / Scan code / Supplier Ref / Brand / Supplier / Location"
          value={search}
          onChange={(e) => {
            const searchValue = e.target.value;
            setSearch(searchValue);
            setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
          }}
        />
      </div>

      <Table
        className="mainTable"
        loading={loading}
        dataSource={data?.data ?? []}
        columns={columns}
        pagination={{
          showQuickJumper: true,
          total: data?.count ?? 0,
          onChange: (page, pageSize) => {
            setQuery((prevQuery) => ({
              ...prevQuery,
              skip: (page - 1) * pageSize,
              take: pageSize,
            }));
          },
        }}
      />
    </>
  );
}
