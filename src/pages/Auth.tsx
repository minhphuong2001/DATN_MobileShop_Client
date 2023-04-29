import React from "react";
import { useRoutes } from "react-router-dom";
import UserDashboard from "../feature/auth/UserDashboard";
import UserOrderList from "../feature/auth/UserOrderList";
import UserOrderDetail from "../feature/auth/UserOrderDetail";
import UserPage from "./User";
import UpdateInfo from "../feature/auth/UpdateInfo";

const routes = [
  {
    path: "/tai-khoan",
    element: <UserPage />,
    children: [
      { path: "/tai-khoan", element: <UserDashboard /> },
      { path: "/tai-khoan/don-mua", element: <UserOrderList /> },
      { path: "/tai-khoan/don-mua/:id", element: <UserOrderDetail /> },
      { path: "/tai-khoan/cap-nhat-tai-khoan", element: <UpdateInfo /> },
    ],
  },
];

export default function AuthPage() {
  const elements = useRoutes(routes);

  return <div>{elements}</div>;
}
