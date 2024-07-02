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
  Upload,
  message,
} from "antd";
import { LoadingOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import { LiaProductHunt } from "react-icons/lia";
import { usePostFile, useFetchByLoad, usePatch } from "../../contexts";
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
import axios from "axios";
import Papa from 'papaparse';
import { useEffect, useState } from "react";
const resource = "products";

export default function Lists() {
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);
  const { create, data: file, loading: loadingFile } = usePostFile();
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options" });
  const { fetch, data, loading } = useFetchByLoad();
  const { edit, data: patchData, loading: patchLoading } = usePatch();
  console.log("patchData", patchData);
  // Sample Data all code for checkbox starts from here

  const [items, setItems] = useState([
    { id: 1, title: "title1", price: "price1", stock: 1, supplierRef: "ref1", sellingPrice: "price1", platform: "platform1" },
    { id: 2, title: "title2", price: "price2", stock: 1, supplierRef: "ref2", sellingPrice: "price2", platform: "platform2" },
    { id: 3, title: "title3", price: "price3", stock: 1, supplierRef: "ref3", sellingPrice: "price3", platform: "platform3" },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    fetch({ url: resource, query: JSON.stringify(query) });
  }, [query, file]);

  const refreshData = () => {
    fetch({ url: resource, query: JSON.stringify(query) });
    setDetail(null);
  };

  console.log("query", query);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const handleFileUpload = ({ file }: any) => {
    setLoadingFiles(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        Papa.parse(text, {
          header: true,
          complete: async (results: any) => {
            let csvData = results.data;
            csvData = csvData?.filter((data: any) => data.ean)
            console.log("Parsed CSV Data:", csvData);
            await updateProducts(csvData);
            setLoadingFiles(false);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoadingFiles(false);
          },
        });
      }
    };
    reader.readAsText(file);
  };


  const updateProducts = async (csvData: any) => {
    const url = `/${resource}/csv`;
    try {
      edit(url, csvData);
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product `);
    }
  }

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
    console.log('minSellingPrice', minSellingPrice);
    return minSellingPrice;
  };

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
  };

  const [csvData, setCsvData] = useState([]);

  const downloadCsv = () => {
    fetch({ url: "allproduct", query: JSON.stringify("") });
    const stockData = data?.data?.filter((item: any) => item.stores.length > 0);
    if (data?.data?.length > 10 && stockData?.length > 0) {
      const csvDataFormatted = stockData.map((item: any) => {
        const storeInfo = item.stores.map((store: any) => {
          return `Location: ${store.location}, Quantity: ${store.qty}, Laps: ${store.laps}`;
        }).join('\n');
        return {
          Title: item.title || "",
          EanBarcode: item.ean || "",
          Price: item.price || "",
          TotalStock: calculateTotalQuantity(item.stores) || "",
          SellingPrice: item.minSellingPrice || "",
          SupplierRef: item.supplierRef || "",
          Platform: item.platform || "",
          StoreInfo: storeInfo,
          Image: item.images || "",
          Sku: item.sku || "",
          Language: item.language || "",
          Categories: item.categories || "",
          SubCategories: item.subCategories || "",
          SubSubCategories: item.subSubCategories || "",
          Tags: item.tags || "",
          Weight: item.weight || "",
          TaxValue: item.taxValue || "",
          Brand: item.brand || "",
          Supplier: item.supplier || "",
          ScanCode: item.scanCode || "",
          PurchasePrice: item.purchasePrice || "",
          Colors: item.colors || "",
          Size: item.size || "",
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
      title: "supplierRef",
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
              <Menu.Item key="3">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, active: true })}
                >
                  {record.status ? "INACTIVE" : "ACTIVE"}
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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(items.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    setItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.id)));
    setSelectAll(false);
    setSelectedItems([]);
  };

  return (
    <>
      <Breadcrumbs pageName="Products" />
      <div className="headerRight">
        <Space>
          <Dropdown overlay={dropdownMenu}>
            <Button type="primary">
              {query.filterKey !== "Filter Options" ? query.filterKey : "Select Filter"} <DownOutlined />
            </Button>
          </Dropdown>
          <Button onClick={downloadCsv} type="primary">
            <CSVLink data={csvData} filename={"stock_product.csv"}>
              Download Stock CSV
            </CSVLink>
          </Button>
          {/* <Upload
            showUploadList={false}
            customRequest={({ file }) => create("products/import_img", file)}
          >
            <Button
              type="primary"
              icon={loadingFile ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Import Images
            </Button>
          </Upload> */}
          <Upload
            showUploadList={false}
            customRequest={handleFileUpload}
          >
            <Button
              type="primary"
              icon={loadingFile ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Import File
            </Button>
          </Upload>
          {/* Conditional rendering for the delete button */}
          {selectedItems.length > 0 && (
            <Button
              onClick={handleDelete}
              className="ml-2 bg-danger"
              style={{color:"white"}}
            >
              Delete Product
            </Button>
          )}
        </Space>
      </div>
      <div className="fixed">
        <Button
          type="primary"
          onClick={() => setDetail({ add: true })}
          className="addButton"
        >
          ADD
        </Button>
      </div>
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

      <div style={{ padding: "1rem" }}>
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr className='bg-info'>
              <th>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Total Stock</th>
              <th>SupplierRef</th>
              <th>Selling Price</th>
              <th>Platform</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.supplierRef}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.platform}</td>
                <td>Actions</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%" }}>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          <p>Showing 1 to 2 of entries</p>
        </nav>
      </div>

      {detail && detail.add && (
        <CreateDataDrawer
          resource={resource}
          close={refreshData}
          FormData={FormData}
          data={detail}
        />
      )}
      {detail && detail.edit && (
        <EditDataDrawer
          resource={resource}
          close={refreshData}
          FormData={FormData}
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
    </>
  );
}
