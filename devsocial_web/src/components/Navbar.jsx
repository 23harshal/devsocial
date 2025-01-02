import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300"
        >
          Dev Social
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4 flex items-center">
          {/* Welcome Message */}
          <span className="text-white font-medium hidden md:block">
            Welcome, {user.firstName || "User"}!
          </span>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end relative">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-4 hover:ring-yellow-300"
            >
              <div className="w-12 rounded-full overflow-hidden ring-2 ring-white">
                <img
                  alt="Profile Avatar"
                  src={
                    user.avatar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-lg mt-3 shadow-lg w-60 p-2 z-[1] animate-fade-in"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded-lg"
                >
                  <span className="material-icons">person</span>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded-lg"
                >
                  <span className="material-icons">people</span>
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded-lg"
                >
                  <span className="material-icons">mail</span>
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full hover:bg-red-100 p-2 rounded-lg text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../store/slices/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
//       dispatch(removeUser());
//       return navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="navbar bg-neutral-content">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-primary text-xl">
//           Dev Social
//         </Link>
//       </div>
//       {user && (
//         <div className="flex-none gap-2 mx-5">
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/connections">Connctions</Link>
//               </li>
//               <li>
//                 <Link to="/requests">Requests</Link>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
