import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about, gender } = user;

  return (
    <div className="mx-auto my-5 card w-[380px] h-[530px] rounded-3xl overflow-hidden relative bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-xl transition-transform duration-300 hover:scale-105">
      {/* Full Image Background */}
      <div className="absolute inset-0">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover blur-md transform scale-105" // Slight blur for background
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Dark overlay for contrast */}
      </div>

      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {/* User's photo section */}
        <figure className="flex justify-center items-center h-1/2">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-[220px] h-[220px] object-cover rounded-full border-4 border-white shadow-md"
          />
        </figure>

        {/* User's Name, Gender, and Age */}
        <div className="text-white text-center space-y-3">
          <h2 className="text-2xl font-bold tracking-wide">
            {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
          </h2>
          <div className="flex justify-center items-center space-x-3">
            <span className="text-lg font-medium">{age} years old</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                gender === "male"
                  ? "bg-blue-500 text-white"
                  : "bg-pink-500 text-white"
              }`}
            >
              {gender || "Not specified"}
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="text-white mt-3 flex justify-center overflow-y-auto max-h-20 px-4">
          <p className="text-sm leading-relaxed text-center">
            {about || "No additional information provided."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="w-24 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Nope
          </button>
          <button className="w-24 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
