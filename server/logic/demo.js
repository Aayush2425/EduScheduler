/*
department, 
sem, 
batch,
stuperbatch,
facuties,
university name

ans :
timetable {
    department:
    sem:
    batch:
    timetable:[]

}
1) main function generate timetable
    all detail function
    timetable assign all common detail
2)  all detail function
3)  check fac available 
4) check resource available
5) check for validation
    day wise
    week wise
    size wise
*/

const Faculty = require("../model/FacultyModel");
const University = require("../model/UniversityModel");
const Resource = require("../model/ResourceModel");

let EntireWeeksTimetable = {
  department: "",
  sem: "",
  batch: "",
  timetable: [],
};

let totalAllocatedResources = {};
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
let numberOfDaysPerWeek = 0;

async function GenerateTimeTable(
  department,
  sem,
  batch,
  resources,
  totalStudentPerBatch,
  Faculties,
  universityName
) {
  try {
    const allUniGeneralDetails = await fetchUniversityDetails(universityName);
    const allUniFaculties = allUniGeneralDetails.facultyDetails;
    const allUniResources = allUniGeneralDetails.resources;

    // console.log("AllUniGeneralDetails : \n", allUniGeneralDetails);
    // console.log("AllUniFaculties : \n", allUniFaculties);
    // console.log("AllUniResources : \n", allUniResources);

    const departmentDetails = getDepartmentDetails(
      allUniGeneralDetails,
      department,
      sem
    );

    EntireWeeksTimetable.department = department;
    EntireWeeksTimetable.sem = sem;
    EntireWeeksTimetable.batch = batch;
    numberOfDaysPerWeek = allUniGeneralDetails.generalDetails.days;
    console.log("Subject Departments details :::::::::::", departmentDetails);
    // subject faculties of dept
    let departmentAllSubjects = departmentDetails.subjects;

    // subject name
    let departmentAllSubjectName = departmentAllSubjects.map(
      (subject) => subject.subjectName
    );
    //  faculties  input
    let DepartmentAllFaculties = Faculties.map((faculty) => faculty.faculty);

    // track of allocated resources
    initializeResourceAllocation(allUniResources);

    allocateTimetableForWeek(
      allUniFaculties,
      allUniResources,
      departmentAllSubjects,
      departmentAllSubjectName,
      DepartmentAllFaculties,
      allUniGeneralDetails
    );

    return EntireWeeksTimetable;
  } catch (error) {
    console.error("Error in GenerateTimeTable: ", error.message);
    throw error;
  }
}

async function fetchUniversityDetails(universityName) {
  const allUniGeneralDetails = await University.findOne({
    name: universityName,
  })
    .populate("facultyDetails")
    .populate("resources")
    .populate("generalDetails");

  if (!allUniGeneralDetails) {
    throw new Error("University not found");
  }
  return allUniGeneralDetails;
}

function getDepartmentDetails(universityDetails, department, sem) {
  let particularDepartment = universityDetails.generalDetails.depts.find(
    (dept) => dept.deptName == department && dept.semester == sem
  );
  if (!particularDepartment) {
    throw new Error("Department not found in the university");
  }
  return particularDepartment;
}

function initializeResourceAllocation(allUniResources) {
  allUniResources.forEach((resource) => {
    if (!totalAllocatedResources[resource.type]) {
      totalAllocatedResources[resource.type] = 0;
    }
  });
}

function allocateTimetableForWeek(
  allUniFaculties,
  allUniResources,
  departmentAllSubjects,
  departmentAllSubjectName,
  DepartmentAllFaculties,
  allUniGeneralDetails
) {
  for (let day = 1; day <= numberOfDaysPerWeek; day++) {
    let dayTimeTable = { day: dayName[day], studySlot: [] };

    allUniGeneralDetails.generalDetails.time.slots.forEach((slot) => {
      let slotTimeTable = {
        slot: slot.name,
        start: slot.start,
        end: slot.end,
        sessions: [],
      };
      let availableResources = getAvailableResourcesForSlot(
        allUniResources,
        slot,
        day
      );
      let availableFaculties = getAvailableFacultiesForSlot(
        allUniFaculties,
        slot,
        day
      );

      console.log(
        "availableResources :::::::::::::::::::::: ",
        availableResources
      );

      console.log("availableFaculties :::::::::::::::: ", availableFaculties);

      allocateSessionsForSlot(
        slotTimeTable,
        availableFaculties,
        availableResources,
        departmentAllSubjects,
        departmentAllSubjectName,
        DepartmentAllFaculties,
        dayTimeTable,
        allUniGeneralDetails
      );
      dayTimeTable.studySlot.push(slotTimeTable);
    });
    console.log("Day Time Table :::::::::::::::::", dayTimeTable);
    EntireWeeksTimetable.timetable.push(dayTimeTable);
  }
}

function getAvailableResourcesForSlot(allUniResources, slot, day) {
  return allUniResources.filter((resource) =>
    resource.availability.some(
      (av) => av.slots.includes(slot.name) && av.day === dayName[day]
    )
  );
}

function getAvailableFacultiesForSlot(allUniFaculties, slot, day) {
  return allUniFaculties.filter((faculty) =>
    faculty.availability.some(
      (av) => av.slots.includes(slot.name) && av.day === dayName[day]
    )
  );
}

function allocateSessionsForSlot(
  slotTimeTable,
  availableFaculties,
  availableResources,
  departmentAllSubjects,
  departmentAllSubjectName,
  DepartmentAllFaculties,
  dayTimeTable,
  allUniGeneralDetails
) {
  let noOfResourcesToBeAllocated =
    allUniGeneralDetails.generalDetails.numberOfResources;

  availableFaculties.forEach((faculty, j) => {
    let singlefaculty = DepartmentAllFaculties[j];
    let subject =
      departmentAllSubjectName[DepartmentAllFaculties.indexOf(singlefaculty)];
    let departmentSubject = departmentAllSubjects.find(
      (sub) => sub.faculty === singlefaculty
    );

    for (let i = 0; i < availableResources.length; i++) {
      let resource = availableResources[i];
      let hasCredit = departmentSubject.credit.some(
        (credit) => credit.resourceName === resource.type
      );

      if (
        hasCredit &&
        validate(
          dayTimeTable,
          departmentAllSubjects,
          resource,
          faculty,
          subject,
          noOfResourcesToBeAllocated
        )
      ) {
        let session = {
          subject: resource.type,
          faculty: faculty.factName,
          resources: resource.name,
          resourceType: resource.type,
          batch: EntireWeeksTimetable.batch,
        };
        slotTimeTable.sessions.push(session);
        totalAllocatedResources[resource.type]++;
        break;
      }
    }
  });
}

function validate(
  dayTimeTable,
  totalSubjects,
  resource,
  faculty,
  subject,
  noOfResourcesToBeAllocated
) {
  let weekResourceCount = 0;
  let weekResourceCredit = 0;

  EntireWeeksTimetable.timetable.forEach((day) => {
    day.studySlot.forEach((slot) => {
      slot.sessions.forEach((session) => {
        if (
          session.subject === subject &&
          session.resources === resource.type
        ) {
          weekResourceCount++;
        }
      });
    });
  });

  totalSubjects.forEach((subjectItem) => {
    subjectItem.credit.forEach((credit) => {
      if (credit.resourceName === resource.type) {
        weekResourceCredit = credit.quantity;
      }
    });
  });

  if (weekResourceCount >= weekResourceCredit) {
    return false;
  }

  let dayResourceCount = 0;
  dayTimeTable.studySlot.forEach((slot) => {
    slot.sessions.forEach((session) => {
      if (session.resources === resource.type) {
        dayResourceCount++;
      }
    });
  });

  if (dayResourceCount >= noOfResourcesToBeAllocated[resource.type]) {
    return false;
  }

  return true;
}

module.exports = GenerateTimeTable;
