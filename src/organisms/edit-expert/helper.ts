import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { EnqueueSnackbar, enqueueSnackbar } from "notistack";
import { edit_expert_data } from "../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../utils/timezoneService";
import { getIsdValue, getPhoneISDValue } from "../../utils/utils";
import { isAdmin, isExpert, isSuperAdmin } from "../../utils/role";
import { GetProfileEdit, Snapshot } from "../expert-pending-approval/type";
import { EXPERT_DETAILS } from "../../pages/Experts/types";
import { getCurrencyValue } from "../../utils/currencies";
import { FormatToLVCommon } from "../../common/formatData";

export type formDefaultValues = {
  personalInfo: object | null;
  basicDetails: object | null;
  about: object | null;
  experience: object | null;
  education: object | null;
  awards: object | null;
  publication: object | null;
  patents: object | null;
  webHandles: object | null;
  snippets: object | null;
  relevant_company: object | null;
  pendingEdits: number | null;
  internal: object | null;
};

export const getDefaultValues = async (
  id: string | null,
  setFormDefaultValues: Function,
  profileEditData: GetProfileEdit["data"] | null
) => {
  if (!id) {
    return;
  }
  try {
    const response = await RequestServer(
      `${APIRoutes.getExpert}?id=${id}&embed=YES&stakeholders=YES`,
      "get"
    );

    if (response.success) {
      const data = response.data[0];
      const personalInfo = getPersonalInfoDefaultValues(data);
      const basicDetails = getBasicDetailsDefaultValues(data);
      const about = getAboutDefaultValue(data);
      const experience = data?.work_experiences || [];
      const education = data?.meta?.education || [];
      const awards = data?.meta?.awards || [];
      const publication = data?.meta?.publications || [];
      const patents = data?.meta?.patents || [];
      const webHandles = data?.meta?.webhandles || [];
      const snippets = data?.meta?.snippets || [];
      const relevant_company = data?.meta?.relevant_company || null;
      const internal = {
        internal_notes: data?.internal_notes,
        offlimit_topics: data?.offlimit_topics?.split(", ") || [],
        offlimit_companies: data?.offlimit_companies?.split(", ") || []
      }

      console.log({internal})
      const payload = {
        personalInfo,
        basicDetails,
        about,
        experience,
        education,
        awards,
        publication,
        patents,
        webHandles,
        snippets,
        relevant_company,
        pendingEdits: data.pending_edits,
        internal
      };
      if (isExpert()) {
        await getExpertDefaultValues(
          data,
          setFormDefaultValues,
          payload,
          profileEditData
        );
      } else {
        if (personalInfo && basicDetails && about && experience) {
          setFormDefaultValues(payload);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export async function getExpertDefaultValues(
  data: EXPERT_DETAILS,
  setFormDefaultValues: Function,
  defaultValues: {
    personalInfo: any;
    basicDetails: any;
    about: any;
    experience: any;
    education: any;
    awards: any;
    publication: any;
    patents: any;
    webHandles: any;
    snippets: any;
    relevant_company: any;
  },
  profileEditData?: GetProfileEdit["data"] | null
) {
  if (!profileEditData) {
    setFormDefaultValues(defaultValues);
    return;
  }

  const latestWorkEx = await RequestServer(
    `${APIRoutes.latestWorkExEdit}?fk_expert=${data.id}`,
    "GET"
  );

  const pending_workex_ids: number[] = [];

  for (let profile of profileEditData) {
    const payload = profile.payload;
    const action = payload?.action;

    if (profile.action.includes("WorkEx_")) {
      if (profile.action !== "WorkEx_new") {
        const pending_id = profile.action.split("_")[1];
        pending_workex_ids.push(parseInt(pending_id));
      }
    }
    if (action === "PersonalInfo") {
      defaultValues.personalInfo = getPersonalInfoDefaultValues(payload);
    }

    if (action === "BasicInfo") {
      defaultValues.basicDetails = getBasicDetailsDefaultValues(payload);
      defaultValues.about = getBasicDetailsDefaultValues(payload);
    }

    if (action === "EducationInfo") {
      defaultValues.education = payload?.education;
    }

    if (action === "PatentInfo") {
      defaultValues.patents = payload?.patents;
    }

    if (action === "AwardsInfo") {
      defaultValues.awards = payload?.awards;
    }

    if (action === "PublicationInfo") {
      defaultValues.publication = payload?.publications;
    }

    if (action === "WebHandleInfo") {
      defaultValues.webHandles = payload?.webhandles;
    }
  }

  // Getting the workEx Value from the latestWorkEx API - Current Snapshot
  if (
    latestWorkEx.success &&
    latestWorkEx?.data[0]?.payload?.current_snapshot
  ) {
    defaultValues.experience = latestWorkEx.data[0].payload.current_snapshot;
  }

  // If Exp_ID is present in pending_workex_ids, we will send True value to isExpAllowed
  defaultValues.experience = defaultValues.experience.map((exp: Snapshot) => {
    const exp_id = exp.id;
    const isExpIDPresent = pending_workex_ids.find((id) => id === exp_id);

    return {
      ...exp,
      is_exp_allowed: !exp_id ? false : !isExpIDPresent,
    };
  });

  setFormDefaultValues(defaultValues);
}

export const addHttpsUrl = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
};

export const checkLength = (
  data: any,
  limit: number,
  type: "string" | "array",
  warningMessage: string
) => {
  if (type === "string") {
    if (data.split("").length > limit) {
      enqueueSnackbar(warningMessage, {
        variant: "warning",
      });
      return false;
    }
  } else if (type === "array") {
    if (data.length > limit) {
      enqueueSnackbar(warningMessage, {
        variant: "warning",
      });
      return false;
    }
  }

  return true;
};

// Function returns true if the year or month is of Future , else false
export const isDateFuture = (
  user_date: Date,
  warningMessage: string,
  enqueueSnackbar: EnqueueSnackbar,
  check: "year" | "month" | "full"
) => {
  let isFuture;
  if (check === "year") {
    const futureDate = LocalDayjs(user_date).year();
    const date = LocalDayjs().year();
    isFuture = futureDate > date;
  } else {
    const futureDate = LocalDayjs(user_date);
    const date = LocalDayjs();
    isFuture = futureDate.isAfter(date);
  }

  if (isFuture) {
    enqueueSnackbar(warningMessage, {
      variant: "warning",
    });
    return true;
  }

  return false;
};

// Function returns true if the start_date is bigger than end_date
export const startEndCompare = (
  start: any,
  end: any,
  warningYearMessage: string,
  warningMonthMessage: string
) => {
  const [start_year, start_month] = LocalDayjs(start)
    .format("YYYY/MM")
    .split("/");
  const [end_year, end_month] = LocalDayjs(end).format("YYYY/MM").split("/");

  if (parseInt(start_year) > parseInt(end_year)) {
    enqueueSnackbar(warningYearMessage, {
      variant: "warning",
    });
    return true;
  } else if (parseInt(start_year) === parseInt(end_year)) {
    if (parseInt(start_month) > parseInt(end_month)) {
      enqueueSnackbar(warningMonthMessage, {
        variant: "warning",
      });
      return true;
    }
  }

  return false;
};

const getPersonalInfoDefaultValues = (data: any) => {
  const { isd_code, primary_mobile } = getPhoneISDValue(
    data?.primary_mobile || ""
  );
  const { isd_code: isd_code_add_one, primary_mobile: additional_mobile_one } =
    getPhoneISDValue(data?.additional_mobile_one || "");
  const { isd_code: isd_code_add_two, primary_mobile: additional_mobile_two } =
    getPhoneISDValue(data?.additional_mobile_two || "");

  const defaultValues: any = {
    salutation: data?.salutation
      ? {
          label: data?.salutation,
          value: data?.salutation,
        }
      : null,
    name: data?.name,
    firstname: (data?.name.split(' '))[0],
    lastname: (data?.name.split(' ')).slice(1).join(' '),
    nicknames: data.nicknames ? data.nicknames.split(", ") : [],
    dob: data?.dob ? LocalDayjs(data.dob) : null,
    premium_expert: data.premium_expert ? data.premium_expert : false,
    rating: data?.internal_rating || null,
    dnd_enabled: data?.dnd_enabled || null,
    private_profile: data?.private_profile || null,
    primary_email: data?.primary_email || "",
    additional_email_one: data?.additional_email_one || "",
    additional_email_two: data?.additional_email_two || "",
    isd_code,
    primary_mobile,
    isd_code_add_one,
    additional_mobile_one,
    isd_code_add_two,
    additional_mobile_two,
  };
  return defaultValues;
};

const getBasicDetailsDefaultValues = (data: any) => {

  let current_base_location = data?.base_location_value 
  ? {label: data?.base_location_value.name, value: data?.base_location_value?.id } 
  : null

  let expert_geographies = data?.expert_geographies_value 
  ? FormatToLVCommon<any,any,any>(data?.expert_geographies_value,"name","id") : [];

  if(!current_base_location) {
    current_base_location = data?.current_base_location || null;
  }

  if(!expert_geographies) {
    expert_geographies = data?.expert_geographies || [];
  }

  
  const price_per_hour_currency = getCurrencyValue(
    data?.price_per_hour_currency || null
  );
  const defaultValues: any = {
    headline: data?.headline,
    price_per_hour: data?.price_per_hour,
    price_per_hour_currency: data?.price_per_hour_currency
      ? price_per_hour_currency
      : "",
    functions: data?.functions?.split(", ") || [],
    l0_domain: data?.domain_l0_value
      ? { label: data?.domain_l0_value?.name, value: data?.domain_l0_value?.id }
      : null,
    l1_domain: data?.domain_l1
      ? { label: data?.domain_l1_value?.name, value: data?.domain_l1_value?.id }
      : null,
    l2_domain: data?.domain_l2
      ? { label: data?.domain_l2_value?.name, value: data?.domain_l2_value?.id }
      : null,
    l3_domain: data?.domain_l3_value
      ? { label: data?.domain_l3_value?.name, value: data?.domain_l3_value?.id }
      : null,
    domain_other: data?.domain_other?.split(", ") || [],
    current_base_location,
    expert_geographies
  };

  return defaultValues;
};

const getAboutDefaultValue = (data: any) => {
  return {
    bio: data?.bio
  }
};

export const basicDetailsFormSubmit = async (
  formData: any,
  enqueueSnackbar: any,
  id: string,
  setFormChange: Function,
  setFormDefaultValues: Function,
  form: "about" | "basicDetails",
  setBackdropOpen: Function
) => {
  let payload: any = {
    id: parseInt(id)
  };

  if (form === "basicDetails") {
    payload = {
      ...payload,
      action: "BasicInfo",
      headline: formData?.headline,
      price_per_hour: formData?.price_per_hour?.toString(),
      price_per_hour_currency: formData?.price_per_hour_currency?.value,
      functions: formData?.functions?.join(", ") || null,
      domain_other: formData.domain_other?.join(", ") || null,
      base_location: formData?.current_base_location?.value || null,
      expertise_in_these_geographies: formData?.expert_geographies?.map((g: any) => g.value) || []
    }
  } else {
    payload = {
      ...payload,
      action: "AboutInfo",
      bio: formData?.bio
    }
  }

  if ((isAdmin() || isSuperAdmin()) && form === "basicDetails") {
    payload.domain_l0 = formData?.l0_domain?.value || null;
    payload.domain_l1 = formData?.l1_domain?.value || null;
    payload.domain_l2 = formData?.l2_domain?.value || null;
    payload.domain_l3 = formData?.l3_domain?.value || null;
  }

  if(isExpert() && form === "basicDetails") {
    payload.current_base_location = formData?.current_base_location || null;
    payload.expert_geographies = formData?.expert_geographies || [];
  }

  try {
    setBackdropOpen(true);
    const response = await RequestServer(
      APIRoutes.editExpert,
      "PATCH",
      payload
    );

    if (response.success) {
      if (form === "basicDetails") {
        enqueueSnackbar(edit_expert_data.basic_form.success, {
          variant: "success",
        });

        // setting form change to false for basicDetails
        setFormChange((prevFormChangeValues: any) => ({
          ...prevFormChangeValues,
          basicDetails: false,
        }));

        // setting form default values to NULL
        setFormDefaultValues((prevDefaultValues: any) => ({
          ...prevDefaultValues,
          basicDetails: null,
        }));
      } else if (form === "about") {
        enqueueSnackbar(edit_expert_data.about_form.success, {
          variant: "success",
        });

        // setting form change to false for about
        setFormChange((prevFormChangeValues: any) => ({
          ...prevFormChangeValues,
          about: false,
        }));

        // setting form default values to NULL
        setFormDefaultValues((prevDefaultValues: any) => ({
          ...prevDefaultValues,
          about: null,
        }));
      }

      setBackdropOpen(false);

      const profileEditResponse: GetProfileEdit = await RequestServer(
        APIRoutes.profileEdit + "?fk_expert=" + id,
        "GET"
      );

      // changing default values
      await getDefaultValues(
        id,
        setFormDefaultValues,
        profileEditResponse.data
      );
    } else {
      console.log({ response });
      setBackdropOpen(false);
      enqueueSnackbar(response.message, { variant: "warning" });
    }
  } catch (err) {
    console.error({ err });
    setBackdropOpen(false);
    enqueueSnackbar("Request failed.", { variant: "error" });
  }
};

export const updateFields = async (
  payload: any,
  id: any,
  setBackdropOpen: any,
  enqueueSnackbar: any,
  setFormChange: any,
  setFormDefaultValues: any,
  fieldName:
    | "personalInfo"
    | "experience"
    | "awards"
    | "education"
    | "publication"
    | "patents"
    | "webHandles"
    | "snippets"
    | "internal",
  successMessage: string,
  setAddMoreOpen?: any
) => {
  try {
    setBackdropOpen(true);
    const response = await RequestServer(
      APIRoutes.editExpert,
      "PATCH",
      payload
    );

    if (response.success) {
      if (isExpert()) {
        const isError =
          response.message ===
          "This specific work experience is already pending for review. You can not edit until previous edit is approved.";

        enqueueSnackbar(isError ? response.message : successMessage, {
          variant: isError ? "warning" : "success",
        });
      } else {
        enqueueSnackbar(successMessage, {
          variant: "success",
        });
      }

      // Setting form change to false
      setFormChange((prevFormChangeValues: any) => ({
        ...prevFormChangeValues,
        [fieldName]: false,
      }));

      // setting form default values to NULL
      setFormDefaultValues((prevDefaultValues: any) => ({
        ...prevDefaultValues,
        [fieldName]: null,
      }));

      if (setAddMoreOpen) {
        // Add more option enabled
        setAddMoreOpen(true);
      }

      setBackdropOpen(false);

      const profileEditResponse: GetProfileEdit = await RequestServer(
        APIRoutes.profileEdit + "?fk_expert=" + id,
        "GET"
      );

      // changing default values
      await getDefaultValues(
        id,
        setFormDefaultValues,
        profileEditResponse.data
      );
    } else {
      console.log({ response });

      setBackdropOpen(false);
      enqueueSnackbar(response.message, { variant: "warning" });
    }
  } catch (err) {
    console.error({ err });
    setBackdropOpen(false);
    enqueueSnackbar("Request failed.", { variant: "error" });
  }
};


export function isDateValid(date: string | null,enqueueSnackbar: EnqueueSnackbar,field_name: string) {
  if(!date) {
    return true;
  }

  const givenDate = LocalDayjs(date);
  const year1950 = LocalDayjs("1950-01-01");
  const currentYear = LocalDayjs();
  const valid = givenDate.isBefore(currentYear) && givenDate.isAfter(year1950);

  if(!valid) {
    enqueueSnackbar(field_name + ` should be between 1950-${currentYear.format("YYYY")} Year`, {
      variant: "warning"
    });
    return false;
  } else {
    return true;
  }
}