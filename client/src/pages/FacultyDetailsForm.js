import React, { useEffect, useState } from 'react'

export const FacultyDetailsForm = () => {
  const uniName = localStorage.getItem("uniName");
  const [facultyDetails, setFacultyDetails] = useState({
    factName : "",
    dept : [],
    subjects : [],
    availability : [
      {
        day : "",
        slots : []
      }
    ],
    teachingType : []
  })

  const [deptData, setDeptData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

  const getUniversityDept = async () => {
    try {
      const response = await fetch("http://localhost:8000/generalDetails/Darshan%20University/get-details", {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      
      const data = await response.json();
  
      const universityData = data.find((uni) => uni.name === "Darshan University");
  
      if (universityData) {
        const deptNames = universityData.generalDetails.depts.map((element) => element.deptName);

        setDeptData(deptNames); 

        const allSubjectData = universityData.generalDetails.depts.flatMap((element) => element.subjects);
        
        const subjectNames = allSubjectData.map((element) => element.subjectName);

        setSubjectData(subjectNames);
        
  
      } else {
        console.log("University not found");
      }
  
    } catch (err) {
      console.error("Error fetching university data:", err);
    }
  };

  useEffect(() => {
    getUniversityDept();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyDetails({
      ...facultyDetails,
      [name]: value
    });
  };


  const handleDeptCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedDepts;

    if (checked) {
      updatedDepts = [...facultyDetails.dept, value]; 
    } else {
      updatedDepts = facultyDetails.dept.filter((dept) => dept !== value); 
    }

    setFacultyDetails({
      ...facultyDetails,
      dept: updatedDepts
    });
  };

  const handleSubjectCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedSubjects;

    if (checked) {
      updatedSubjects = [...facultyDetails.subjects, value]; 
    } else {
      updatedSubjects = facultyDetails.subjects.filter((subject) => subject !== value); 
    }

    setFacultyDetails({
      ...facultyDetails,
      subjects: updatedSubjects
    });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...facultyDetails.availability];
    updatedAvailability[index][field] = value;
    setFacultyDetails({
      ...facultyDetails,
      availability: updatedAvailability
    });
  };

  const addAvailabilitySlot = () => {
    setFacultyDetails({
      ...facultyDetails,
      availability: [
        ...facultyDetails.availability,
        { day: "", slots: [] }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!facultyDetails.factName) {
      alert("Faculty name is required!");
      return;
    }

    console.log(facultyDetails);

    fetch("http://localhost:8000/faculty/createfaculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(facultyDetails)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully submitted:", data);
        setFacultyDetails({
          factName: "",
          dept: [],
          subjects: [],
          availability: [{ day: "", slots: [] }],
          teachingType: []
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="w-screen flex justify-center py-5">
    <form className="w-4/5 flex flex-col justify-center py-5 shadow-xl" onSubmit={handleSubmit}>
    <div className="flex w-full flex-col gap-8 text-start p-7">
    <div className="font-bold text-4xl mx-auto text-slate-700">
          Faculty Details Form
        </div>
      <div className="flex flex-col gap-2 justify-start">
        <input
          type="text"
          name="factName"
          placeholder='Enter Faculty Name'
          value={facultyDetails.factName}
          onChange={handleInputChange}
          className="border rounded-lg py-2 px-3 w-full"
        />
      </div>
      <div className="flex flex-col gap-2 justify-start">
      <div className="font-bold text-2xl text-slate-700">Choose Department : </div>
        {deptData.map((dept, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`dept-${index}`}
              value={dept}
              checked={facultyDetails.dept.includes(dept)}
              onChange={handleDeptCheckboxChange}
            />
            <label htmlFor={`dept-${index}`} className="ml-2">{dept}</label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 justify-start">
      <div className="font-bold text-2xl text-slate-700">Choose Subjects : </div>
      {subjectData.map((subject, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`subject-${index}`}
              value={subject}
              checked={facultyDetails.subjects.includes(subject)}
              onChange={handleSubjectCheckboxChange}
            />
            <label htmlFor={`subject-${index}`} className="ml-2">{subject}</label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 justify-start">
      <div className="flex justify-between items-center w-full">
              <div className="font-bold text-2xl text-slate-700">Availability : </div>
              <button type="button" onClick={addAvailabilitySlot} className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white">
                + Add Availability
              </button>
            </div>
        {facultyDetails.availability.map((avail, index) => (
          <div key={index} className="mb-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Day"
                value={avail.day}
                onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                className="border rounded-lg py-2 px-3 w-full"
              />
              <input
                type="text"
                placeholder="Slots (comma separated)"
                value={avail.slots.join(",")}
                onChange={(e) =>
                  handleAvailabilityChange(index, "slots", e.target.value.split(","))
                }
                className="border rounded-lg py-2 px-3 w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="font-bold bg-slate-900 text-white py-2 px-10 rounded-lg mt-5">Submit</button>
      </div>
      </div>
    </form>
    </div>
  )
}
