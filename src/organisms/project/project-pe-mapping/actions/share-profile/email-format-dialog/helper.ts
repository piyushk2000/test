import { LocalDayjs } from "../../../../../../utils/timezoneService";
import { ExpertDetails, WorkExperience, getExpertDataReturn } from "./types";

const formatStartEndDate = (
  start: string | null,
  end: string | null
): string | null => {
  if (start) {
    return `(${LocalDayjs(start).format("MMM YYYY")} - ${
      end ? LocalDayjs(end).format("MMM YYYY") : "Present"
    })`;
  }

  return null;
};

const getWorkHistory = (work_experiences: WorkExperience[]): string[] => {
  const work_history: string[] = [];

  // all work experiences with start_date but without end_date
  // and it is also sorted in a way that start_date is bigger
  // shown first
  const all_workex_without_end_date = work_experiences
    .filter((wx) => wx.start_date && !wx.end_date)
    .sort((a, b) => LocalDayjs(b.start_date).diff(LocalDayjs(a.start_date)));

  for (let wx of all_workex_without_end_date) {
    work_history.push(
      `${wx.designation} at ${wx.company} ${formatStartEndDate(
        wx.start_date,
        wx.end_date
      )}`
    );
  }

  // checking if we got sufficient relevant experience or not
  if (work_history.length >= 3) {
    return work_history.slice(0, 3);
  }

  // all work experiences with start_date & end_date
  // and it is also sorted in a way that end_date is bigger
  // shown first
  const all_workex_with_end_date = work_experiences
    .filter((wx) => wx.start_date && wx.end_date)
    .sort((a, b) => LocalDayjs(b.end_date!).diff(LocalDayjs(a.end_date!)));

  for (let wx of all_workex_with_end_date) {
    work_history.push(
      `${wx.designation} at ${wx.company} ${formatStartEndDate(
        wx.start_date,
        wx.end_date
      )}`
    );
  }

  // checking if we got sufficient relevant experience or not
  if (work_history.length >= 3) {
    return work_history.slice(0, 3);
  }

  // all work experiences without start_date & end_date
  const all_workex_with_no_date = work_experiences.filter(
    (wx) => !wx.start_date && !wx.end_date
  );

  for (let wx of all_workex_with_no_date) {
    work_history.push(`${wx.designation} at ${wx.company}`);
  }

  return work_history.slice(0, 3);
};

export const getExpertData = (
  data: ExpertDetails,
  relevant_company: string | null,
  relevant_designation: string | null,
  charges_amount: string | null
): getExpertDataReturn => {
  const work_experiences = data.work_experiences;

  /* ===============================================
        RELEVANT COMPANY START AND END DATE
    ================================================
  */

  const relevant_WorkEx = work_experiences.find(
    (wx) =>
      wx.company === relevant_company && wx.designation === relevant_designation
  );

  const rel_company_date =
    relevant_WorkEx?.start_date || relevant_WorkEx?.end_date
      ? `(${
          relevant_WorkEx?.start_date
            ? LocalDayjs(relevant_WorkEx.start_date).format("MMM YYYY")
            : ""
        } - ${
          relevant_WorkEx?.end_date
            ? LocalDayjs(relevant_WorkEx.end_date).format("MMM YYYY")
            : "Present"
        })`
      : null;

  /*
    ==========================================================
         Current Designation and Company with dates
    ==========================================================
  */

  // all work experiences with start_date but without end_date
  // and it is also sorted in a way that start_date is bigger
  // shown first
  const all_workex_without_end_date = work_experiences
    .filter((wx) => wx.start_date && !wx.end_date)
    .sort((a, b) => LocalDayjs(b.start_date).diff(LocalDayjs(a.start_date)));

  let curr_company_full: string | null = null;

  // If no workex found where start date is present but end date is not
  if (all_workex_without_end_date.length === 0) {
    curr_company_full = null;

    // if one or more than one workex found where start date is present but end date is not
  } else {
    const { company, designation, start_date } = all_workex_without_end_date[0];
    curr_company_full = `${designation} at ${company} (${LocalDayjs(
      start_date
    ).format("MMM YYYY")} - Present)`;
  }

  /* 
    ============================================================================
            Work History
    ============================================================================
    */

  let work_history = getWorkHistory(work_experiences);

  /*
    ========================================================================
            Charges
    ========================================================================
    */

  let charges =
     charges_amount
      ? `${charges_amount} per hour`
      : null;

  const premium_expert = `${
    data.premium_expert
      ? " (Premium Expert: Chargeable duration will be 2x of actual duration) "
      : ""
  }`;

  return {
    name: data.name,
    rel_company_date,
    curr_company_full,
    geography: data.base_location_value.name,
    work_history,
    charges,
    premium_expert
  };
};
