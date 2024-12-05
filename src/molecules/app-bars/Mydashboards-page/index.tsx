import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface MyDashboardsPageHeaderProps {
  selectedDashboard: string;
  setSelectedDashboard: (value: string) => void;
  dashboardIds: { name: string; id: string }[];
  getMetabaseURL: () => void;
}

const correctName =  (name:string) => {
  const arr = name.split('___');
  if (arr.length === 2) {
    return arr[1];
  } else {
    return name;
  }
}


export default function MyDashboardsPageHeader({
  selectedDashboard,
  setSelectedDashboard,
  dashboardIds,
}: MyDashboardsPageHeaderProps) {
  const isMobile = useIsMobile();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    setSelectedDashboard(selectedId);
  };

  const selectComponent = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Select
        placeholder='Select Dashboard'
        id="dashboard-select"
        value={selectedDashboard}
        onChange={handleSelectChange}
        displayEmpty
        sx={{
          minWidth: isMobile? 153:187,
          height: 36,
          fontSize: 14,
          backgroundColor: 'white',
          padding: 0,
          '& .MuiSelect-select': {
            padding: '0 !important',
            paddingLeft: '12px !important',
          },
          '& .MuiMenuItem-root': {
            padding: '0 !important',
            paddingLeft: '12px !important',
          }
        }}
      >
        {dashboardIds.map(({ name, id }) => (
          <MenuItem key={id} value={id}>
            {correctName(name)}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title={"My Dashboard"}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
        isExtraComponent={true}
        component={selectComponent}
      />
    </Box>
  );
}