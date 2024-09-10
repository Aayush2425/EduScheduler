import React, { useState } from "react";

function GeneralDetailsForm() {
  const [generalDetails, setGeneralDetails] = useState({
    time: {
      break: [{ name: "", start: "", end: "" }],
      slots: [{ name: "", start: "", end: "" }],
      resources: [{ name: "", start: "", end: "" }]
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
            credit: [{ resourceName: "", quantity: 0 }]
          }
        ]
      }
    ],
    numberOfResources: [{ type: "", quantity: 0 }]
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">General Details</h2>
      
      {/* Time - Break slots */}
      <h3 className="text-xl font-medium text-gray-700 mb-2">Break Slots</h3>
      {generalDetails.time.break.map((slot, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-600">Name</label>
          <input 
            type="text" 
            value={slot.name} 
            onChange={(e) => handleChange(e, `time.break.${index}.name`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">Start</label>
          <input 
            type="text" 
            value={slot.start} 
            onChange={(e) => handleChange(e, `time.break.${index}.start`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">End</label>
          <input 
            type="text" 
            value={slot.end} 
            onChange={(e) => handleChange(e, `time.break.${index}.end`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
        </div>
      ))}

      {/* Time - Slots */}
      <h3 className="text-xl font-medium text-gray-700 mb-2">Time Slots</h3>
      {generalDetails.time.slots.map((slot, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-600">Name</label>
          <input 
            type="text" 
            value={slot.name} 
            onChange={(e) => handleChange(e, `time.slots.${index}.name`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">Start</label>
          <input 
            type="text" 
            value={slot.start} 
            onChange={(e) => handleChange(e, `time.slots.${index}.start`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">End</label>
          <input 
            type="text" 
            value={slot.end} 
            onChange={(e) => handleChange(e, `time.slots.${index}.end`)} 
            className="border rounded-md p-2 w-full text-gray-700"
          />
        </div>
      ))}

      {/* Days */}
      <div className="mb-4">
        <label className="block text-gray-600">Days</label>
        <input 
          type="number" 
          value={generalDetails.days} 
          onChange={(e) => handleChange(e, "days")} 
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      {/* Departments */}
      <h3 className="text-xl font-medium text-gray-700 mb-2">Departments</h3>
      {generalDetails.depts.map((dept, deptIndex) => (
        <div key={deptIndex} className="mb-4">
          <label className="block text-gray-600">Department Name</label>
          <input
            type="text"
            value={dept.deptName}
            onChange={(e) => handleChange(e, `depts.${deptIndex}.deptName`)}
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">Semester</label>
          <input
            type="number"
            value={dept.semester}
            onChange={(e) => handleChange(e, `depts.${deptIndex}.semester`)}
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">Batches</label>
          <input
            type="text"
            value={dept.batches.join(", ")}
            onChange={(e) => handleChange(e, `depts.${deptIndex}.batches`)}
            className="border rounded-md p-2 w-full text-gray-700"
          />
          
          {/* Subjects */}
          <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Subjects</h4>
          {dept.subjects.map((subject, subjIndex) => (
            <div key={subjIndex} className="mb-4">
              <label className="block text-gray-600">Subject Name</label>
              <input
                type="text"
                value={subject.subjectName}
                onChange={(e) =>
                  handleChange(
                    e,
                    depts.${deptIndex}.subjects.${subjIndex}.subjectName
                  )
                }
                className="border rounded-md p-2 w-full text-gray-700"
              />
              <label className="block text-gray-600 mt-2">Faculty</label>
              <input
                type="text"
                value={subject.faculty}
                onChange={(e) =>
                  handleChange(
                    e,
                    depts.${deptIndex}.subjects.${subjIndex}.faculty
                  )
                }
                className="border rounded-md p-2 w-full text-gray-700"
              />

              {/* Credit */}
              <h5 className="text-md font-medium text-gray-600 mt-2 mb-2">Credit</h5>
              {subject.credit.map((credit, creditIndex) => (
                <div key={creditIndex} className="mb-2">
                  <label className="block text-gray-600">Resource Name</label>
                  <input
                    type="text"
                    value={credit.resourceName}
                    onChange={(e) =>
                      handleChange(
                        e,
                        depts.${deptIndex}.subjects.${subjIndex}.credit.${creditIndex}.resourceName
                      )
                    }
                    className="border rounded-md p-2 w-full text-gray-700"
                  />
                  <label className="block text-gray-600 mt-2">Quantity</label>
                  <input
                    type="number"
                    value={credit.quantity}
                    onChange={(e) =>
                      handleChange(
                        e,
                        depts.${deptIndex}.subjects.${subjIndex}.credit.${creditIndex}.quantity
                      )
                    }
                    className="border rounded-md p-2 w-full text-gray-700"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Number of Resources */}
      <h3 className="text-xl font-medium text-gray-700 mb-2">Number of Resources</h3>
      {generalDetails.numberOfResources.map((resource, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-600">Resource Type</label>
          <input
            type="text"
            value={resource.type}
            onChange={(e) => handleChange(e, numberOfResources.${index}.type)}
            className="border rounded-md p-2 w-full text-gray-700"
          />
          <label className="block text-gray-600 mt-2">Quantity</label>
          <input
            type="number"
            value={resource.quantity}
            onChange={(e) => handleChange(e, numberOfResources.${index}.quantity)}
            className="border rounded-md p-2 w-full text-gray-700"
          />
        </div>
      ))}

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default GeneralDetailsForm;