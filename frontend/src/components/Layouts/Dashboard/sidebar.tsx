import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiBarcode } from "react-icons/ci";
import { Popconfirm } from 'antd';
import { LiaProductHunt } from "react-icons/lia";
import { IoPeople } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { FaCartFlatbed } from "react-icons/fa6";
import { MainContext } from "../../../contexts/mainProvider";
import { IoIosSettings } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";


export const Sidebar = () => {
  const navigate = useNavigate();
  const { labels, logout, user, sidebar, setSidebar } = useContext(MainContext)
  
  let menuItems: any = [
    {
      icon: <MdDashboard />,
      label: "Dashboard",
      value: "dashboard",
      isShow: true,
    },
    {
      icon: <FaProductHunt />,
      label: "PRODUCTS",
      value: "",
      isShow: true,
    },
    {
      icon: <MdDocumentScanner />,
      label: "SCANNER",
      value: "scanner",
      isShow: true,
    },
    {
      icon: <FiPackage />,
      label: "ORDERS",
      value: "order",
      isShow: true,
    },
    {
      icon: <FaCartFlatbed />,
      label: "WEBSHOP PRODUCTS",
      value: "webshop-product",
      isShow: true,
    },
    {
      icon: <IoPeople />,
      label: "Customers",
      value: "customer",
      isShow: true,
    },
    {
      icon: <FaClipboardList />,
      label: "Enqury",
      value: "enqury",
      isShow: true,
    },
    {
      icon: <MdDashboardCustomize />,
      label: "Manage Category",
      value: "manage-category",
      isShow: true,
    },
    {
      icon: <MdDashboardCustomize />,
      label: "Content Management",
      value: "cms",
      isShow: true,
    },
    {
      icon: <MdDashboardCustomize />,
      label: "Setting",
      value: "setting",
      isShow: true,
    },
    // {
    //   icon: <FaShoppingCart />,
    //   label: "Sales Return",
    //   value: "sales",
    //   isShow: true,
    // }
  ];

  return (
    <nav id="sidebar-admin-wraper" className={sidebar ? "active" : ''}>
      <div className="my-account-logo">
        <NavLink to="/">
          <img src="images/logo.png" alt="" />
        </NavLink>
        <span>{labels.sitename}</span>
      </div>

      <div className="admin-nav scrollbar-inner overflow-hide overflow-y-auto">
        <ul>
          {menuItems.map((item: any, key: any) => {
            if (item.isShow) {
              return (<li key={key} className="">
                <NavLink onClick={() => setSidebar(false)} to={`/${item.value}`}>{item.icon}<span
                  className="admin-nav-text">{item.label}</span></NavLink>
              </li>);
            }
          })}
        </ul>
      </div>
      <div className="admin-logout-area">
        <div className="pro-pic-info-wrap d-flex">
          <div className="pro-log-left d-flex">
            <div className="pro-pic-box">
              {user?.image ? <img src={user?.image} alt="" /> : <FaRegUserCircle color="#000" size={30} />}
            </div>
            <div className="pro-pic-info">
              <strong>{user?.name ?? ""}</strong>
              <span>{user?.role ?? ""}</span>
            </div>
          </div>
          <div className="pro-log-right d-flex">
            <Popconfirm
              title="Logout"
              description="Are you sure to Logout?"
              onConfirm={() => { logout(); navigate('/login') }}
              okText="Yes"
              cancelText="No"
            >
              <span className="feather-icon has-toltip">
                <div><IoIosSettings /></div>
                <span className="header-toltip">Logout</span>
              </span>
            </Popconfirm>
          </div>
        </div>
      </div>
    </nav>
  );
};