import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { usePaymentsContext } from "../../../pages/payments/context";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../../../utils/role";



export default function PaymentsHeader() {
    const { mode, setMode: setToggle, setFilters, filters } = usePaymentsContext();
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    return (
        <Box sx={{ pb: isMobile ? "0" : "24px" }}>
            <AppBarCommon
                title={"Payments"}
                isUserIcon
                isSearch={true}
                searchLabel="Search by Narration"
                onSearch={(query) => {
                    setFilters((prev) => ({
                        ...prev,
                        search_narration: query,
                        isFilterApplied: query ? true : false,
                        isFilterChange: true
                    }))
                }}
                searchValue={filters.search_narration}
                isIconDefine={false}
                isToggle={false}
                isAddIcon={isSuperAdmin()}
                AddIcon={UploadIcon}
                addIconLabel="Upload"
                onAddIconClick={() => {
                    const url = "https://bulkupload.netlify.app/#/bulkUpload?configurl=https%3A%2F%2Fcolo.infollion.com%2Ftransactions.json&token=" + localStorage.getItem("authToken")
                    window.open(url, '_blank', 'noopener,noreferrer')
                }}
            // toggleOptions={["card", "list"]}
            // selectedToggleOption={mode}
            // onToggleOptionChange={(option) => { if (option !== "kanban") setToggle(option) }}
            />
        </Box>
    );
}
