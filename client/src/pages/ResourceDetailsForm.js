import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const ResourceDetailsForm = () => {
  const uniName = localStorage.getItem("uniName");
  const navigate = useNavigate();
  const [resourceDetail, setResourceDetail] = useState(
    {
      type: "",
      name: "",
      availability: [
        {
          day: "",
          slots: []
        }
      ]
    }
  );

  const [resourceType, setResourceType] = useState([]);

  const getDeptType = async () => {
    try {
      const response = await fetch("http://localhost:8000/resources/" + uniName + "/get-all-resources", {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();


      if (data) {
        const general_response = await fetch("http://localhost:8000/generalDetails/" + data.generalDetails, { method: "GET" }).then(response => response.json());
        const deptType = general_response.numberOfResources.map((res) => res.type)
        console.log(deptType);

        setResourceType(deptType);

      } else {
        console.log("University not found");
      }

    } catch (err) {
      console.error("Error fetching university data:", err);
    }
  };

  useEffect(() => {
    getDeptType();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResourceDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...resourceDetail.availability];
    newAvailability[index][field] = value;
    setResourceDetail(prevState => ({
      ...prevState,
      availability: newAvailability
    }));
  };

  const addAvailabilitySlot = () => {
    setResourceDetail(prevState => ({
      ...prevState,
      availability: [
        ...prevState.availability,
        { day: "", slots: [] }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/resources/createresource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceDetail),
      }).then((response) => response.json())
      .then((response) => response);
      
      let data = response
      console.log("dataa", data);
      
      const universityResponse = await fetch('http://localhost:8000/university/' + uniName, { method: 'GET' })

      const universityData = await universityResponse.json();

      if (true) {
        if (!universityData.resources.includes(data.data._id)) { universityData.resources.push(data.data._id); }
        // universityData.resources = data.data.numberOfResources

        const updateResponse = await fetch(`http://localhost:8000/university/${uniName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            resources: universityData.resources,
            // resources : universityData.resources
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update university details");
        }

        const updatedUniversity = await updateResponse.json();
        console.log("University updated successfully:", updatedUniversity);
      } else {
        console.log("Facdetails ID already exists in the university");
      }


      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const result = await response.json();
      // console.log('Form submitted successfully:', result);

      setResourceDetail({
        type: "",
        name: "",
        availability: [
          {
            day: "",
            slots: []
          }
        ]
      });

      navigate('/');
      alert('Resource details submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form.');
    }
  };


  return (
    <div className="w-screen flex justify-center py-5">
      <form className="w-4/5 flex flex-col justify-center py-5 shadow-xl" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-8 text-start p-7">
          <div className="font-bold text-4xl mx-auto text-slate-700">
            Resource Details Form
          </div>

          <div className="flex flex-col gap-2 justify-start">
            <div className="font-bold text-2xl text-slate-700">Resource Type: </div>
            <select
              name="type"
              value={resourceDetail.type}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full"
            >
              <option value="">Select Resource Type</option>
              {resourceType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 justify-start">
            <input
              type="text"
              name="name"
              placeholder="Enter Resource Name"
              value={resourceDetail.name}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full"
            />
          </div>

          <div className="flex flex-col gap-2 justify-start">
            <div className="flex justify-between items-center w-full">
              <div className="font-bold text-2xl text-slate-700">Availability: </div>
              <button
                type="button"
                onClick={addAvailabilitySlot}
                className="bg-slate-900 px-10 rounded-md py-2 font-bold text-white"
              >
                + Add Availability
              </button>
            </div>
            {resourceDetail.availability.map((avail, index) => (
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
            <button className="font-bold bg-slate-900 text-white py-2 px-10 rounded-lg mt-5">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
