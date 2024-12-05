import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { Data } from "./list-view/types";
import {
  AdminApiResponse,
  AdminDataItem,
  Filters,
  GroupApiResponse,
  SetFilters,
  SetGroupListState,
} from "./types";

export const getRowsData = async (
  setData: SetGroupListState,
  setLoading: Dispatch<SetStateAction<boolean>>,
  filters: Filters,
  setFilters: SetFilters
) => {
  setLoading(true);
  setData((prev) => ({ ...prev, row: null }));
  try {
    let url = APIRoutes.getGroup;

    /* ---- SEARCH ------------------------------------ */
    const { search } = filters;

    if (search) {
      url += "&search=" + search
    }

    /* ------------------------------------------------ */

    const groupResponse: GroupApiResponse = await RequestServer(
      url,"GET"
    );

    const adminResponse: AdminApiResponse = await RequestServer(
      APIRoutes.adminUsers + "&show_columns=name,id",
      "GET"
    );

    if (groupResponse.success && adminResponse.success) {
      const adminData = adminResponse.data;
      const groupData = groupResponse.data;
      const rowData: Data[] = groupData.map((group) => {
        const admins: AdminDataItem[] = group.sublabel.split(",").map((a) => {
          const admin_id = parseInt(a);
          const admin: AdminDataItem | undefined = adminData.find(
            (a) => a.id === admin_id
          );
          if (!admin) {
            throw new Error("Admin Id not fond");
          }
          return admin;
        });

        return {
          group_name: group.label,
          group_id: group.id,
          admins: admins || [],
          actions: "edit",
        };
      });

      setData((prev) => ({
        ...prev,
        row: rowData,
      }));

      setFilters((prev) => {
        if (prev.isFilterChange) {
          prev.isFilterChange = false;
        }
        return prev;
      })
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
