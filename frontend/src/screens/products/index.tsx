"use client";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Space,
  Input,
  Button,
  Dropdown,
  Menu,
  Upload,
  message,
} from "antd";
import { LoadingOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import { CiMenuKebab } from "react-icons/ci";
import { ViewDataDrawer, EditDataDrawer, DeleteDataModal, StatusDataModal } from "../../components/Forms";
import { CSVLink } from "react-csv";
import Papa from 'papaparse';

const resource = "products";

export default function Lists() {
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState({ skip: 0, take: 10, search: "", filterKey: "Filter Options" });
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Sample JSON Data
  const [data, setData] = useState<any>({
    data: [
      {
        id: 1,
        title: "Product 1",
        price: 25.99,
        ean: "1234567890123",
        stores: [{ location: "Location 1", qty: 10, laps: 2 }],
        supplierRef: "Supplier 1",
        minSellingPrice: 30.00,
        platform: "bol.com",
        images: "https://example.com/image1.jpg",
        sku: "SKU1234",
        language: "EN",
        categories: "Category 1",
        subCategories: "SubCategory 1",
        subSubCategories: "SubSubCategory 1",
        tags: "Tag 1",
        weight: "1kg",
        taxValue: "21%",
        brand: "Brand 1",
        supplier: "Supplier 1",
        scanCode: "SCAN1234",
        purchasePrice: 20.00,
        colors: "Red",
        size: "M"
      },
      {
        id: 2,
        title: "Product 2",
        price: 15.99,
        ean: "1234567890124",
        stores: [{ location: "Location 2", qty: 5, laps: 1 }],
        supplierRef: "Supplier 2",
        minSellingPrice: 20.00,
        platform: "bol.com",
        images: "https://example.com/image2.jpg",
        sku: "SKU5678",
        language: "EN",
        categories: "Category 2",
        subCategories: "SubCategory 2",
        subSubCategories: "SubSubCategory 2",
        tags: "Tag 2",
        weight: "500g",
        taxValue: "21%",
        brand: "Brand 2",
        supplier: "Supplier 2",
        scanCode: "SCAN5678",
        purchasePrice: 12.00,
        colors: "Blue",
        size: "L"
      }
    ],
    total: 2
  });

  const refreshData = () => {
    // Fetch or refresh data here
    setDetail(null);
  };

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
            csvData = csvData?.filter((data: any) => data.ean);
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
      // Simulate API call
      console.log("Updating products with data:", csvData);
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product`);
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

  const downloadCsv = () => {
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
    </Menu>
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.data.map((item: any) => item.id) || []);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, skip: (page - 1) * query.take, take: query.take });
    setCurrentPage(page);
  };

  useEffect(() => {
    if (data?.data) {
      setTotalPages(Math.ceil(data.total / query.take));
    }
  }, [data, query.take]);

  return (
    <>
      <Breadcrumbs pageName="Products" />
      <div className="headerRight">
        <Space>
          {selectedItems.length > 0 && (
            <Button
              onClick={() => setDetail({ delete: { ids: selectedItems } })}
              style={{ backgroundColor: "red", color:"white" }}
            >
              Delete Selected
            </Button>
          )}
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
          <Upload
            showUploadList={false}
            customRequest={handleFileUpload}
          >
            <Button
              type="primary"
              icon={loadingFiles ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Import File
            </Button>
          </Upload>

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
            {data?.data.map((item: any) => (
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
                <td>{calculateTotalQuantity(item.stores)}</td>
                <td>{item.supplierRef}</td>
                <td>{createProductData(item)}</td>
                <td>{item.platform}</td>
                <td>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1">
                          <Button
                            type="link"
                            onClick={() => setDetail({ view: item })}
                          >
                            View
                          </Button>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <Button
                            type="link"
                            onClick={() => setDetail({ edit: item })}
                          >
                            Edit
                          </Button>
                        </Menu.Item>
                        <Menu.Item key="3">
                          <Button
                            type="link"
                            onClick={() => setDetail({ delete: item })}
                          >
                            Delete
                          </Button>
                        </Menu.Item>
                        <Menu.Item key="4">
                          <Button
                            type="link"
                            onClick={() => setDetail({ active: item })}
                          >
                            Active
                          </Button>
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <CiMenuKebab />
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%" }}>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous" style={{ cursor: "pointer" }} >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className={`page-item`}>
              <a className="page-link" style={{ cursor: "pointer" }}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next" style={{ cursor: "pointer" }}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          <p>Showing {query.skip + 1} to {Math.min(query.skip + query.take, data?.total || 0)} of {data?.total || 0} entries</p>
        </nav>
      </div>

      {detail?.view && (
        <ViewDataDrawer
          open={detail?.view}
          onClose={() => setDetail(null)}
          detail={detail}
          resource={resource}
        />
      )}
      {detail?.edit && (
        <EditDataDrawer
          open={detail?.edit}
          onClose={() => setDetail(null)}
          detail={detail}
          resource={resource}
          refreshData={refreshData}
        />
      )}
      {detail?.delete && (
        <DeleteDataModal
          open={detail?.delete}
          onClose={() => setDetail(null)}
          detail={detail}
          resource={resource}
          refreshData={refreshData}
        />
      )}
      {detail?.active && (
        <StatusDataModal
          open={detail?.active}
          onClose={() => setDetail(null)}
          detail={detail}
          resource={resource}
          refreshData={refreshData}
        />
      )}
    </>
  );
}
