import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Myprofile = () => {
  const { userData, setUserData, updateUserProfile } = useContext(AppContext);

  const [isEdit, SetisEdit] = useState(false);
  if (!userData) return <p>Loading profile...</p>;
  const handleSave = async () => {
    await updateUserProfile();
    SetisEdit(false);
  };
 

  console.log("userData", userData);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm bg-gray-200 w-full rounded-lg px-4 py-4 mt-10">
      <img className="w-36 rounded  " src={userData.image} alt="" />
      {isEdit ? (
        <input
          className="bg-gray-50 border border-gray-400 rounded-sm text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-px border-none" />
      <div>
        <h1 className="text-neutral-800 underline mt-3">Contact Information</h1>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium ">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone No.</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="bg-gray-100 max-w-52 border border-gray-400 rounded-sm"
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address</p>
          {isEdit ? (
            <p>
              <input
                type="text"
                className=" bg-gray-50 border border-gray-400 rounded-sm mb-2 text-gray-600"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                type="text"
                className=" bg-gray-50 border border-gray-400 rounded-sm text-gray-600"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-neutral-800 underline mt-3 ">BASIC INFORMATION</h1>
        <hr className="bg-zinc-400 h-px border-none" />
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 text-gray-600"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-600 ">{userData.gender}</p>
          )}

          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 text-gray-600"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-600 ">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full text-black hover:bg-primary hover:text-white transition-all duration-200"
            onClick={handleSave}
          >
            {" "}
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full text-black hover:bg-primary hover:text-white transition-all duration-200"
            onClick={() => SetisEdit(true)}
          >
            {" "}
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
