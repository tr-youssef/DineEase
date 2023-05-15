import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth.jsx";
import App from "../App.jsx";
import Manager from "../pages/manager/Manager.jsx";
import Menu from "../pages/manager/menu/Menu.jsx";
import Tables from "../pages/manager/tables/Tables.jsx";
import Users from "../pages/manager/users/Users.jsx";
import Category from "../pages/manager/menu/category/Category.jsx";
import Items from "../pages/manager/menu/items/Items.jsx";
import TakeOrder from "../pages/server/TakeOrder/TakeOrder.jsx";
import SignIn from "../pages/login/SignIn.jsx";
import Server from "../pages/server/Server.jsx";
import Chef from "../pages/chef/Chef.jsx";
import Receptionist from "../pages/receptionist/Receptionist";
import AddForm from "../pages/manager/users/AddForm/AddForm.jsx";
import AddTable from "../pages/manager/tables/AddTable/AddTable.jsx";
import EditForm from "../pages/manager/users/EditForm/EditForm.jsx";
import EditTable from "../pages/manager/tables/EditTable/EditTable";
import ReceiptPDF from "../components/ReceiptPDF/ReceiptPDF";

const router = createBrowserRouter([
  { path: "/signin", element: <SignIn /> },
  {
    path: "/",
    element: (
      <RequireAuth isAllowed={"all"}>
        <App />
      </RequireAuth>
    ),
  },
]);
export default router;
