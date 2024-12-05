import { isExpert } from "../role";

export const edit_expert_data = {
  future_date: "A future date is not allowed here.",
  award_form: {
    success: isExpert()
      ? "Awards & Recognition details are successfully sent for approval"
      : "Awards & Recognition details are successfully updated",
    delete: isExpert()
      ? "Awards & Recognition details are successfully sent for approval"
      : "Awards & Recognition details are successfully updated",
    delete_warning: "Are you sure you want to delete this information?",
  },
  basic_form: {
    success: isExpert()
      ? "The basic details are successfully sent for approval."
      : "The basic details are successfully updated.",
  },
  about_form: {
    success: isExpert()
      ? "The about details are successfully sent for approval."
      : "Successfully updated.",
  },
  edu_form: {
    select_both: "Please specify both start and end year",
    start_greater: "Start year can not be greater than end year",
    delete: isExpert()
      ? "Education details are successfully sent for approval"
      : "Education details are successfully updated",
    success: isExpert()
      ? "Education details are successfully sent for approval"
      : "Education details are successfully updated",
    delete_warning: "Are you sure you want to delete this information?",
  },
  exp_form: {
    select_both_1: "Please specify both start and end date",
    select_both_2:
      "Please specify both start date and currently working here as true",
    start_year_greater: "Start date can not be greater than end date",
    start_month_greater: "Start date can not be greater than end date",
    success: isExpert()
      ? "Work Experience details are successfully sent for approval"
      : "Work Experience details are successfully updated",
    delete: isExpert()
      ? "Work Experience details are successfully sent for approval"
      : "Work Experience details are successfully updated",
    delete_warning: "Are you sure you want to delete this information?",
  },
  pat_form: {
    success: isExpert()
      ? "Patent details are successfully sent for approval"
      : "Patent details are successfully updated",
    delete: isExpert()
      ? "Patent details are successfully sent for approval"
      : "Patent details are successfully updated",
    delete_warning: "Are you sure you want to delete this information?",
  },
  personal_form: {
    invalid_primary_email: "Please correct the primary email ID",
    invalid_secondary_email: "Please correct the secondary email ID(s)",
    more_secondary_email: "Upto 4 secondary email IDs are allowed",
    invalid_add_mobile: "Please correct the additional mobile number(s)",
    more_add_mobile: "Upto 4 additional mobile numbers are allowed",
    more_nicknames: "Upto 5 nick names are allowed",
    success: isExpert()
      ? "Personal Info details are successfully sent for approval"
      : "Personal Info details are successfully updated",
    isd_mobile_both: "Don't forget the ISD code. It's needed with your additional mobile number.",
  },
  pub_form: {
    invalid_url: "The URL is not valid",
    success: isExpert()
      ? "Publication details are successfully sent for approval"
      : "Publication details are successfully updated",
    delete_warning: "Are you sure you want to delete this information?",
    delete: isExpert()
      ? "Publication details are successfully sent for approval"
      : "Successfully Deleted",
  },
  snip_form: {
    success: isExpert()
    ? "Relevancy details are successfully sent for approval"
    : "The Relevancy is successfully updated",
  delete: isExpert()
    ? "Relevancy details are successfully sent for approval"
    : "Successfully Deleted",
  delete_warning: "Are you sure you want to delete this Relevancy?",
  },
  web_form: {
    success: isExpert()
      ? "Web Handle details are successfully sent for approval"
      : "Successfully Updated",
  },
};
