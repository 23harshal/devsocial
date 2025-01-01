const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about, gender } = user;

  return (
    <div className=" mx-auto my-5 card w-[380px] h-[500px] rounded-3xl overflow-hidden relative bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-xl transform hover:scale-105 transition-all ease-in-out duration-500">
      {/* User's photo section with smooth border radius and zoom effect */}
      <figure className="h-2/3 overflow-hidden rounded-t-3xl relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover rounded-t-3xl transform hover:scale-110 transition-all duration-500"
        />
        {/* Circular overlay to simulate a lens focus effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-white opacity-20 rounded-full"></div>
      </figure>

      {/* Gradient overlay to create depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-t-3xl"></div>

      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 p-6 flex flex-col justify-between">
        {/* User's Name, Gender, and Age */}
        <div className="text-white text-center mt-4 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-wide">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h2>
          <div className="flex justify-center items-center space-x-4 mt-3">
            <span className="text-2xl font-semibold">{age} years old</span>
            <span
              className={`px-4 py-2 rounded-full text-lg font-medium ${
                gender === "male"
                  ? "bg-blue-600 text-white"
                  : "bg-pink-600 text-white"
              }`}
            >
              {gender || "Not specified"}
            </span>
          </div>
        </div>

        {/* About section with refined text */}
        <div className="text-white mt-6 flex justify-center">
          <p className="text-lg text-center px-6">
            {about || "No information provided."}
          </p>
        </div>

        {/* Buttons for "Interested" and "Ignore" with smooth animations and modern design */}
        <div className="flex justify-around mt-8 space-x-4">
          <button className="btn btn-danger text-white w-24 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-2xl">
            Nope
          </button>
          <button className="btn btn-success text-white w-24 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-110 shadow-2xl">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
