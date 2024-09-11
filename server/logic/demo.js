for (let j = 0; j < DepartmentAllFaculties.length; j++) {
  let singlefaculty = DepartmentAllFaculties[j];
  console.log(singlefaculty);

  let subject =
    departmentAllSubjectName[
      DepartmentAllFaculties.indexOf(faculty)
    ];

  for (let i = 0; i < availableResourcesPerSlot.length; i++) {
    let resource = availableResourcesPerSlot[i];

    // Check if faculty has credit for the resource type
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
            DepartmentAllFaculties.indexOf(faculty)
          ];
      } else if (i < availableResourcesPerSlot.length) {
        b++;
        resource = availableResourcesPerSlot[b];
         hasCredit = false;
        faculty = DepartmentAllFaculties.filter((faculty) => {
          if (singlefaculty.factName == faculty.factName) {
            return faculty;
          }
        });

        for (let k = 0; k < faculty.credit.length; k++) {
          let tt = singlefaculty.credit[k];
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