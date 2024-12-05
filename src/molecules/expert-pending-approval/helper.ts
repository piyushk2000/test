import isEqual from "lodash/isEqual";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { EnqueueSnackbar } from "notistack";
import {
  ExpertPendingApprovals,
  InfoNameType,
} from "../../organisms/expert-pending-approval/type";

export const getInfoChanges = <T, R extends keyof T>(
  oldChanges: T[],
  newChanges: T[],
  comparisonField: R
) => {
  // NEW FIELD ADDED
  if (oldChanges.length < newChanges.length) {
    let changes = MissingField(newChanges, oldChanges, comparisonField);
    if (changes) {
      return {
        extraOld: null,
        extraNew: changes,
        changeFieldKeys: null,
      };
    }
  }

  // OLD FIELD DELETED
  if (oldChanges.length > newChanges.length) {
    let changes = MissingField(oldChanges, newChanges, comparisonField);
    if (changes) {
      return {
        extraOld: changes,
        extraNew: null,
        changeFieldKeys: null,
      };
    }
  }

  // EDIT FIELD
  return editField(oldChanges, newChanges, comparisonField);
};

/*
 * This function will compare two arrays of object,
 * In that array all the objects are same but only one is different
 * @returns - extraOld and extraNew object from respective arrays
 */
export function editField<T, R extends keyof T>(
  oldChanges: T[],
  newChanges: T[],
  comparisonField: R
) {
  // remOld and remNew Array both will hold all the
  // object that are same in old and new Array
  let remOld: T[] = [];
  let remNew: T[] = [];

  for (let old of oldChanges) {
    for (let New of newChanges) {
      let isSame = true;
      isSame = isEqual(old, New);
      // If the isSame is true
      // means that old and new are exactly same objects
      // In this case you should push them to the remOld and remNew
      if (isSame) {
        remOld.push(old);
        remNew.push(New);
        continue;
      }
    }
  }

  const extraOld = MissingField(oldChanges, remOld, comparisonField);
  const extraNew = MissingField(newChanges, remNew, comparisonField);

  const changeFieldKeys =
    extraOld && extraNew && getChangeFieldsArr(extraOld, extraNew);

  return {
    extraNew,
    extraOld,
    changeFieldKeys,
  };
}

/**
 * @param bigFile - Big Array
 * @param smallFile - Small Array
 * @param comparisonField - Field on which comparison between arrays will happen
 * @returns - Field which is missing in the small Array
 */
export function MissingField<T, R extends keyof T>(
  bigFile: T[],
  smallFile: T[],
  comparisonField: R
): T | null {
  let newChange: T | undefined;

  if (!bigFile.length || !smallFile.length) {
    return null;
  }

  for (let bigF of bigFile) {
    const comparisonF = bigF[comparisonField];

    // If the value of the comparisonField doesn't match , means it is the extra File
    if (
      !smallFile.find((newFile) => comparisonF === newFile[comparisonField])
    ) {
      newChange = bigF;
      break;
    }
  }

  return newChange || null;
}

export function getChangeFieldsArr<T extends {}>(extraOld: T, extraNew: T) {
  const oldValues = Object.entries(extraOld);
  const newValues = Object.entries(extraNew);

  const changeFieldKeys: Record<keyof T, boolean> = {} as Record<
    keyof T,
    boolean
  >;

  // setting every value to false at first
  for (const key of Object.keys(extraOld) as (keyof T)[]) {
    changeFieldKeys[key] = false;
  }

  for (let i = 0; i < oldValues.length; i++) {
    // OLD ARRAY KEYS AND VALUE
    const keyO = oldValues[i][0];
    const valueO = oldValues[i][1];

    // NEW ARRAY KEYS AND VALUE
    const keyN = newValues[i][0];
    const valueN = newValues[i][1];

    // if the values of the keys are not same, we are setting
    // value to true

    if (valueO !== valueN && keyO === keyN) {
      changeFieldKeys[keyO as keyof T] = true;
    }
  }

  return changeFieldKeys;
}

export const expertPendingHeadingStyles = (isNew: boolean) => ({
  fontSize: "1rem",
  fontWeight: "500",
  padding: "10px 15px",
  color: isNew ? "#EC9324" : "#80002070",
  border: isNew ? "2px solid #EC9324" : "2px solid #80002070",
  borderRadius: "10px",
  marginBottom: "10px",
  width: "fit-content",
});

export const changesBoxStyles = (isNew: boolean) => ({
  backgroundColor: isNew ? "#EC932410" : "#80002010",
  margin: "10px 20px",
  padding: "20px",
  minWidth: "300px",
  borderRadius: "10px",
  "& p": {
    fontSize: "14px",
  },
});

export const ChangeInfoStyles = {
  backgroundColor: "white",
  padding: "16px",
  paddingLeft: "40px",
  borderRadius: "10px",
};

export const pendingApprovalAction = async (
  action: "Approv" | "Reject",
  id: number,
  enqueueSnackbar: EnqueueSnackbar,
  setData: React.Dispatch<React.SetStateAction<ExpertPendingApprovals | null>>,
  info_name: InfoNameType,
  setLoading: (b: boolean) => void
) => {

  setLoading(true);
  try {
    const successMsg =
      action === "Approv"
        ? "Changes Approved Successfully"
        : "Changes Rejected Successfully";
    const url =
      action === "Approv"
        ? APIRoutes.approvProfileEdit
        : APIRoutes.rejectProfileEdit;
    const response = await RequestServer(url + "?id=" + id, "PATCH", {
      payload: null,
    });
    if (response.success) {
      enqueueSnackbar(successMsg, {
        variant: "success",
      });

      setData((prev) => {
        if (!prev) return prev;

        if (prev.profileEditLength) {
          prev.profileEditLength--;
        }

        if (info_name === "CompanyInfo") {
          const newCompanyInfo = prev.CompanyInfo.filter(
            (info) => info.new.id !== id
          );
          prev.CompanyInfo = newCompanyInfo;
        } else {
          prev[info_name].default = null;
          prev[info_name].new = null;
        }

        return { ...prev };
      });
    } else {
      console.log({ response });
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
