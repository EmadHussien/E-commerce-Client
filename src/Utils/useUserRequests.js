import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import getNewAccessToken from "./getNewAccessToken";
import { setNewToken } from "../redux/userSlice";

export default function useUserRequests() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.currentUser?.accessToken);

  // creating axios object for user requests
  const userRequests = axios.create({
    baseURL: "https://e-commerce-backend-two-rouge.vercel.app",
    withCredentials: true,
  });

  // Add a request interceptor
  userRequests.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await getNewAccessToken();
        dispatch(setNewToken(data));

        config.headers["Authorization"] = "Bearer " + data;
      } else {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return { userRequests };
}
