import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const uniName = localStorage.getItem("uniName");
  const [displayDetails, setDisplayDetails] = useState([true, false, false, false])
  const [generalDetails, setGeneralDetails] = useState([])
  const [facultyDetails, setFacultyDetails] = useState([])
  const [resourceDetails, setResourceDetails] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          setGeneralDetails(data[0].generalDetails);
          console.log("General Details:", data[0].generalDetails);
        } else {
          console.log("No general details found.");
        }
      } catch (error) {
        console.error("Error fetching general details:", error);
      }
      finally {
        setLoading(false);
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
          setFacultyDetails(data[0].facultyDetails);
          console.log("Faculty Details:", data[0].facultyDetails);
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
          setResourceDetails(data.resources);
          console.log("Resource Details:", data.resources);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!generalDetails) {
    return <p>No details available.</p>;
  }

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
          <div>
          <h2>{uniName} - General Details</h2>
    
          {/* Check if generalDetails.time and generalDetails.time.break exist */}
          <h3>Break Times</h3>
          {generalDetails.time && generalDetails.time.break ? (
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {generalDetails.time.break.map((breakTime) => (
                  <tr key={breakTime._id}>
                    <td>{breakTime.name}</td>
                    <td>{breakTime.start}</td>
                    <td>{breakTime.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No break times available.</p>
          )}
    
          {/* Check if generalDetails.time and generalDetails.time.slots exist */}
          <h3>Time Slots</h3>
          {generalDetails.time && generalDetails.time.slots ? (
            <table border="1">
              <thead>
                <tr>
                  <th>Slot Name</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {generalDetails.time.slots.map((slot) => (
                  <tr key={slot._id}>
                    <td>{slot.name}</td>
                    <td>{slot.start}</td>
                    <td>{slot.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No time slots available.</p>
          )}
    
          {/* Check if generalDetails.time and generalDetails.time.resources exist */}
          <h3>Resources</h3>
          {generalDetails.time && generalDetails.time.resources ? (
            <table border="1">
              <thead>
                <tr>
                  <th>Resource Name</th>
                  <th>Duration (hours)</th>
                </tr>
              </thead>
              <tbody>
                {generalDetails.time.resources.map((resource) => (
                  <tr key={resource._id}>
                    <td>{resource.name}</td>
                    <td>{resource.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No resources available.</p>
          )}
    
          {/* Check if generalDetails.depts exists */}
          <h3>Departments</h3>
          {generalDetails.depts ? (
            generalDetails.depts.map((dept) => (
              <div key={dept._id}>
                <h4>{dept.deptName} (Semester {dept.semester})</h4>
                <h5>Batches: {dept.batches.join(', ')}</h5>
    
                {/* Check if dept.subjects exists */}
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
            ))
          ) : (
            <p>No departments available.</p>
          )}
    
          {/* Check if generalDetails.numberOfResources exists */}
          <h3>Total Number of Resources</h3>
          {generalDetails.numberOfResources ? (
            <table border="1">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {generalDetails.numberOfResources.map((resource) => (
                  <tr key={resource._id}>
                    <td>{resource.type}</td>
                    <td>{resource.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No resources available.</p>
          )}
        </div>
        ) : displayDetails[1] === true ? (
          <div>
          <h2>Faculty Details</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Department</th>
                <th>Subjects</th>
                <th>Availability</th>
                <th>Teaching Type</th>
              </tr>
            </thead>
            <tbody>
              {facultyDetails.map((faculty) => (
                <tr key={faculty._id}>
                  <td>{faculty.factName}</td>
                  <td>{faculty.dept.join(', ')}</td>
                  <td>{faculty.subjects.join(', ')}</td>
                  <td>
                    {faculty.availability.map((availability) => (
                      <div key={availability._id}>
                        {availability.day}: Slots {availability.slots.join(', ')}
                      </div>
                    ))}
                  </td>
                  <td>{faculty.teachingType.join(', ') || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : displayDetails[2] === true ? (
          <div>
      <h3>Resources</h3>
      {resourceDetails.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {resourceDetails.map(resource => (
              <tr key={resource._id}>
                <td>{resource.type}</td>
                <td>{resource.name}</td>
                <td>
                  {resource.availability.map((availability) => (
                    <div key={availability._id}>
                      <strong>{availability.day}:</strong> Slots: {availability.slots.join(', ')}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No resources available.</p>
      )}
    </div>
        ) : displayDetails[3] === true ? (
          <div>Timetable Details</div>
        ) : <div></div>}
      </div>
    </div>
  )
}
