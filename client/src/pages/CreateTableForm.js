import React, { useEffect, useState } from 'react'

export const CreateTableForm = () => {

    const [formData, setFormData] = useState({
        dept: "",
        sem: "",
        batch: "",
        resources: {},
        numOfStudentPerBatch: 0,
        faculties: [{
            factName: "",
            subjects: ""
        }],
        uniName: ""
    })

    const [deptData, setDeptData] = useState([]);
    const [facNnS, setFacNnS] = useState([]);
    const uniNamee = localStorage.getItem("uniName")

    // const getFacAndSub = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8000/faculty/" + uniNamee + "/get-all-faculty", {
    //             method: 'GET'
    //         })
    //             .then(response => response.json())
    //         // .then(response => console.log(response))

    //         const facultyDetails = response.map(faculty => faculty.facultyDetails)
    //         console.log("facdet : ", facultyDetails)
    //         for (const facuilty of facultyDetails) {
    //             facuilty.map(faculty => setFacNnS(facNnS.push({ factName: faculty.factName, subjects: faculty.subjects })))
    //         }
    //         // const facultyData = facultyDetails.foreach(facuilty => facuilty.map(faculty => setFacNnS(facNnS.push({factName: faculty.factName, subjects: faculty.subjects}))))
    //         console.log(facNnS);
    //         // console.log(response)
    //     } catch (error) {
    //         console.error("Error fetching faculty and subject data:", error);
    //     }
    // }

    const getUniDept = async () => {
        try {
            const response = await fetch("http://localhost:8000/generalDetails/" + uniNamee + "/get-details", {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            // console.log(data[0]);


            if (data) {
                const deptNames = data[0].generalDetails.depts.map((element) => element.deptName);

                setDeptData(deptNames);
            } else {
                console.log("University not found");
            }
        } catch (err) {
            console.error("Error fetching university data:", err);
        }
    }
    const getFacAndSub = async () => {
        try {
            const response = await fetch("http://localhost:8000/faculty/" + uniNamee + "/get-all-faculty", {
                method: 'GET'
            });

            const data = await response.json();
            // Assuming response is an array of faculties with `facultyDetails`
            const facultyDetails = data.map(faculty => faculty.facultyDetails);

            // Instead of pushing, create a new array
            const formattedFaculties = facultyDetails.flatMap(facultyList =>
                facultyList.map(faculty => ({
                    factName: faculty.factName,
                    subjects: faculty.subjects
                }))
            );

            setFacNnS(formattedFaculties); // Update state with new array
        } catch (error) {
            console.error("Error fetching faculty and subject data:", error);
        }
    };

    const [selectedFaculties, setSelectedFaculties] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFacultySelection = (index) => {
        const updatedSelectedFaculties = [...selectedFaculties];
        const faculty = facNnS[index];

        if (updatedSelectedFaculties.includes(faculty)) {
            setSelectedFaculties(updatedSelectedFaculties.filter(f => f !== faculty));
        } else {
            updatedSelectedFaculties.push(faculty);
            setSelectedFaculties(updatedSelectedFaculties);
        }

        setFormData((prevState) => ({
            ...prevState,
            faculties: updatedSelectedFaculties.map(fac => ({
                factName: fac.factName,
                subjects: fac.subjects
            }))
        }));
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            faculties: prevState.faculties.map(fac => ({
                ...fac,
                subjects: e.target.value
            }))
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, uniName: uniNamee });
        await fetch("localhost:8000/createTimeTableForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        console.log(formData);
    };
    useEffect(() => {
        getUniDept()
        getFacAndSub()
    }, [])

    return (
        <div className="w-screen flex justify-center py-5">
            <form className="w-4/5 flex flex-col justify-center py-5 shadow-xl" onSubmit={handleSubmit}>
                <div className="flex w-full flex-col gap-8 text-start p-7">
                    <div className="font-bold text-4xl mx-auto text-slate-700">
                        Create Timetable Form
                    </div>

                    {/* Department Selection */}
                    <div className="flex flex-col gap-2 justify-start">
                        <div className="font-bold text-2xl text-slate-700">Select Department: </div>
                        <select
                            name="dept"
                            value={formData.dept}
                            onChange={handleInputChange}
                            className="border rounded-lg py-2 px-3 w-full"
                        >
                            <option value="">Select Department</option>
                            {deptData.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semester Input */}
                    <div className="flex flex-col gap-2 justify-start">
                        <input
                            type="text"
                            name="sem"
                            placeholder="Enter Semester"
                            value={formData.sem}
                            onChange={handleInputChange}
                            className="border rounded-lg py-2 px-3 w-full"
                        />
                    </div>

                    {/* Batch Input */}
                    <div className="flex flex-col gap-2 justify-start">
                        <input
                            type="text"
                            name="batch"
                            placeholder="Enter Batch"
                            value={formData.batch}
                            onChange={handleInputChange}
                            className="border rounded-lg py-2 px-3 w-full"
                        />
                    </div>

                    {/* Faculty Checkboxes */}
                    <div className="flex flex-col gap-2 justify-start">
                        <div className="font-bold text-2xl text-slate-700">Select Faculty: </div>
                        {/* {facNnS.map((faculty, index) => {
                        return(
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={faculty.factName}
                                onChange={() => handleFacultySelection(index)}
                                className="w-5 h-5"
                            />
                            <label className="text-lg text-slate-700">{faculty.factName}</label>
                        </div>
                    )})} */}
                        {facNnS && facNnS.length > 0 ? (
                            facNnS.map((faculty, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={faculty.factName}
                                            onChange={() => handleFacultySelection(index)}
                                            className="w-5 h-5"
                                        />
                                        <label className="text-lg text-slate-700">{faculty.factName}</label>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No faculties available</div>
                        )}
                    </div>

                    {/* Subject Dropdown based on selected faculties */}
                    {selectedFaculties.length > 0 && (
                        <div className="flex flex-col gap-2 justify-start">
                            <div className="font-bold text-2xl text-slate-700">Select Subject for Selected Faculty: </div>
                            <select
                                name="subjects"
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                className="border rounded-lg py-2 px-3 w-full"
                            >
                                <option value="">Select Subject</option>
                                {selectedFaculties.flatMap(faculty =>
                                    faculty.subjects.map((subject, index) => (
                                        <option key={index} value={subject}>
                                            {subject}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}

                    {/* Number of Students per Batch */}
                    <div className="flex flex-col gap-2 justify-start">
                        <input
                            type="number"
                            name="numOfStudentPerBatch"
                            placeholder="Enter Number of Students per Batch"
                            value={formData.numOfStudentPerBatch}
                            onChange={handleInputChange}
                            className="border rounded-lg py-2 px-3 w-full"
                        />
                    </div>

                    {/* University Name (from localStorage) */}
                    {/* <div className="flex flex-col gap-2 justify-start">
                        <input
                            type="text"
                            name="uniName"
                            value={formData.uniName}
                            readOnly
                            className="border rounded-lg py-2 px-3 w-full"
                        />
                    </div> */}

                    {/* Submit Button */}
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
