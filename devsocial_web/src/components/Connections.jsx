import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../store/slices/connectionSlice";
import { Link } from "react-router-dom";

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
      <div className="text-3xl font-bold text-center mt-10 text-gray-300">
        No connections found
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        Your Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {userConnections.map((connection) => (
          <div
            key={connection._id}
            className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Section */}
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={connection.photoUrl}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {connection.age} years old, {connection.gender}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-300 text-sm line-clamp-3">
                {connection.about || "No description available."}
              </p>
            </div>
            {/* Buttons Section */}
            <div className="border-t border-gray-700 p-4 bg-gray-900 flex space-x-3">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring focus:ring-indigo-500">
                View Profile
              </button>
              <Link to={"/chat/" + connection._id} className="flex-1">
                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring focus:ring-green-400">
                  Chat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
