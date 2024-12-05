import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { usePaymentsRequestsContext } from "../../../pages/payment-requests/context";
import { isAdmin, isFinance, isSuperAdmin } from "../../../utils/role";
import UploadIcon from '@mui/icons-material/Upload';
import { IS_DEV } from "../../../utils/services";

export default function PaymentRequestsHeader() {
  const isMobile = useIsMobile();
  const { filters, setFilters, setDialog } = usePaymentsRequestsContext();
  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title={"Payment Requests" + (filters.status !== "all" ? ` ( ${filters.status} )` : "")}
        isUserIcon
        isSearch
        searchLabel="Search within review remarks"
        searchValue={filters.search_review || ""}
        onSearch={(query) => {
          setFilters((prev) => ({
            ...prev,
            search_review: query,
            isFilterApplied: true,
            isFilterChange: true
          }))
        }}
        isAddIcon
        AddIcon={UploadIcon}
        addIconLabel="Change Declaration Date"
        onAddIconClick={() => {
          const url = "https://bulkupload.netlify.app/#/bulkUpload?configurl=https%3A%2F%2Fcolo" + (IS_DEV ? "-dev" : "") + ".infollion.com%2Fpayment-declaration" + (IS_DEV ? "_dev" : "") +".json&token=" + localStorage.getItem("authToken")
          window.open(url, '_blank', 'noopener,noreferrer')
        }}
        isIconDefine={false}
        downloadBtnClickHandler={(isSuperAdmin() || isAdmin() || isFinance()) ? () => {
          setDialog((prev) => ({
            ...prev, download: {
              state: true
            }
          }))
        } : undefined}
      />
    </Box>
  );
}
