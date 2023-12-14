/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function LogginGuard({ children }) {
  const user = useSelector((state) => state.user.currentUser);
  return user ? <Navigate to="/" replace={true} /> : children;
}
