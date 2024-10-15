import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import EmailSetting from "./emailSetting/EmailSetting";
import JournalSetting from "./journalSetting/JournalSetting";

// Dummy components for EmailSetting and JournalSetting
// const EmailSetting: React.FC = () => <div>Email Settings Content</div>;
// const JournalSetting: React.FC = () => <div>General Settings Content</div>;

const Setting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("email"); // Default tab

  return (
    <div className="d-flex flex-column">
      <Breadcrumbs pageName="Setting" />
      <div className="container mt-4">
        {/* Search form */}
        {/* <div className="mb-4">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Search by name, email, or phone"
            />
          </div>
        </div> */}

        {/* Tab navigation */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "email" ? "active" : ""}`}
              onClick={() => setActiveTab("email")}
              style={{
                borderBottom: activeTab === "email" ? "3px solid #007bff" : "",
                fontWeight: activeTab === "email" ? "bold" : "normal",
              }}
            >
              Email Setting
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "General" ? "active" : ""}`}
              onClick={() => setActiveTab("General")}
              style={{
                borderBottom: activeTab === "General" ? "3px solid #007bff" : "",
                fontWeight: activeTab === "General" ? "bold" : "normal",
              }}
            >
              General Setting
            </button>
          </li>
        </ul>

        {/* Tab content */}
        <div>
          {activeTab === "email" && <EmailSetting />}
          {activeTab === "General" && <JournalSetting />}
        </div>
      </div>
    </div>
  );
};

export default Setting;
