import React, { useState } from "react";

function GeneralDetailsForm() {
  const [generalDetails, setGeneralDetails] = useState({
    time: {
      break: [{ name: "", start: "", end: "" }],
      slots: [{ name: "", start: "", end: "" }],
      resources: [{ name: "", start: "", end: "" }]
    },
    days: null,
    depts: [
      {
        deptName: "",
        semester: null,
        batches: [""],
        subjects: [
          {
            subjectName: "",
            faculty: "",
            credit: [{ resourceName: "", quantity: null }]
          }
        ]
      }
    ],
    numberOfResources: [{ type: "", quantity: null }]
  });

  const handleChange = (e, path) => {
    const [field, index, subfield] = path.split(".");
    const updatedDetails = { ...generalDetails };
    if (index) {
      updatedDetails[field][index][subfield] = e.target.value;
    } else {
      updatedDetails[field] = e.target.value;
    }
    setGeneralDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generalDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generalDetails),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen flex justify-center py-5">
        <form>
          <h2  className="font-bold text-4xl text-slate-700">General Details Form</h2>
          <div>
            
          </div>
        </form>
    </div>
  );
}

export default GeneralDetailsForm;