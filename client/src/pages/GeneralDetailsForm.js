import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GeneralDetailsForm() {
  const uniName = localStorage.getItem("uniName");
  const navigate = useNavigate();
  const [generalDetails, setGeneralDetails] = useState({
    time: {
      break: [{ name: "", start: "", end: "" }],
      slots: [{ name: "", start: "", end: "" }],
      resources: [{ name: "", duration: "" }],
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
            credit: [{ resourceName: "", quantity: 0 }],
          },
        ],
      },
    ],
    numberOfResources: [{ type: "", quantity: 0 }],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedGeneralDetails = {
      ...generalDetails,
      depts: [
        {
          ...generalDetails.depts[0],
          deptName: dept.deptName,
          semester: dept.semester,
          batches: dept.batches.split(","),
          subjects: subjects,
        },
      ],
      numberOfResources: numberOfResources,
      time: time,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/generalDetails/creategeneraldetail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGeneralDetails),
        }
      );
      const data = await response.json();

      const universityResponse = await fetch(
        `http://localhost:8000/university/${uniName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const universityData = await universityResponse.json();

      if (universityData.generalDetails == null) {
        universityData.generalDetails = data.data._id;
        // universityData.resources = data.data.numberOfResources

        const updateResponse = await fetch(
          `http://localhost:8000/university/${uniName}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              generalDetails: universityData.generalDetails,
              // resources : universityData.resources
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update university details");
        }

        const updatedUniversity = await updateResponse.json();
        console.log("University updated successfully:", updatedUniversity);
        navigate("/facultyDetailForm");
      } else {
        console.log("generalDetails ID already exists in the university");
      }

      console.log(updatedGeneralDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  // Handle input change for credit fields
  const handleCreditChange = (subjectIndex, creditIndex, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].credit[creditIndex][field] = value;
    setSubjects(updatedSubjects);
  };

  // Add new subject
  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        subjectName: "",
        faculty: "",
        credit: [{ resourceName: "", quantity: null }],
      },
    ]);
  };

  // Add new credit resource within a subject
  const addCredit = (subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].credit.push({
      resourceName: "",
      quantity: null,
    });
    setSubjects(updatedSubjects);
  };

  const handleResourcesChange = (index, field, value) => {
    const updateResource = [...numberOfResources];
    updateResource[index][field] = value;
    setNumberOfResorces(updateResource);
  };

  const addResources = () => {
    setNumberOfResorces([
      ...numberOfResources,
      {
        type: "",
        quantity: 0,
      },
    ]);
  };

  const handleTimeChange = (type, index, field, value) => {
    const updatedTime = { ...time };
    updatedTime[type][index][field] = value;
    setTime(updatedTime);
  };

  const addTimeEntry = (type) => {
    const updatedTime = { ...time };
    if (type === "break") {
      updatedTime.break.push({ name: "", start: "", end: "" });
    } else if (type === "slots") {
      updatedTime.slots.push({ name: "", start: "", end: "" });
    } else if (type === "resources") {
      updatedTime.resources.push({ name: "", duration: "" });
    }
    setTime(updatedTime);
  };

  return (
    <div className="w-screen flex justify-center py-5">
      <form
        className="w-4/5 flex flex-col justify-center py-5 shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-4xl mx-auto text-slate-700">
          General Details Form
        </div>
        <div className="flex w-full flex-col gap-8 text-start p-7">
          <div className="flex flex-col gap-2 justify-start">
            <div className="font-bold text-2xl text-slate-700">
              Department :{" "}
            </div>
            <input
              type="text"
              className="border rounded-lg py-2 px-3"
              placeholder="Department Name"
              onChange={(e) => setdept({ ...dept, deptName: e.target.value })}
            />
            <input
              type="number"
              className="border rounded-lg py-2 px-3"
              placeholder="Current Semester"
              onChange={(e) => setdept({ ...dept, semester: e.target.value })}
            />
            <input
              type="text"
              className="border rounded-lg py-2 px-3"
              placeholder="Enter comma seperated batches"
              onChange={(e) => setdept({ ...dept, batches: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex justify-between items-center w-full">
              <div className="font-bold text-2xl text-slate-700">
                Resource :{" "}
              </div>
              <button
                type="button"
                onClick={addResources}
                className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
              >
                + Add Another Resource
              </button>
            </div>
            {numberOfResources.map((resource, resourceIndex) => (
              <div key={resourceIndex} className="flex gap-2">
                <input
                  type="text"
                  value={resource.type}
                  placeholder="Resource Type"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleResourcesChange(resourceIndex, "type", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Resource Total Count"
                  value={resource.quantity || ""}
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleResourcesChange(
                      resourceIndex,
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex justify-between items-center w-full">
              <div className="font-bold text-2xl text-slate-700">
                Subjects :{" "}
              </div>
              <button
                type="button"
                onClick={addSubject}
                className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
              >
                + Add Another Subject
              </button>
            </div>
            {subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="border-b-2 pb-5">
                <h3 className="text-xl text-slate-500 font-bold ">
                  Subject {subjectIndex + 1}
                </h3>
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Subject Name"
                      value={subject.subjectName}
                      className="border rounded-lg py-2 px-3 w-full"
                      onChange={(e) =>
                        handleSubjectChange(
                          subjectIndex,
                          "subjectName",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="text"
                      value={subject.faculty}
                      placeholder="Enter Faculty Name "
                      className="border rounded-lg py-2 px-3 w-full"
                      onChange={(e) =>
                        handleSubjectChange(
                          subjectIndex,
                          "faculty",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                      <h4 className="text-xl text-slate-500 font-bold">
                        Credits
                      </h4>
                      <button
                        type="button"
                        className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
                        onClick={() => addCredit(subjectIndex)}
                      >
                        + Add Credit Resource
                      </button>
                    </div>
                    {subject.credit.map((credit, creditIndex) => (
                      <div key={creditIndex} className="flex gap-2">
                        <select
                          className="border rounded-lg py-2 px-3 w-full"
                          onChange={(e) =>
                            handleCreditChange(
                              subjectIndex,
                              creditIndex,
                              "resourceName",
                              e.target.value
                            )
                          }
                        >
                          <option selected disabled>
                            NA
                          </option>
                          {numberOfResources.map((resourse) => {
                            return (
                              <option value={resourse.type}>
                                {resourse.type}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          type="number"
                          placeholder="Resource Per Week Count"
                          value={credit.quantity || ""}
                          className="border rounded-lg py-2 px-3 w-full"
                          onChange={(e) =>
                            handleCreditChange(
                              subjectIndex,
                              creditIndex,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <div className="font-bold text-2xl text-slate-700">
              Number of Working Days :{" "}
            </div>
            <input
              type="number"
              className="border rounded-lg py-2 px-3"
              placeholder="0"
              onChange={(e) =>
                setGeneralDetails({ ...generalDetails, days: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col ">
              <h4 className="font-bold text-2xl text-slate-700">Time :</h4>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-xl text-slate-500 font-bold">Breaks</h4>
                <button
                  type="button"
                  className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
                  onClick={() => addTimeEntry("break")}
                >
                  + Add Break
                </button>
              </div>
            </div>
            {time.break.map((brk, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={brk.name}
                  placeholder="Break Name"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange("break", index, "name", e.target.value)
                  }
                />
                <input
                  type="time"
                  value={brk.start}
                  placeholder="Start Time"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange(
                      "break",
                      index,
                      "start",
                      e.target.value.toString()
                    )
                  }
                />
                <input
                  type="time"
                  value={brk.end}
                  placeholder="End Time"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange(
                      "break",
                      index,
                      "end",
                      e.target.value.toString()
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* Slots Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <h4 className="text-xl text-slate-500 font-bold">Slots</h4>
              <button
                type="button"
                className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
                onClick={() => addTimeEntry("slots")}
              >
                + Add Slot
              </button>
            </div>
            {time.slots.map((slot, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={slot.name}
                  placeholder="Slot Name"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange("slots", index, "name", e.target.value)
                  }
                />
                <input
                  type="time"
                  value={slot.start}
                  placeholder="Start Time"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange(
                      "slots",
                      index,
                      "start",
                      e.target.value.toString()
                    )
                  }
                />
                <input
                  type="time"
                  value={slot.end}
                  placeholder="End Time"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange(
                      "slots",
                      index,
                      "end",
                      e.target.value.toString()
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* Resources Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <h4 className="text-xl text-slate-500 font-bold">Resources</h4>
              <button
                type="button"
                className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
                onClick={() => addTimeEntry("resources")}
              >
                + Add Resource
              </button>
            </div>
            {time.resources.map((resource, index) => (
              <div key={index} className="flex gap-2">
                <select
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange("resources", index, "name", e.target.value)
                  }
                >
                  <option selected disabled>
                    NA
                  </option>
                  {numberOfResources.map((resourse) => {
                    return (
                      <option value={resource.type}>{resourse.type}</option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  value={resource.duration}
                  placeholder="Duration"
                  className="border rounded-lg py-2 px-3 w-full"
                  onChange={(e) =>
                    handleTimeChange(
                      "resources",
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="font-bold bg-slate-900 text-white py-2 px-10 rounded-lg mt-5">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GeneralDetailsForm;
