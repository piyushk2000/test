import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { Dispatch, SetStateAction } from "react";
import { ClientHeaderIcons } from "../../client-profile-header";
import { useProjectPageContext } from "../../../pages/Projects/helper";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { dialogTypes } from "../../../pages/Projects/types";
import { usePeMappingContext } from "../../../organisms/project/project-pe-mapping/helper";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

type Props = {
  onFilterClick(): void;
  isAdvanceFilter: boolean;
  onIconDefineClick(): void;
  mode: "card" | "list";
  setToggle: Dispatch<SetStateAction<"card" | "list">>,
  onSearchFilter: (s: string) => void;
};

export default function PeMappingHeader({
  onFilterClick,
  isAdvanceFilter,
  onIconDefineClick,
  mode,
  onSearchFilter,
  setToggle
}: Props) {
  const { isDialog } = usePeMappingContext();
  const isMobile = useIsMobile();

  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title="PE Expert Mapping"
        isUserIcon
        isSearch
        isIconDefine={true}
        searchValue={isDialog.filter.searchText || ""}
        onIcondefineClick={onIconDefineClick}
        searchLabel="Search by Expert Name"
        onSearch={onSearchFilter}
        isFilter
        isToggle
        toggleOptions={["card", "list"]}
        selectedToggleOption={mode}
        onFilterClick={onFilterClick}
        isAdvanceFilter={isAdvanceFilter}
        onToggleOptionChange={(option) => { if (option !== ("kanban")) setToggle(option) }}
        isExtraLeftComponent
        leftComponent={<AddPE />}

      />
    </Box>
  );
}



function AddPE() {
  const { setDialog } = useProjectPageContext();
  const { refetch } = usePeMappingContext();
  const project_id = useGetParams("project_id");

  if (!project_id) {
    return <></>
  }

  return (
    <ClientHeaderIcons
      isIcon={false}
      title="Add PE"
      text="PE+"
      iconStyle={{
        "& p": {
          color: "white",
          fontWeight: "500",
          fontSize: "12px"
        }
      }}
      handleClick={() => {
        setDialog((prev: dialogTypes) => ({
          ...prev,
          addPE: {
            state: true,
            id: project_id.toString(),
            isChange: false,
            isProjectDetails: false,
            refetch
          },
        }))
      }}
    />
  )
}