import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { SetFilters } from "../../../organisms/groups/types";

type props = {
  onNewGroupClick: () => void;
  setFilters: SetFilters;
};

export default function GroupsHeader({ onNewGroupClick, setFilters }: props) {
  const isMobile = useIsMobile();

  const handleSearch = (s: string) => {
    setFilters((prev) => ({ ...prev, search: s, isFilterChange: true }));
  }

  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title="Groups"
        isUserIcon
        isSearch
        isAddIcon={true}
        addIconLabel="Add Group"
        onAddIconClick={onNewGroupClick}
        isIconDefine={false}
        searchLabel="Search by Group Name"
        onSearch={(q) => handleSearch(q)}
      />
    </Box>
  );
}
