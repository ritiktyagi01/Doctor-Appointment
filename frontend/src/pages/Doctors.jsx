import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // slug function
  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, "-");

  // Handle navigation
  const handleNavigate = (name) => {
    const slug = slugify(name);
    navigate(speciality === slug ? "/doctors" : `/doctors/${slug}`);
    setShowFilter(false);
  };

  // Apply filter
  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) => slugify(doc.speciality) === speciality
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <>
      <p className="text-3xl font-medium text-center py-5">
        Browse through the doctors specialist
      </p>

      <div className="flex flex-col md:flex-row gap-6 relative">

        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-end px-4">
          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Filter
          </button>
        </div>

        {/* Overlay (Mobile) */}
        {showFilter && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setShowFilter(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`
            ${showFilter ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            fixed md:relative
            top-0 left-0
            h-full md:h-auto
            w-64 md:w-auto
            bg-white md:bg-transparent
            z-50
            p-6 md:p-0
            transition-transform duration-300
          `}
        >
          <div className="flex flex-col gap-4 text-gray-600 font-medium">

            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className={`border h-10 rounded-md transition-all duration-200
                  ${
                    slugify(item) === speciality
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  }
                `}
              >
                {item}
              </button>
            ))}

          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">

          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/appointment/${slugify(item.name)}/${item._id}`)
              }
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white"
            >
              {/* Image Section */}
              <div className="bg-[#EAEFFF] flex justify-center items-center">
                <img
                  className="w-full h-64 object-contain"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Info Section */}
              <div className="p-4">
              <div className={`flex items-center gap-2 text-center text-sm ${item.available? "text-green-500": "text-gray-500 "}`}>
                <p className={`h-2 w-2 ${item.available? "bg-green-500": "bg-gray-500" } rounded-full `}></p>{" "}
                <p className=""> {item.available?'Available' : 'Not Available'}</p>
              </div>

                <p className="text-lg font-semibold mt-1">
                  {item.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Doctors;
