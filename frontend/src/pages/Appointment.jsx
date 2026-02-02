import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { name } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocinfo] = useState(null);

  const slugify = (text) =>
    text.trim().replace(/\s+/g, "-");

  useEffect(() => {
    if (!doctors || !name) return;

    const info = doctors.find(
      doc => slugify(doc.name) === name
    );

    console.log("Doctor found:", info);
    setDocinfo(info);
  }, [doctors, name]);

  return(
     <div>{docInfo ? docInfo.name : "Doctor not found"}</div>
     
    )};

export default Appointment;
