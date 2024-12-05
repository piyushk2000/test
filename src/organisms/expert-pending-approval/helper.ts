import { APIRoutes } from "../../constants";
import { EXPERT_DETAILS } from "../../pages/Experts/types";
import { RequestServer } from "../../utils/services";
import {
  AboutInfo,
  AwardsInfo,
  BasicInfo,
  CompanyInfo,
  DefaultAboutInfo,
  DefaultBasicInfo,
  DefaultPersonalInfo,
  EducationInfo,
  ExpertPendingApprovals,
  GetProfileEdit,
  PatentInfo,
  PersonalInfo,
  ProfileEdit,
  PublicationInfo,
  WebHandleInfo,
} from "./type";

export const EXPERTPROFILEACTIONS = {
  PersonalInfo: "Personal Info",
  BasicInfo: "Basic Info",
  AboutInfo: "About Info",
  EducationInfo: "Education Info",
  PublicationInfo: "Publication Info",
  PatentInfo: "Patent Info",
  WebHandleInfo: "WebHandle Info",
  AwardsInfo: "Awards Info",
  CompanyInfo: "Experience Info",
  SnippetInfo: "Snippet Info",
};

export const webPortalOptions = {
  Linkedin: "Linkedin",
  Twitter: "Twitter",
  Facebook: "Facebook",
  Instagram: "Instagram",
  GitHub: "GitHub",
  Youtube: "Youtube",
  personal: "Personal",
  Any_Other: "Any Other",
};

export const defaultExpertPendingApproval: ExpertPendingApprovals = {
  profileEditLength: null,
  personalInfo: {
    default: null,
    new: null,
  },
  basicInfo: {
    default: null,
    new: null,
  },
  aboutInfo: {
    default: null,
    new: null
  },
  CompanyInfo: [],
  educationInfo: {
    default: null,
    new: null,
  },
  awardsInfo: {
    default: null,
    new: null,
  },
  publicationInfo: {
    default: null,
    new: null,
  },
  patentInfo: {
    default: null,
    new: null,
  },
  weHandleInfo: {
    default: null,
    new: null,
  },
  expertProfileInfo:null
};

export const GetExpertFormatData = async (data: EXPERT_DETAILS[]) => {
  const expertPendingApprovals = defaultExpertPendingApproval;

    if (!data[0].id) {
    return expertPendingApprovals;
    }
  
  try {
    const response: GetProfileEdit = await RequestServer(
      `${APIRoutes.profileEdit}?fk_expert=${data[0].id}&status=Pending`,
      "GET"
    );
    if (response.success) {
      expertPendingApprovals.profileEditLength = response.data.length;
      for (let profile of response.data) {
        const payload = profile.payload;
        const action = payload?.action;

        expertPendingApprovals.expertProfileInfo = data[0]

        if (action === "PersonalInfo") {
          expertPendingApprovals.personalInfo.default = getPersonalInfo(
            data[0]
          );
          expertPendingApprovals.personalInfo.new =
            profile as ProfileEdit<PersonalInfo>;
        }

        if (action === "BasicInfo") {
          expertPendingApprovals.basicInfo.default = getBasicInfo(data[0]);
          expertPendingApprovals.basicInfo.new =
            profile as ProfileEdit<BasicInfo>;
        }

        if (action === "AboutInfo") {
          expertPendingApprovals.aboutInfo.default = getAboutInfo(data[0]);
          expertPendingApprovals.aboutInfo.new =
            profile as ProfileEdit<AboutInfo>
        }

        if (action === "EducationInfo") {
          expertPendingApprovals.educationInfo.default =
            data[0].meta.education || [];
          expertPendingApprovals.educationInfo.new =
            profile as ProfileEdit<EducationInfo>;
        }

        if (action === "AwardsInfo") {
          expertPendingApprovals.awardsInfo.default = data[0].meta.awards || [];
          expertPendingApprovals.awardsInfo.new =
            profile as ProfileEdit<AwardsInfo>;
        }

        if (action === "PatentInfo") {
          expertPendingApprovals.patentInfo.default =
            data[0].meta.patents || [];
          expertPendingApprovals.patentInfo.new =
            profile as ProfileEdit<PatentInfo>;
        }

        if (action === "PublicationInfo") {
          expertPendingApprovals.publicationInfo.default =
            data[0].meta.publications || [];
          expertPendingApprovals.publicationInfo.new =
            profile as ProfileEdit<PublicationInfo>;
        }

        if (action === "WebHandleInfo") {
          expertPendingApprovals.weHandleInfo.default =
            data[0].meta.webhandles || [];
          expertPendingApprovals.weHandleInfo.new =
            profile as ProfileEdit<WebHandleInfo>;
        }

        if (profile.action?.includes("WorkEx_")) {
          const values: any = {
            default: null,
            new: null,
          };
          const workEx_profile = profile as ProfileEdit<CompanyInfo>;

          const currentWorkEx_profile = data[0].work_experiences.find(
            (workEx) => workEx.id === workEx_profile.payload?.companies[0]?.id
          );

          values.default = currentWorkEx_profile || null;
          values.new = workEx_profile;

          // Not pushing any duplicates in the Company Info Array ------ //

          const workEx_action = workEx_profile.action;
          const companyInfoArr = expertPendingApprovals.CompanyInfo;

          if (
            !companyInfoArr.find((info) => info.new?.action === workEx_action)
          ) {
            expertPendingApprovals.CompanyInfo.push(values);
          }

          // ---------------------------------------------------------- //
        }
      }
    }
    console.log({ expertPendingApprovals });

    return expertPendingApprovals;
  } catch (err) {
    console.log(err);
    return expertPendingApprovals;
  }
};

function getPersonalInfo(data: EXPERT_DETAILS): DefaultPersonalInfo {
  return {
    name: data.name,
    salutation: data.salutation,
    dob: data.dob,
    additional_email_one: data.additional_email_one,
    additional_email_two: data.additional_email_two,
    additional_mobile_one: data.additional_mobile_one,
    additional_mobile_two: data.additional_mobile_two,
  };
}

function getBasicInfo(data: EXPERT_DETAILS): DefaultBasicInfo {
  return {
    headline: data.headline,
    price_per_hour: data.price_per_hour?.toString(),
    price_per_hour_currency: data.price_per_hour_currency,
    functions: data.functions,
    domain_other: data.domain_other,
    current_base_location: {label: data?.base_location_value?.name || "", value: data?.base_location_value?.id},
    expert_geographies: data?.expert_geographies_value?.map(expert => ({
      label: expert.name,
      value: expert.id
    }))
  };
}

function getAboutInfo(data: EXPERT_DETAILS | AboutInfo): DefaultAboutInfo {
  return {
    bio: data.bio
  }
}
