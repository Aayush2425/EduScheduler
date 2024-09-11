import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GeneralDetailsForm() {
  const uniName = localStorage.getItem("uniName");
  const navigate = useNavigate();
  const [generalDetails, setGeneralDetails] = useState({
    time: {
      break: [{ name: "", start: "", end: "" }],
      slots: [{ name: "", start: "", end: "" }],
      resources: [{ name: "", start: "", end: "" }],
    },
    days: 0,
    depts: [
      {
        deptName: "",
        semester: 0,
        batches: [""],
        subjects: [
          {
            subjectName: "",
            faculty: "",
            credit: [{ resourceName: "", quantity: null }],
          },
        ],
      },
    ],
    numberOfResources: [{ type: "", quantity: null }],
  });

  const [dept, setdept] = useState({
    deptName: "",
    semester: 0,
    batches: [""],
    subjects: [
      {
        subjectName: "",
        faculty: "",
        credit: [{ resourceName: "", quantity: 0 }],
      },
    ],
  });

  const [subjects, setSubjects] = useState([
    {
      subjectName: "",
      faculty: "",
      credit: [{ resourceName: "", quantity: 0 }],
    },
  ]);

  const [numberOfResources, setNumberOfResorces] = useState([
    {
      type: "",
      quantity: 0,
    },
  ]);

  const [time, setTime] = useState({
    break: [{ name: "", start: "", end: "" }],
    slots: [{ name: "", start: "", end: "" }],
    resources: [{ name: "", duration: "" }],
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/generalDetails", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(generalDetails),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="w-screen flex justify-center py-5">
      <form className="flex flex-col items-start w-4/5">
        <h2 className="font-bold text-4xl mx-auto text-slate-700">
          General Details Form
        </h2>
        <div>
          <div>
            <h1 className="font-bold text-2xl text-slate-700">Department</h1>
            <input
              type="text"
              className="border border-black bg-blue-400 rounded-lg"
              placeholder="Department Name"
              onChange={(e) => handleChange(e, "depts.0.deptName")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default GeneralDetailsForm;
