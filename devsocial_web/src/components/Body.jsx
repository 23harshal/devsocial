import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      //console.log(response.data.user);
      dispatch(addUser(response.data.user));
    } catch (err) {
      console.log(err);
      return navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Body;
