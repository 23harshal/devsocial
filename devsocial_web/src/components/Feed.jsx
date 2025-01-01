import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/slices/feedSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      //console.log(response);
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
