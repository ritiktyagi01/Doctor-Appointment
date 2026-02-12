import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useRef } from "react";

const AddDoctor = () => {
  const [docimg, setDocimg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [fees, setFees] = useState("40");
  const [experience, setExperience] = useState("1 Year");
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const fileInputRef = useRef(null);


  //
  const { token, backendUrl ,getAllDoctor } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docimg) {
        toast.error("Image Not Selected ");
        return;
      }

      const formData = new FormData();

      formData.append("image", docimg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fees", Number(fees));
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree",degree)
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      //print all the data in console
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
            
          },
        },
      );

      console.log('data mil gya ')
     

      if (data.success) {
        console.log("all filled");
        toast.success(data.message);
        await getAllDoctor();
        setDocimg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setExperience("");
        setSpeciality('');
        setAbout("");
        setAddress1("");
        setAddress2("");
      } 
      
      
    } catch (error) {
      
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} className="px-8 py-5 h-screen">
        <h1 className="mb-2">Add Doctor</h1>

        {/* 🔴 Scrollable container */}
        <div className="flex flex-col bg-white py-6 px-6  h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex flex-row gap-6 mb-10">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              type="file"
                ref={fileInputRef}
              onChange={(e) => setDocimg(e.target.files[0])}
              id="doc-img"
              hidden
            />
            <p className="py-4">
              Upload doctor <br /> picture
            </p>
          </div>
          {/* ----------------------------------------------- */}
          <div className="w-full flex flex-row gap-25 mb-5">
            <div className="w-full">
              <p className="mb-2">Doctor name </p>
              <input
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-2">Speciality</p>
              <select
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
          </div>
          {/* ----------------------------------------------- */}
          <div className="w-full flex flex-row gap-25 ">
            <div className="w-full mb-5">
              <p className="mb-2">Doctor Email</p>
              <input
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                type="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-2">Degree</p>
              <input
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                type="text"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                placeholder="MBBS"
                required
              />
            </div>
          </div>
          {/* ----------------------------------------------- */}
          <div className="w-full flex flex-row gap-25">
            <div className="w-full mb-5">
              <p className="mb-2">Doctor Password</p>
              <input
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="w-full mb-5">
              <p className="mb-2">Address</p>
              <input
                className="border border-[#DADADA] w-full p-1 mt-1 rounded"
                type="text"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                placeholder="Address1"
                required
              />
              <input
                className="border border-[#DADADA] w-full p-1 mt-2 rounded"
                type="text"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                placeholder="Address2"
              />
            </div>
          </div>
          {/* ----------------------------------------------- */}

          <div className="w-full flex flex-row gap-25 -mt-5">
            <div className="w-full mb-5">
              <p className="mb-2">Experience</p>
              <select
                className="border border-[#DADADA]  p-1 mt-1 rounded"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="6 Year + more">6 Year + more</option>
              </select>
            </div>
          </div>
          {/* ----------------------------------------------- */}
          <div className="w-full flex flex-row gap-25">
            <div className="w-full mb-5">
              <p className="mb-2">Fees</p>
              <input
                type="number"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                defaultValue={40}
                min={0}
                className="border border-[#DADADA] p-1 mt-1 rounded"
                required
              />
            </div>
          </div>

          {/* ----------------------------------------------- */}
          <div className="w-full flex flex-col ">
            <p className="mb-2"> About me</p>
            <textarea
              className="border border-[#DADADA] w-full min-h-30 p-3 mt-1 mb-4 rounded resize-none"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            ></textarea>
          </div>

          {/* ----------------------------------------------- */}
          <button
            type="submit"
            className=" bg-primary text-white rounded-lg py-2 w-sm
                       hover:opacity-90 transition-all duration-200 cursor-pointer text-base"
          >
            Add doctor
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDoctor;
