import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";

type Props = {};
export default function ClientContactProfileHeader(props: Props) {
  return (
    <Box sx={{ pl: "16px", pr: "20px" }}>
      <AppBarCommon
        title="Client Overview"
        isSearch={true}
        searchLabel="Search By Client Name, Client Type"
        onSearch={(text) => console.log(text)}
        isUserIcon
        isIconDefine={false}
      />
    </Box>
  );
}
