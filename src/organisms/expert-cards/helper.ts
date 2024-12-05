import { EnqueueSnackbar, enqueueSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { ExpertControllerRef, filterPayload } from "../../pages/Experts/types";
import { LocalDayjs } from "../../utils/timezoneService";
import { handleCopy } from "../../molecules/expert-profile-sections/profile-section/helper";
import { isClient } from "../../utils/role";
import { ExpertTable } from "./expert-table/expert-table";
import { ExpertsApiData } from "./types";
import { formatCallData } from "../../atoms/profile-cardV1/expert-call-detail-tooltip/helper";
import { CallDetail } from "../../pages/Calls/types";
import { openDialog } from ".";

export const getProfileDetails = async (
  page: string,
  setApiData: any,
  setLoading: any,
  filterPayload: filterPayload,
  setFilterPayload: any,
  project_id: string | null,
  controllerRef: React.MutableRefObject<ExpertControllerRef> | null,
  getUrlPayload?: boolean
) => {

  // Set loading to true immediately
  setLoading(true);
  // Clear previous API data
  !getUrlPayload && setApiData(null);

  if (controllerRef && controllerRef.current.controller && controllerRef.current.clearTimeout) {
    controllerRef.current.controller.abort();
    controllerRef.current.clearTimeout();
  }

  try {
    let payload: any = {};

    payload.page = parseInt(page);
    const url = APIRoutes.expertFilters;

    // if client is logged In
    const isClientLogin = isClient();

    if (isClientLogin) {
      /* WHY WE ARE DOING embed = "YES"
        because on dec 22 , 2023 - API show_columns
        key does not support , these fields
        - domain_l0_value
        - domain_l1_value
        - domain_l2_value
        - domain_l3_value
        - work_experiences ( Needed to calculate total years of experience )
        - base_location_value
      */
      payload.embed = "YES";
      payload.equalto___status = "Confirmed";
      payload.notequalto___type = "Referral Admin";
      payload.limit = 30;
    } else {
      payload.show_columns = `id,name,type,status,primary_mobile,dnd_enabled,primary_email,approved_by,internal_notes,qc_notes,price_per_hour,picture,price_per_hour_currency,premium_expert,meta,bio,domain_l0,domain_l1,domain_l2,functions,updated_at,created_at,badge,confirmed_on,pending_edits,headline,base_location,domain_other,fk_project,expertise_in_these_geographies`;
      payload.limit = filterPayload.rowsPerPage;
      payload.show_base_location = "1";
      payload.show_domains = "1";
      payload.show_project_columns = "id,topic";
      payload.show_workex_columns = "id,company,status,designation,location,expert_id,start_date,end_date,currently_works_here";
    }
    payload.stakeholders = "YES";

    // if date range filter is loaded
    if (filterPayload.dateFilter) {
      payload = { ...payload, ...filterPayload.dateFilter };
    }

    // if type filter is loaded
    if (filterPayload.typeFilter) {
      payload = { ...payload, type: filterPayload.typeFilter };
    }

    // if advance filter is loaded
    if (filterPayload.advanceFilter) {
      payload = { ...payload, ...filterPayload.advanceFilter };
    }

    // if sort filter is loaded
    if (filterPayload.sortFilter) {
      payload = { ...payload, sort_by: filterPayload.sortFilter };
    }

    // is search filter is added
    if (filterPayload.searchFilter) {
      if (isClient()) {
        payload = { ...payload, search_work_ex: filterPayload.searchFilter };
      } else {
        payload = { ...payload, search: filterPayload.searchFilter };
      }
    }

    // if status filter is added
    if (filterPayload.statusFilter.length) {
      payload = { ...payload, status: filterPayload.statusFilter.join(",") };
    }

    // If project filter is added
    if (project_id) {
      payload = { ...payload, equalto___fk_project: parseInt(project_id) };
    }

    // If Badge Filter is added
    if (filterPayload.badgeFilter.length) {
      payload = { ...payload, in___badge: filterPayload.badgeFilter.join(",") };
    }

    // If Pending Approval is Added
    if (filterPayload.pending_approvals) {
      payload = { ...payload, greaterthan___pending_edits: 0 };
    }

    // Other Searches -------------------------------------------- //

    const {
      id,
      name,
      email,
      mobile,
      nick_name,
      headline,
      bio,
      functions,
      company,
      domain,
      work_division
    } = filterPayload.otherSearchFilter;

    // Search by ID
    if (id) {
      payload = { ...payload, id };
    }

    // Search by Name
    if (name) {
      payload = { ...payload, like___name: name };
    }

    // search by nickname
    if (nick_name) {
      payload = { ...payload, like___nicknames: nick_name };
    }

    // Search by Email
    if (email) {
      payload = { ...payload, like___all_emails: email };
    }

    // Search by mobile
    if (mobile) {
      payload = { ...payload, like___all_mobile_numbers: mobile };
    }

    // Search by headline
    if (headline) {
      payload = { ...payload, like___headline: headline };
    }

    // Seach by bio
    if (bio) {
      payload = { ...payload, like___bio: bio };
    }

    // Search by functions
    if (functions) {
      payload = { ...payload, like___functions: functions };
    }

    // Search by Company
    if (company) {
      payload = { ...payload, search_work_ex: company };
    }

    // Search by Work Division
    if(work_division) {
      payload = { ...payload, search_work_division_ex: work_division};
    }

    //Search by Domain
    if (domain) {
      payload = { ...payload, search_domain: domain }
    }
    // ----------------------------------------------------------- //

    if (getUrlPayload) {
      setLoading(false);
      return {
        url, payload
      }
    }

    const response = await RequestServer(url, "post", payload, undefined, undefined, (abort, clearTimeout) => {
      if (controllerRef) {
        controllerRef.current.controller = abort;
        controllerRef.current.clearTimeout = clearTimeout;
      }
    });
    response.data = await getCallProjectCounts(response.data);

    // setting expert Details response
    setApiData(response);
  } catch (err) {
    console.log(err);
  } finally {
    // Check if this is the most recent call before setting loading to false
    if (controllerRef && controllerRef.current !== null) {
      setLoading(false);
    }
  }
};


export async function getCallProjectCounts(data: ExpertsApiData["data"]) {
  try {
    const expert_ids = data.map(d => d.id).join(",");

    const url =
      APIRoutes.scheduleCall +
      "?in___fk_expert=" +
      expert_ids +
      "&show_columns=id,fk_project,fk_expert,call_status" + "&notequalto___status=Scheduled";

    const response = await RequestServer(url, "GET");
    const response_data: Partial<CallDetail>[] = response.data;

    if (response.success) {
      for (let e_data of data) {
        let fk_expert = e_data.id;
        const current_expert_data = response_data.filter((value) => value.fk_expert === fk_expert);
        e_data.calls_data = formatCallData(current_expert_data);
      }
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}

export const contactMediumValues = [
  { label: "Linkedin", value: "LinkedIn" },
  { label: "Email", value: "Email" },
  { label: "Phone", value: "Mobile" },
  { label: "Other", value: "Any_Other" },
];

export const responseArr = [
  { label: "Accept", value: "Approved" },
  { label: "Refuse", value: "Refused" },
];

export const complianceResponseArr = [
  { label: "Approve", value: "Approved" },
  { label: "Reject", value: "Refused" },
];


export const refusalReasonArr = [
  { label: "Organisational", value: "Organisational" },
  { label: "Personal", value: "Personal" },
  { label: "Other", value: "Other" },
];

export const modeArr = [{ label: "Email", value: "Email" }];

export const defaultDialogValues: openDialog = {
  editExpertDialog: { state: false, id: null, isChange: false },
  markContacted: { state: false, id: null },
  acceptRefuse: { state: false, id: null, status: null, isChange: false },
  showImage: { id: null, state: false, image: null },
  uploadImage: { state: false, id: null },
  deleteImage: { id: null, state: false },
  generateCompliance: { state: false, id: null },
  refusedReopen: { state: false, id: null },
  resendCompliance: { state: false, id: null },
  addToProject: { state: false, id: null, name: null, isChange: false }
};

// function to get all the expert details - USAGE -> MARK CONTACTED FORM , ACCEPT/REFUSE FORM
export const getExpertAllDetails = async (
  id: any,
  setApiData: any,
  pageNo?: any
) => {
  try {
    const response = await RequestServer(
      `${APIRoutes.getExpert}?id=${id}&embed=YES&stakeholders=YES`,
      "get"
    );

    if (response.success) {
      const data = response.data[0];

      let referred_by_value = null;
      if (data.referred_by) {
        const responseReferee = await RequestServer(
          `${APIRoutes.getExpert}?id=${data.referred_by}&show_columns=name`,
          "get"
        );

        if (responseReferee.success) {
          referred_by_value = {
            id: data.referred_by,
            name: responseReferee.data[0].name,
          };
        }
      }

      // Getting the current Url of the page
      const currentUrl = window.location.href;
      const parsedUrl = new URL(currentUrl);
      const baseUrl = parsedUrl.origin;

      if (pageNo) {
        data.baseUrl =
          baseUrl + "/layout/expert-profile?id=" + id + "&page=" + pageNo;
      }

      data.referred_by_value = referred_by_value;
      setApiData(data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUpdatedByValues = (updated_by: string) => {
  const loggedInUserId = localStorage.getItem("id");
  const loggedInUserName = localStorage.getItem("name");

  const isLoggedInUser = updated_by === loggedInUserId;

  if (isLoggedInUser) {
    return loggedInUserName;
  }

  return null;
}


type GetExpertStatus = {
  success: true;
  message: string;
  data: { status: string, updated_at: string, updated_by: number }[];
};

export const setExpertCards = async (setApiData: any, id: string | null) => {

  if (!id) {
    return;
  }

  const response: GetExpertStatus = await RequestServer(
    APIRoutes.getExpert + "?id=" + id + "&show_columns=status,updated_at,updated_by",
    "GET"
  );

  if (response.success) {
    setApiData((prev: any) => {
      const data = prev.data.find((expert: any) => expert.id === id);
      data.status = response.data[0].status;
      data.updated_at = response.data[0].updated_at;
      data.updated_by_value.name = getUpdatedByValues(response.data[0].updated_by.toString())
      return prev;
    });
  }
};

export type payloadType = {
  id: number;
  action: string;
  medium: string;
  value: string;
};

export const setContactedExpertCard = (
  setApiData: any,
  payload: payloadType,
  apiData: any
) => {
  setApiData((prev: any) => {
    const { id, medium, value } = payload;
    const { updated_at, updated_by } = apiData;
    const update_by_name = getUpdatedByValues(updated_by.toString());

    const data = prev.data.find((expert: any) => expert.id === id);

    if (data.status === "Identified") {
      data.status = "Contacted";
    }

    if (medium === "Email") {
      data.primary_email = value;
    }

    if (medium === "Mobile") {
      data.primary_mobile = value;
    }

    if (updated_at) {
      data.updated_at = updated_at;
    }

    if (update_by_name) {
      data.updated_by_value.name = update_by_name;
    }

    return prev;
  });
};

// Function returns true if the date is of Future , else false
export const isFutureDate = (user_date: any, warningMessage: string) => {
  if (!user_date) return false;
  const current_date = LocalDayjs();

  if (user_date.isBefore(current_date)) {
    enqueueSnackbar(warningMessage, {
      variant: "warning",
    });
    return false;
  }

  return true;
};

export const handleImageUpload = async (
  image: File | null,
  id: string | null,
  setBackdrop: any,
  handleClose: any,
  setApiData: any,
  isProfile: boolean,
  enqueueSnackbar: EnqueueSnackbar,
  deleteImage?: boolean
) => {
  if (!id) {
    return;
  }

  try {
    setBackdrop(true);

    if (!deleteImage && image) {
      const formData = new FormData();
      formData.append("image", image);

      const response = await RequestServer(
        APIRoutes.uploadImage,
        "POST",
        formData,
        true
      );

      if (response.success) {
        const imageUrl = response.data;

        const payloadExpert = {
          id,
          action: "UpdatePicture",
          url: imageUrl,
        };

        const responseExpert = await RequestServer(
          APIRoutes.updateExpertPic,
          "PATCH",
          payloadExpert
        );

        if (responseExpert.success) {
          isProfile
            ? setApiData((prev: any) => ({ ...prev, picture: imageUrl }))
            : setApiData((prev: any) => {
              const data = prev.data.find((expert: any) => expert.id === id);

              data.picture = imageUrl;
              return prev;
            });
          handleClose();
        } else {
          throw new Error("Error Occurred while uploading the image");
        }
      } else {
        throw new Error("Error Occurred while uploading the image");
      }
    } else if (deleteImage) {
      const payload = {
        id,
        action: "UpdatePicture",
        url: "",
      };

      const response = await RequestServer(
        APIRoutes.updateExpertPic,
        "PATCH",
        payload
      );

      if (response.success) {
        isProfile
          ? setApiData((prev: any) => ({
            ...prev,
            picture: null,
          }))
          : setApiData((prev: any) => {
            const data = prev.data.find((expert: any) => expert.id === id);
            data.picture = getPictureUrl(null);
            return prev;
          });
        handleClose();
      }
    }
  } catch (err) {
    // handleClose();
    console.error(err);
    enqueueSnackbar(err as string, {
      variant: "error",
    });
  } finally {
    setBackdrop(false);
  }
};

export function getPictureUrl(originalURL: string | null) {
  if (!originalURL) {
    return null;
  }

  if (!originalURL.includes("res.cloudinary.com")) {
    return originalURL;
  }

  const transformation = "w_60,f_auto,q_auto";

  const parts = originalURL.split("/v");

  const newURL = `${parts[0]}/${transformation}/v${parts[1]}`;

  return newURL;
}

export async function openProfileLink(
  id: string | null,
  setBackdrop: any,
  enqueueSnackbar: EnqueueSnackbar
) {
  if (!id) {
    return;
  }

  try {
    setBackdrop(true);
    const payload = {
      id,
      action: "ShareLink",
    };

    const response = await RequestServer(
      APIRoutes.shareProfileLink,
      "PATCH",
      payload
    );
    console.log(response);

    if (response.success) {
      await handleCopy(
        response.data,
        enqueueSnackbar,
        "Profile Link successfully"
      );
    } else {
      enqueueSnackbar("Error occurred. Try again", {
        variant: "error",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setBackdrop(false);
  }
}

export const getExpertTableData = (apiData: ExpertsApiData): ExpertTable[] => {

  const data = apiData?.data || [];

  // @ts-ignore
  return data.map((d) => {

    const current_company = d.work_experiences.find((d) => d.currently_works_here) || d.meta.current_company || null;
    const portal = d.webhandles?.find((d: { meta: { webhandles: any; }; }) => d.meta.webhandles || null);
    const relevant_company_designation = d.meta.relevant_company?.designation || "";
    // @ts-ignore
    const relevant_company_name = d.meta.relevant_company?.name?.value || d.meta.relevant_company?.name || ""
    const relevant_company = [relevant_company_name, relevant_company_designation].filter(d => !!d).join(",");

    const added_on = d?.meta?.fk_project_added?.added_on || d?.created_at;

    const tenyearsAgo = LocalDayjs().subtract(10,'year');
    const work_experiences = d.work_experiences.filter(({end_date,currently_works_here}) => {
      if(currently_works_here) {
        return true;
      }
      return LocalDayjs(end_date).isAfter(tenyearsAgo)
    })

    return {
      id: d.id,
      type: d.type,
      name: d.name,
      primary_email: d.primary_email || "",
      primary_mobile: d.primary_mobile || "",
      current_company_designation: current_company?.designation || "",
      // @ts-ignore
      current_company_name: current_company?.company || current_company?.name || "",
      // @ts-ignore
      current_company_date: current_company?.start_date ? `${LocalDayjs(current_company.start_date).format("MMM YYYY")} - Present` : "",
      relevant_company,
      headline: d.headline || "",
      base_location: d.base_location_value.name,
      honorarium: `${d.price_per_hour_currency || ""} ${d.price_per_hour || ""}`,
      domains: [d.domain_l0_value?.name, d.domain_l1_value?.name, d.domain_l2_value?.name, d.domain_l3_value?.name, d.domain_other].filter((d) => d).join(", "),
      functions: `${d.functions || ""}`,
      project_id_name: d.fk_project ? `#${d.fk_project} - ${d.fk_project_value?.topic || ""}` : "",
      status: d.status,
      confirmed_on: d.confirmed_on,
      updated_at: d.updated_at,
      updated_by_value: d.updated_by_value,
      fk_creator_value: d.fk_creator_value,
      approved_by_value: d.approved_by_value,
      premium_expert: d.premium_expert,
      dnd_enabled: d.dnd_enabled,
      badge: d.badge,
      work_experiences,
      expert_geographies_value: (d?.expert_geographies_value || []).map(d => d.name),
      calls_count: d.calls_data.callCount,
      project_count_data: {
        projectCount: d.calls_data.projectCount,
        projects: d.calls_data.projects
      },
      actions: d.status, // Used status just to create an action field
      meta: d.meta,
      bio: d.bio,
      domain_l0: d.domain_l0,
      domain_l1: d.domain_l1,
      domain_l2: d.domain_l2,
      price_per_hour: d.price_per_hour,
      price_per_hour_currency: d.price_per_hour_currency,
      added_on: LocalDayjs(added_on).format("DD MMMM YYYY")
    }
  })
}