import { Outlet } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu.jsx";
import { BoxPlotOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import "./Manager.css";

function Manager() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const menuItems = [
    getItem("Employees", "users", <UserOutlined />),
    getItem("Menu", "menu", <BookOutlined />),
    getItem("Tables", "tables", <BoxPlotOutlined />),
  ];
  return (
    <div className="Manager">
      <SideMenu menuItems={menuItems} />
      <Outlet />
    </div>
  );
}

export default Manager;
