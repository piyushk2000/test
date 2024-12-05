import { createContext } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";

type labelValue = { label: string; value: number };

export type formValues = labelValue[];

export type responseData = {
  status: string;
  name: string;
  id: number;
  fk_project: number;
};

export type relevant_workEx = {
  label: string;
  value: number;
  designation: string;
  company: string;
  location: string | null,
};

export type relevant_state = {
  options: relevant_workEx[] | null;
  loading: boolean;
};

type responseType = {
  success: boolean;
  message: string;
  data: responseData[];
};

type AddPEFormContextType = {
  selectedExpert: labelValue | null | undefined;
  isProjectField: boolean;
  handleChangeForm: () => void;
};

export const getFormValues = async (
  setFormValues: (prev: formValues | null) => void,
  get: "expert" | "project"
) => {
  try {
    if (get === "expert") {
      const response: responseType = await RequestServer(
        `${APIRoutes.getExpert}?show_columns=status,name,id&status=Confirmed`,
        "get"
      );

      if (response.success) {
        const newData = response.data.map((d: responseData) => ({
          label: `ID: ${d.id}, ${d.name}`,
          value: d.id,
        }));

        setFormValues(newData);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const getRelevantValues = async (
  id: number,
  setRelevant: (r: relevant_state) => void
) => {
  setRelevant({ options: null, loading: true });
  try {
    const response = await RequestServer(
      `${APIRoutes.getExpert}?id=${id}&embed=YES&stakeholders=YES`,
      "get"
    );

    if (response.success) {
      const work_experiences: relevant_workEx[] =
        response.data[0].work_experiences
          .filter((exp: any) => exp.status !== "Deleted")
          .map((exp: any) => ({
            label: [
              exp.company,
              exp.designation,
              exp.location,
            ]
              .filter((i) => !!i)
              .join(", "),
            value: exp.id,
            designation: exp.designation,
            company: exp.company,
            location: exp.location,
          }));

      setRelevant({
        options: work_experiences,
        loading: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export type AddPEProps = {
  handleClose: () => void;
  handleSubmitClose: () => void;
  project_id?: string | null;
  selectedExpert?: { label: string; value: number } | null | undefined;
  isProjectField?: boolean;
  handleChangeForm?: () => void;
  isProjectDetails?: () => void;
  refetch?: null | (() => void);
};

export const AddPEFormContext = createContext<AddPEFormContextType>({
  selectedExpert: null,
  isProjectField: false,
  handleChangeForm: () => { },
});
