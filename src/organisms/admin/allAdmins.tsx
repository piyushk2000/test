import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import { Admins, Groups } from "./types";
import { useGetParams } from "../../utils/hooks/useGetParams";
import TableViewCommon from "../../molecules/table-view-common";
import { headCells } from "./admin-list/headCells";
import TableCellsRow from "./admin-list/tableCells";
import { formatData } from "./admin-list/helper";
import { Data } from "./admin-list/types";
import SkeletonLoader from "../../atoms/project-details/SkeletonLoader";
import * as React from 'react';
import { Stack } from "@mui/material";
import TabFilters from "../../atoms/tabs-selector";



const AllAdmins = () => {
  const query = useGetParams("query")
  const { loading, data: adminData, refetch: refetchAdminData } = useFetch<Admins>(APIRoutes.adminFinanceUsers + (query ? ("&search=" + query) : ""));
  const { loading: GroupLoading, data: groupData } = useFetch<Groups>(APIRoutes.getGroup);
  const [userStatus, setUserStatus] = React.useState('Active');
  const statusOption = ['Active' , 'Inactive', 'All']

  if (loading || GroupLoading) {
    return <SkeletonLoader
      width="100%"
      height="700px"
      style={{
        marginTop: "54px"
      }}
    />
  }

  return <>
    <Stack direction={"row"} alignItems={"center"}>
      <TabFilters
        onChange={(s: string) => {
          console.log(s)
          setUserStatus(s)
        }}
        value={userStatus}
        options={statusOption}
      />
    </Stack>

    <TableViewCommon<Data>
      rows={formatData(adminData, groupData || [], userStatus)}
      totalSelected={0}
      title=""
      key={userStatus}
      headCells={headCells}
      isSelected={false}
      selectAllowed={(row) => false}
      handleTableRowClick={(e, row) => { }}
      tableCells={(row, labelId, isSelected) => <TableCellsRow
        row={row}
        labelId={labelId}
        isSelected={isSelected}
        refetchAdminData={refetchAdminData}
      />}
      isItemSelected={(id) => false}
      handleSelectAllClick={(e) => { }}
      containerSx={{maxHeight: 'calc(100dvh - 255px)'}}
      outerBoxSx={{mt: "5px"}}
      paperSx={{borderRadius: "2px"}}
      rowsPerPageDefault={200}
      rowsPerPageOptions={[50,100,200,400]}
    />
  </>
};

export default AllAdmins;
