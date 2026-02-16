import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorProfile = () => {
  const { dtoken, doctorProfile, updateProfile, doctorData, setdoctorData } =
    useContext(DoctorContext);

  const [isEdit, SetisEdit] = useState(false);
  if (!doctorData) return <p>Loading profile...</p>;
  const handleSave = async () => {
    await updateProfile();
    SetisEdit(false);
  };

  // console.log("doctorData", doctorData);

  useEffect(() => {
    if (dtoken) {
      doctorProfile();
    }
  }, [dtoken]);
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-full max-w-6xl m-5 overflow-y-auto">
        <p className="mb-3 text-lg font-medium">Doctor Profile</p>

        <div className="max-w-lg flex flex-col gap-2 text-sm bg-gray-100 w-full rounded-lg px-8 py-4 shadow-lg">
          <img className="w-36 rounded bg-primary  " src={doctorData.image} alt="" />
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-400 rounded-sm text-3xl font-medium max-w-60 mt-4"
              type="text"
              value={doctorData.name}
              onChange={(e) =>
                setdoctorData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font medium text-3xl text-neutral-800 mt-4">
              {doctorData.name}
            </p>
          )}
          <hr className="bg-zinc-400 h-px border-none" />
          <div>
            <h1 className="text-neutral-800 underline mt-3">
              Contact Information
            </h1>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium ">Email:</p>
              <p className="text-blue-500">{doctorData.email}</p>

              <p className="font-medium">Address</p>
              {isEdit ? (
                <p>
                  <input
                    type="text"
                    className=" bg-gray-50 border border-gray-400 rounded-sm mb-2 text-gray-600"
                    value={doctorData.address.line1}
                    onChange={(e) =>
                      setdoctorData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <br />
                  <input
                    type="text"
                    className=" bg-gray-50 border border-gray-400 rounded-sm text-gray-600"
                    value={doctorData.address.line2}
                    onChange={(e) =>
                      setdoctorData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </p>
              ) : (
                <p className="text-gray-500">
                  {doctorData.address.line1} <br />
                  {doctorData.address.line2}
                </p>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-neutral-800 underline mt-3 ">
              BASIC INFORMATION
            </h1>
            <hr className="bg-zinc-400 h-px border-none" />
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium">Availability:</p>

              {isEdit ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={doctorData.available}
                    onChange={(e) =>
                      setdoctorData((prev) => ({
                        ...prev,
                        available: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />
                  <label>Available</label>
                </div>
              ) : (
                <p
                  className={
                    doctorData.available ? "text-green-600" : "text-red-500"
                  }
                >
                  {doctorData.available ? "Available" : "Not Available"}
                </p>
              )}

              <p className="font-medium">Speciality</p>
              {isEdit ? (
                <input
                  type="text"
                  value={doctorData.speciality}
                  onChange={(e) =>
                    setdoctorData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="bg-gray-100 max-w-52 border border-gray-400 rounded-sm"
                />
              ) : (
                <p className="">{doctorData.speciality}</p>
              )}

              <p className="font-medium ">Appointment Fees:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={doctorData.fees}
                  onChange={(e) =>
                    setdoctorData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  className="bg-gray-100 max-w-52 border border-gray-400 rounded-sm"
                />
              ) : (
                <p className="">{doctorData.fees}</p>
              )}
              <p className="font-medium">Experience:</p>
              {isEdit ? (
                <select
                  className="max-w-20 bg-gray-100 text-gray-600"
                  value={doctorData.experience}
                  onChange={(e) =>
                    setdoctorData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                >
                  <option value="1 Year">2 Year</option>
                  <option value="2 Year">3 Year</option>
                  <option value="3 Year">1 Yesr</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year+more">6 Year+more</option>
                </select>
              ) : (
                <p className="text-gray-600 ">{doctorData.experience}</p>
              )}

              <p className="font-medium">About:</p>

              {isEdit ? (
                <p
                  className="w-full  text-gray-600 border rounded-md p-2 min-h-20 outline-none bg-white"
                  value={doctorData.about}
                  onChange={(e) =>
                    setdoctorData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-600 bg-white border min-h-20 rounded-md p-1">
                  {doctorData.about}
                </p>
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
      </div>
    </div>
  );
};

export default DoctorProfile;
