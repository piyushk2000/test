import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { isSuperAdmin } from "../../../utils/role";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import FixedBox from "../../../atoms/fixedBox";

type Props = {
  onFilterClick: () => void;
  onNewClientClick: () => void;
  onSearch: (query: string) => void;
};
export default function AdminHeader({
  onFilterClick,
  onNewClientClick,
  onSearch
}: Props) {
  const superAdmin = isSuperAdmin();
  const isMobile = useIsMobile();
  return (

    <FixedBox sx={{ pb: isMobile ? "0.25rem" : "0" }}>
      <Box sx={{ pb: isMobile ? "0" : "24px" }}>
        <AppBarCommon
          title="Employees"
          isSearch={true}
          searchLabel="Search By Employee Name"
          onSearch={onSearch}
          isFilter={false}
          onFilterClick={onFilterClick}
          isUserIcon
          isAddIcon={superAdmin ? true : false}
          addIconLabel="New Employee"
          onAddIconClick={onNewClientClick}
          isToggle={false}
          // toggleOptions={["card", "list"]}
          // selectedToggleOption={"list"}
          // onToggleOptionChange={() => { }}
          isIconDefine={false}
        />
      </Box>
    </FixedBox>

  );
}
