import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const uniName = localStorage.getItem("uniName");
  const [displayDetails, setDisplayDetails] = useState([true, false, false, false])
  const [generalDetails, setGeneralDetails] = useState([])
  const [facuiltyDetails, setFacilityDetails] = useState([])
  const [resourceDetails, setResourceDetails] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const getGeneralDetails = async () => {
      try {
        const res = await fetch("http://localhost:8000/generalDetails/" + uniName + "/get-details", {
          method: "GET"
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch general details: ${res.status}`);
        }

        const data = await res.json();
        if (data) {
          setGeneralDetails(data);
          console.log("General Details:", data);
        } else {
          console.log("No general details found.");
        }
      } catch (error) {
        console.error("Error fetching general details:", error);
      }
    };

    const getFacultyDetails = async () => {
      try {
        const res = await fetch("http://localhost:8000/faculty/" + uniName + "/get-all-faculty", {
          method: "GET"
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch faculty details: ${res.status}`);
        }

        const data = await res.json();
        if (data) {
          setFacilityDetails(data);
          console.log("Faculty Details:", data);
        } else {
          console.log("No faculty details found.");
        }
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      }
    };

    const getResourceDetails = async () => {
      try {
        const res = await fetch("http://localhost:8000/resources/" + uniName + "/get-all-resources", {
          method: "GET"
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch resource details: ${res.status}`);
        }

        const data = await res.json();
        if (data) {
          setResourceDetails(data);
          console.log("Resource Details:", data);
        } else {
          console.log("No resource details found.");
        }
      } catch (error) {
        console.error("Error fetching resource details:", error);
      }
    };

    getGeneralDetails();
    getFacultyDetails();
    getResourceDetails();
  }, [uniName]);


  return (
    <div className='w-screen h-screen'>
      <div className='flex justify-between items-center p-3 text-xl font-bold text-slate-900 shadow-lg'>
        <div className='text-2xl'>{uniName}</div>
        <button className='text-white bg-slate-900 py-2 px-4 rounded-xl' onClick={() => {
          localStorage.removeItem("uniName");
          nav("/")
        }}>logout</button>
      </div>
      <div className='w-screen h-full flex'>
        <div className='w-1/5 h-full flex flex-col gap-5 font-bold text-slate-800 text-lg items-start ps-5 pt-10 shadow-lg'>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([true, false, false, false])}>General Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, true, false, false])}>Faculty Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, false, true, false])}>Resource Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, false, false, true])}>Timetable</div>
        </div>
        {displayDetails[0] === true ? (
          <div><div>
          <h2>{university.name} - General Details</h2>
    
          {/* Break Times Table */}
          <h3>Break Times</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {university.generalDetails.time.break.map((breakTime) => (
                <tr key={breakTime._id}>
                  <td>{breakTime.name}</td>
                  <td>{breakTime.start}</td>
                  <td>{breakTime.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Time Slots Table */}
          <h3>Time Slots</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Slot Name</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {university.generalDetails.time.slots.map((slot) => (
                <tr key={slot._id}>
                  <td>{slot.name}</td>
                  <td>{slot.start}</td>
                  <td>{slot.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Resources Table */}
          <h3>Resources</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Duration (hours)</th>
              </tr>
            </thead>
            <tbody>
              {university.generalDetails.time.resources.map((resource) => (
                <tr key={resource._id}>
                  <td>{resource.name}</td>
                  <td>{resource.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Departments Table */}
          <h3>Departments</h3>
          {university.generalDetails.depts.map((dept) => (
            <div key={dept._id}>
              <h4>{dept.deptName} (Semester {dept.semester})</h4>
              <h5>Batches: {dept.batches.join(', ')}</h5>
    
              {/* Subjects Table */}
              <table border="1">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Faculty</th>
                    <th>Resources (Credits)</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.subjects.map((subject) => (
                    <tr key={subject._id}>
                      <td>{subject.subjectName}</td>
                      <td>{subject.faculty}</td>
                      <td>
                        {subject.credit.map((credit) => (
                          <div key={credit._id}>
                            {credit.resourceName}: {credit.quantity}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
    
          {/* Number of Resources Table */}
          <h3>Total Number of Resources</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {university.generalDetails.numberOfResources.map((resource) => (
                <tr key={resource._id}>
                  <td>{resource.type}</td>
                  <td>{resource.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
        ) : displayDetails[1] === true ? (
          <div>Faculty Details</div>
        ) : displayDetails[2] === true ? (
          <div>Resource Details</div>
        ) : displayDetails[3] === true ? (
          <div>Timetable Details</div>
        ) : <div></div>}
      </div>
    </div>
  )
}
