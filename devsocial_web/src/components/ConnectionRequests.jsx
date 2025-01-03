import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/slices/requestSlice";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      console.log(response);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="bg-gray-900 min-h-screen py-10 text-gray-200">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
          Connection Requests
        </h1>
        <div className="space-y-6">
          {requests &&
            requests.map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;
              return (
                <div
                  key={_id}
                  className="flex flex-col md:flex-row items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md mb-4 md:mb-0">
                    <img
                      src={photoUrl}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 md:ml-6 text-center md:text-left">
                    <h2 className="text-xl font-semibold text-gray-100">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-gray-400">
                      {age} years old, {gender}
                    </p>
                    <p className="text-gray-300 mt-2">{about}</p>
                  </div>
                  <div className="flex mt-4 md:mt-0 md:ml-6 space-x-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg transition-all duration-300"
                      onClick={() => reviewRequest(request._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-red-500 hover:shadow-lg transition-all duration-300"
                      onClick={() => reviewRequest(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequests;

// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequest } from "../store/slices/requestSlice";
// const ConnectionRequests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((state) => state.requests);
//   const getRequests = async () => {
//     try {
//       const response = await axios.get(BASE_URL + "/user/request/received", {
//         withCredentials: true,
//       });
//       //console.log(response);
//       dispatch(addRequest(response.data.connectionRequests));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getRequests();
//   }, []);

//   return (
//     <div className="text-center">
//       <div>
//         <h1 className="text-bold text-2xl">Connection Requests </h1>
//       </div>
//       <div>
//         {requests &&
//           requests.map((request) => {
//             const { _id, firstName, lastName, photoUrl, age, gender, about } =
//               request.fromUserId;
//             return (
//               <div key={request._id}>
//                 <div>
//                   <img src={photoUrl} alt="profile" />
//                 </div>
//                 <div>
//                   <h2>
//                     {firstName} {lastName}
//                   </h2>
//                   <p>
//                     {age} years old, {gender}
//                   </p>
//                   <p>{about}</p>
//                 </div>
//                 <div>
//                   <button>Accepted</button>
//                   <button>Rejected</button>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default ConnectionRequests;
