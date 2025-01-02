import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../store/slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector((state) => state.connections);

  const getConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (userConnections === null || userConnections.length === 0) {
    return (
      <div className="text-3xl font-bold text-center mt-10">
        No connections found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userConnections.map((connection) => (
          <div
            key={connection._id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {connection.age} years old, {connection.gender}
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-sm line-clamp-3">
              {connection.about || "No description available."}
            </p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
