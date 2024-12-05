import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { timelineAction } from "../../../utils/data/dataTimelineExpert";

export const actionOptions = [
  { label: "BasicInfo - " + timelineAction["BasicInfo"], value: "BasicInfo" },
  { label: "EducationInfo - " + timelineAction["EducationInfo"], value: "EducationInfo" },
  { label: "AwardsInfo - " + timelineAction["AwardsInfo"], value: "AwardsInfo" },
  { label: "PatentInfo - " + timelineAction["PatentInfo"], value: "PatentInfo" },
  { label: "PersonalInfo - " + timelineAction["PersonalInfo"], value: "PersonalInfo" },
  { label: "PublicationInfo - " + (timelineAction["PublicationInfo"] || ""), value: "PublicationInfo" },
  { label: "RelevancyInfo - " + timelineAction["SnippetInfo"], value: "SnippetInfo" }, //To-Confirm
  { label: "WebHandleInfo - " + timelineAction["WebHandleInfo"], value: "WebHandleInfo" },
  { label: "SocialStatus - " + timelineAction["SocialStatus"], value: "SocialStatus" },
  { label: "companyInfo - " + (timelineAction["companyInfo"] || ""), value: "companyInfo" },
  { label: "GenerateCompilance - " + (timelineAction["GenerateCompilance"] || ""), value: "GenerateCompilance" },
  { label: "ApproveCompliance - " + timelineAction["ApproveCompliance"], value: "ApproveCompliance" },
  { label: "LogCall - " + timelineAction["LogCall"], value: "LogCall" },
  { label: "SetAsPrimary - " + timelineAction["SetAsPrimary"], value: "SetAsPrimary" },
  { label: "AcceptAgreement - " + timelineAction["AcceptAgreement"], value: "AcceptAgreement" }
];

export const getApiData = async (setApiData: any) => {
  try {
    const response = await RequestServer(
      APIRoutes.users + "?role=ADMIN,SUPERADMIN",
      "GET"
    );

    if (response.success) {
      const data = response.data.map((d: any) => ({
        label: d.name[0].toUpperCase() + d.name.slice(1),
        value: d.id,
      }));
      setApiData({ users: data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const inputRow = {
  padding: "10px 5px",
};

export const dateClearBtnStyles = {
  position: "absolute",
  right: "35px",
  padding: "5px",
  top: "15px",
};

export type DefaultValuesState = {
  actor: { label: string, value: number } | null;
  action: Array<{ label: string, value: string }>;
  greaterthanequalto___timeStamp: any;
  lessthanequalto___timeStamp: any;
};

export type SetDefaultValuesState = Dispatch<
  SetStateAction<DefaultValuesState>
>;
