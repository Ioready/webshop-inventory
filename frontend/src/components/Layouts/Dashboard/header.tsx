import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout, CiMenuFries } from "react-icons/ci";
import { Popconfirm } from 'antd';
import { MainContext } from "../../../contexts/mainProvider";

export const Header = () => {
  const { logout, sidebar, setSidebar, user } = useContext(MainContext)

  const navigate = useNavigate();

  return (
    <header id="header-admin-wrap" className="header-admin-fixed">

      {/* Header Start */}
      <div id="header-admin" className={sidebar ? "active" : ''}>
        <div className="container">

          {/* Left Side Content */}
          <div className="header-left">

            <a onClick={() => setSidebar(!sidebar)} className="nav-btn-admin" id="sidebarCollapse">
              <CiMenuFries />
            </a>

            <div className="header-widget aon-admin-search-box">
              <div className="aon-admin-search ">
                <input className="form-control sf-form-control" name="company_name" type="text"
                  placeholder="Search" />
                <button className="admin-search-btn"><i className="fs-input-icon feather-search"></i></button>
              </div>
            </div>

          </div>
          {/* Left Side Content End */}

          {/* Right Side Content */}
          <div className="header-right">
            <ul className="header-widget-wrap">
              <li className="header-widget">
                <div className="aon-admin-messange">
                  <Popconfirm
                    title="Logout"
                    description="Are you sure to Logout?"
                    onConfirm={() => { logout(); navigate('/login') }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="feather-user-pic">{user?.image ? <img src={user?.image} alt="" /> : <CiLogout color="#000" size={30} />}</span>
                  </Popconfirm>
                </div>
                <div className="ws-toggle-popup popup-tabs-wrap-section user-welcome-area">
                  <div className="popup-tabs-head d-flex justify-content-between align-items-center">
                    <div className="popup-tabHead-left">
                      <h5 className="m-a0">{user?.name ?? ""}</h5>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* Right Side Content End */}

        </div>
      </div>
      {/* Header End */}

    </header>
  );
};
