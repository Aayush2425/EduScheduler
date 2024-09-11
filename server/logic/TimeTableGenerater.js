const Faculty = require("../model/FacultyModel");
const University = require("../model/UniversityModel");
const Resource = require("../model/ResourceModel");

let EntireWeeksTimetable = {
    department: "",
    sem: "",
    batch: "",
    timetable: [],
};
let numberOfDaysPerWeek = 0;

const dayName = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

let totalAllocatedResources = {};

async function GenerateTimeTable(
    department,
    sem,
    batch,
    resources,
    totalStudentPerBatch,
    Faculties, // [{subject,faculty}]
    universityName
) {
    try {
        // Fetching general details of the university
        const allUniGeneralDetails = await University.findOne({
            name: universityName,
        })
            .populate("facultyDetails")
            .populate("resources")
            .populate("generalDetails");

        if (!allUniGeneralDetails) {
            throw new Error("University not found");
        }

        // Populating faculties and resources
        const AllUniFaculties = allUniGeneralDetails.facultyDetails;
        const AllUniResources = allUniGeneralDetails.resources;

        // Extracting unique resource types
        let AllUniResourceTypes = [];
        AllUniResources.forEach((resource) => {
            if (!AllUniResourceTypes.includes(resource.type)) {
                AllUniResourceTypes.push(resource.type);
            }
        });

        // Initialize resource allocation counters
        AllUniResourceTypes.forEach((type) => {
            totalAllocatedResources[type] = 0;
        });

        // Initialize timetable for the entire week
        EntireWeeksTimetable.department = department
        EntireWeeksTimetable.sem = sem
        EntireWeeksTimetable.batch = batch

        // Set the number of days in a week for this university
        numberOfDaysPerWeek = allUniGeneralDetails.generalDetails.days;

        // Finding department details
        let particularDepartment = allUniGeneralDetails.generalDetails.depts.find(
            (dept) => dept.deptName == department && dept.semester == sem
        );

        if (!particularDepartment) {
            throw new Error("Department not found in the university");
        }

        let departmentAllSubjects = particularDepartment.subjects; // General subjects of the department
        let departmentAllSubjectName = departmentAllSubjects.map(
            (subject) => subject.subjectName
        );

        let DepartmentAllFaculties = Faculties.map((faculty) => faculty.faculty); // Faculties from Faculties input

        // console.log("DepartmentAllFaculties: ", DepartmentAllFaculties);
        console.log("DepartmentAllSubjects: ", departmentAllSubjects);
        // console.log("DepartmentAllSubjectName: ", departmentAllSubjectName);
        // console.log("AllUniFaculties: ", AllUniFaculties);
        // console.log("AllUniResources: ", AllUniResources);
        let noOfResourcesToBeAllocated = allUniGeneralDetails.generalDetails.numberOfResources;

        //Loop through each day of the week
        for (let day = 1; day <= numberOfDaysPerWeek; day++) {
            let dayTimeTable = { day: dayName[day], studySlot: [] };

            // Loop through each time slot for the day
            allUniGeneralDetails.generalDetails.time.slots.forEach((slot) => {
                let slotTimeTable = {
                    slot: slot.name,
                    start: slot.start,
                    end: slot.end,
                    sessions: [], // session = [{subject, faculty, resources, resourceType, batch}]
                };

                let availableResourcesPerSlot = [];

                // Find all available resources for the current slot
                for (let i = 0; i < AllUniResources.length; i++) {
                    let resource = AllUniResources[i];

                    for (let j = 0; j < resource.availability.length; j++) {
                        let av = resource.availability[j];

                        if (av.slots.includes(slot.name) && av.day == dayName[day]) {
                            availableResourcesPerSlot.push(resource);
                            break; // Exit the inner loop if we find a matching availability
                        }
                    }
                }

                let availableFacultyPerSlot = [];

                // Find all available faculties for the current slot
                for (let i = 0; i < AllUniFaculties.length; i++) {
                    let faculty = AllUniFaculties[i];
                    let isAvailable = false;

                    for (let j = 0; j < faculty.availability.length; j++) {
                        let av = faculty.availability[j];
                        // console.log("avvvvvvvvvvv   ", av);

                        if (av.slots.includes(slot.name) && av.day == dayName[day]) {
                            isAvailable = true;
                            availableFacultyPerSlot.push(faculty);
                        }
                    }
                }
                // Loop through available faculties and allocate sessions
                for (let j = 0; j < DepartmentAllFaculties.length; j++) {
                    let singlefaculty = DepartmentAllFaculties[j];
                    // console.log(singlefaculty);

                    let subject =
                        departmentAllSubjectName[
                        DepartmentAllFaculties.indexOf(singlefaculty)
                        ];

                    let faculty;

                    for (let fac of departmentAllSubjects) {
                        if (fac.faculty == singlefaculty) {
                            faculty = fac;
                            break;
                        }
                    }

                    for (let i = 0; i < availableResourcesPerSlot.length; i++) {
                        let resource = availableResourcesPerSlot[i];

                        // Check if faculty has credit for the resource type
                        // console.log("Naktuuuuuuuuuuuuu   ", faculty);

                        let hasCredit = false;
                        for (let k = 0; k < faculty.credit.length; k++) {
                            let tt = faculty.credit[k];
                            if (tt.resourceName === resource.type) {
                                hasCredit = true;
                                break; // No need to check further if a match is found
                            }
                        }
                        let a = j;
                        let b = i;
                        // If faculty has credit for the resource and validation passes

                        while (
                            b < availableResourcesPerSlot.length &&
                            a < DepartmentAllFaculties.length
                        ) {
                            if (
                                hasCredit &&
                                validate(
                                    dayTimeTable,
                                    departmentAllSubjects,
                                    resource,
                                    singlefaculty,
                                    subject,
                                    noOfResourcesToBeAllocated
                                )
                            ) {
                                let session = {
                                    subject: resource.type,
                                    faculty: faculty.factName,
                                    resources: resource.name,
                                    resourceType: resource.type,
                                    batch: batch,
                                };

                                slotTimeTable.sessions.push(session);
                                totalAllocatedResources[resource.type]++;
                                break; // Exit the inner loop once a resource is allocated for the slot
                            } else if (j < DepartmentAllFaculties.length) {
                                a++;
                                singlefaculty = DepartmentAllFaculties[a];

                                subject =
                                    departmentAllSubjectName[
                                    DepartmentAllFaculties.indexOf(singlefaculty)
                                    ];

                                for (let fac of departmentAllSubjects) {
                                    if (fac.faculty == singlefaculty) {
                                        faculty = fac;
                                        break;
                                    }
                                }

                            } else if (i < availableResourcesPerSlot.length) {
                                b++;
                                resource = availableResourcesPerSlot[i];
                                hasCredit = false;
                                for (let k = 0; k < faculty.credit.length; k++) {
                                    let tt = faculty.credit[k];
                                    if (tt.resourceName === resource.type) {
                                        hasCredit = true;
                                        break; // No need to check further if a match is found
                                    }
                                }

                            }
                        }
                        // Exit the inner loop once a resource is allocated for the slot
                    }
                }

                dayTimeTable.studySlot.push(slotTimeTable);
            });
            EntireWeeksTimetable.timetable.push(dayTimeTable);
        }

        // console.log("Total allocated resources: ", totalAllocatedResources);
        // console.log("Entire Weeks Timetable: ", EntireWeeksTimetable);

        return EntireWeeksTimetable;
    } catch (error) {
        console.error("Error in GenerateTimeTable: ", error.message);
        throw error;
    }
}

function validate(dayTimeTable, totalSubjects, resource, faculty, subject, noOfResourcesToBeAllocated) {
    let weekResourceCount = 0;
    let weekResourceCredit = 0;

    if (EntireWeeksTimetable.timetable.length == 0) {
        return true;
    }

    EntireWeeksTimetable.timetable.forEach((day) => {
        console.log(day);

        day.studySlot.forEach((slot) => {
            slot.sessions.forEach((session) => {
                if (session.subject == subject && session.resources == resource.type) {
                    weekResourceCount++;
                }
            });
        });
    });

    totalSubjects.forEach((subjectItem) => {
        subjectItem.credit.forEach((cre) => {
            if (cre.resourceName == resource.type) {
                weekResourceCredit = cre.quantity;
            }
        });
    });

    if (weekResourceCount >= weekResourceCredit) {
        return false;
    }

    let dayResourceCount = 0;
    let dayResourceCredit = noOfResourcesToBeAllocated[resource.type];

    dayTimeTable.studySlot.forEach(slot => {
        slot.sessions.forEach(session => {
            if (session.resources == resource.type) {
                dayResourceCount++;
            }
        });
    })

    if (dayResourceCount >= dayResourceCredit) {
        return false;
    }

    return true;
}

module.exports = GenerateTimeTable;