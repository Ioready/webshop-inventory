import { useContext } from "react";
import { MainContext } from "../../../contexts/mainProvider";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const Dashboard = () => {
  const { sidebar } = useContext(MainContext)
  return (
    <>
      <div className="page-wraper">
        <Header />
        <Sidebar />
        <div id="content" className={sidebar ? "active" : ''}><Outlet /></div>
      </div>
    </>
  );
};

export default Dashboard;