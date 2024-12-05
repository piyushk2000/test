import { ProjectClientDetails } from "../../../pages/ce-mapping-expert/types";

export const statusTabFilterOptions = [
  { label: "Shared", value: "Shared" },
  {
    label: "Shortlisted",
    value: "Shortlisted",
  },
  { label: "Scheduled", value: "Scheduled" },
  { label: "Completed", value: "Completed" },
  { label: "Added", value: "Added" },
  { label: "Rejected", value: "Rejected" },
];


export const calenderDialogTitles = (projectClientDetails: ProjectClientDetails) => {
  let calendarTitles = [
    {
      label: "Added On",
      value: "added_on",
    },
    {
      value: "last_updated",
      label: "Last Updated",
    },
  ];

  if (projectClientDetails.addedOnMasking) {
    calendarTitles = calendarTitles.filter(c => c.value !== "added_on");
  }

  if (projectClientDetails.lastUpdatedMasking) {
    calendarTitles = calendarTitles.filter(c => c.value !== "last_updated");
  }

  return calendarTitles;

}

export const calendarDialogType = (projectClientDetails: ProjectClientDetails) => {
  if(projectClientDetails.addedOnMasking && projectClientDetails.lastUpdatedMasking) {
    return ""
  };

  if(projectClientDetails.lastUpdatedMasking && !projectClientDetails.addedOnMasking) {
    return "added_on";
  }

  if(projectClientDetails.addedOnMasking && !projectClientDetails.lastUpdatedMasking) {
    return "last_updated"
  }

  console.log({projectClientDetails});

  return "added_on";
}