import React, { useEffect, useState } from 'react'

export const Dashboard = () => {

  const uniName = localStorage.getItem("uniName");
  const [displayDetails, setDisplayDetails] = useState([true, false, false, false])
  const [generalDetails, setGeneralDetails] = useState([])
  const [facuiltyDetails, setFacilityDetails] = useState([])
  const [resourceDetails, setResourceDetails] = useState([])

  console.log(uniName)
  // const getGeneralDetails = async () => {
  //   const res = await fetch("http://localhost:8000/generalDetails/" + uniName + "/get-details", {
  //     method: "GET"
  //   })
  //     .then(response => response.json())
  //   setGeneralDetails(res)
  //   console.log(generalDetails)
  // }

  // const getFacultyDetails = async () => {
  //   const res = await fetch("http://localhost:8000/faculty/" + uniName + "/get-all-faculty", {
  //     method: "GET"
  //   })
  //     .then(response => response.json())
  //   setFacilityDetails(res)
  //   console.log(facuiltyDetails)
  // }

  // const getResourceDetails = async () => {
  //   const res = await fetch("http://localhost:8000/resources/" + uniName + "/get-all-resources", {
  //     method: "GET"
  //   })
  //     .then(response => response.json())
  //   setResourceDetails(res)
  //   console.log(resourceDetails)
  // }

  const getAllData = async () => {
    // await getGeneralDetails()
    // await getFacultyDetails()
    // await getResourceDetails()
  }

  // useEffect(() => {
  //   const getGeneralDetails = async () => {
  //     const res = await fetch("http://localhost:8000/generalDetails/" + uniName + "/get-details", {
  //       method: "GET"
  //     })
  //       .then(response => response.json())
  //     setGeneralDetails(res)
  //     console.log(generalDetails)
  //   }

  //   const getFacultyDetails = async () => {
  //     const res = await fetch("http://localhost:8000/faculty/" + uniName + "/get-all-faculty", {
  //       method: "GET"
  //     })
  //       .then(response => response.json())
  //     setFacilityDetails(res)
  //     console.log(facuiltyDetails)
  //   }

  //   const getResourceDetails = async () => {
  //     const res = await fetch("http://localhost:8000/resources/" + uniName + "/get-all-resources", {
  //       method: "GET"
  //     })
  //       .then(response => response.json())
  //     setResourceDetails(res)
  //     console.log(resourceDetails)
  //   }
  //    getGeneralDetails()
  //    getFacultyDetails()
  //    getResourceDetails()
  // }, [])
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
        <button className='text-white bg-slate-900 py-2 px-4 rounded-xl'>logout</button>
      </div>
      <div className='w-screen h-full flex'>
        <div className='w-1/5 h-full flex flex-col gap-5 font-bold text-slate-800 text-lg items-start ps-5 pt-10 shadow-lg'>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([true, false, false, false])}>General Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, true, false, false])}>Faculty Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, false, true, false])}>Resource Details</div>
          <div className='hover:cursor-pointer ' onClick={() => setDisplayDetails([false, false, false, true])}>Timetable</div>
        </div>
        {displayDetails[0] === true ? (
          <div>GeneralDetails</div>
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
