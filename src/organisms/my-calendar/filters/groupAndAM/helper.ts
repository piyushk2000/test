import { Dispatch, SetStateAction } from "react";
import { Admins, Group, Groups } from "../../../admin/types";
import { labelValueType } from "../../../client/all-clients/types";
import { FormatToLVCommon } from "../../../../common/formatData";
import { MyCalls } from "../../types";
import { FormData } from "../type";

export const getAdminOptions = (
  groups: labelValueType[],
  groupData: Groups | null,
  AdminData: Admins,
  setAdmin: Dispatch<SetStateAction<labelValueType[]>>
) => {
  const adminIds: number[] = [];

  for (let group of groups) {
    const groupDetails = groupData?.find((g) => g.id === group.value);
    if (groupDetails) {
      const groupAdminIds = groupDetails.sublabel
        .split(",")
        .map((a) => parseInt(a));
      adminIds.push(...groupAdminIds);
    }
  }

  if (adminIds.length) {
    const admins = [];

    for (let adminId of adminIds) {
      const adminDetails = AdminData.find((a) => a.id === adminId);

      if (adminDetails) {
        admins.push({
          label: adminDetails.name,
          value: adminDetails.id,
        });
      }
    }

    setAdmin(admins);
  } else {
    setAdmin(FormatToLVCommon(AdminData, "name", "id"));
  }
};

export const getDefaultValue = (values: string[], formOptions: labelValueType[]): labelValueType[] => {
  let result: labelValueType[] = [];
  for (let value of values) {
    const current_value = formOptions.find((v) => v.value === parseInt(value));

    if (current_value) {
      result.push(current_value);
    }
  }
  return result;
}