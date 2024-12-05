import Chip from "@mui/material/Chip";
import { chipStyle } from "../style";
import { Data } from "./types";
import { Admins, Groups } from "../types";
import { SetDialogOpenTypes } from "../../../pages/Admin/helper";
import { isdValues } from "../../../utils/isdCodes";
import { isSuperAdmin } from "../../../utils/role";

function createData(
  name: string,
  id: number,
  mobile: string,
  email: string,
  role: string,
  actions: boolean,
  groups: any,
  is_active:boolean,
  meta:any,
) {
  return { name, id, mobile, email, actions, groups, is_active,meta, role};
}

const generateMetabaseString = (metabaseObj: { [key: string]: number }): string => {
  if (!metabaseObj || Object?.keys(metabaseObj).length === 0) {
    return '';
  }

  return Object.entries(metabaseObj)
    .map(([key, value]) => `${key.trim()}=${value}`)
    .join(' ; ');
}

export function normaliseGroupData(groupData: Groups) {
  const formattedData: ({ [id: string]: string[] }) = {}

  groupData.forEach(item => {
    item?.sublabel?.split(",")?.forEach(adminId => {
      if (formattedData[adminId]) {
        formattedData[adminId] = [...formattedData[adminId], item.label]
      }
      else {
        formattedData[adminId] = [item.label]
      }
    })
  })

  return formattedData
}


export function formatData(data: Admins | null, groupData: Groups, userStatus: string) {
  if (!data) return []

  const formattedGroupData = normaliseGroupData(groupData);

  let formattedData: Data[] = data.map(item => {
    const groups = formattedGroupData[item.id] || []
    return createData(
      item.name,
      item.id,
      item.mobile,
      item.email,
      item.role,
      (item.role === "SUPERADMIN" ? false : true),
      groups.map((g: string, index: number) => (
        <Chip key={g + index} label={g} sx={() => chipStyle(index)} />
      )),
      item.is_active,
      item?.meta
    )
  });
  if (userStatus === 'Active') {
    formattedData = formattedData.filter(item => item.is_active);
  } else if (userStatus === 'Inactive') {
    formattedData = formattedData.filter(item => !item.is_active);
  }
  return formattedData;
}

export const editAdminClickHandler = (setDialogOpen: SetDialogOpenTypes, row: Data, refetchAdminData: () => Promise<void>) => {
  let phone: string | null = row.mobile.split(" ")[1];
  let isd_code: any;
  if (phone) {
    let isd = row.mobile.split(" ")[0];
    let current_isd = isdValues.find((isd_value) => isd_value.dial_code === isd);

    if (current_isd) {
      isd_code = {
        value: current_isd.dial_code,
        label: current_isd.dial_code,
        name: `${current_isd.name.toLocaleLowerCase()} (${current_isd.dial_code})`,
      }
    }
  } else {
    phone = row.mobile.split(" ")[0];
    isd_code = null;
  }
  
  setDialogOpen((prev) => ({
    ...prev,
    edit: {
      state: true,
      defaultValues: {
        email: row.email,
        name: row.name,
        mobile_number: phone,
        isd_code: isd_code,
        role: {label: row.role, value: row.role},
        groups: null,
        id: row.id,
        metabase: generateMetabaseString(row?.meta?.metabase)
      },
      refetchAdmin: refetchAdminData
    }
  }))
}

export const getColorsForRole = (role: string) => {
  switch (role) {
    case "ADMIN": {
      return {
        color: "rgba(107, 87, 115, 1)",
        bg: "rgba(107, 87, 115, 0.1)"
      }
    }
    case "SUPERADMIN": {
      return {
        bg: "rgba(14, 76, 127, 0.1)",
        color: "#0e4c7f"
      }
    }
    case "FINANCE": {
      return {
        color: "rgba(24, 168, 72, 1)",
        bg: "rgba(24, 168, 72, 0.1)"
      }
    }
    default: {
      return {
        color: "rgba(107, 87, 115, 1)",
        bg: "rgba(107, 87, 115, 0.1)"
      }
    }
  }
}