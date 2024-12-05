import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./bank-details-section.scss";
import { AttachmentIcons } from "../../../atoms/attachment-icons/attachment-icon";
import CloseIcon from "../../../assets/images/expert/close.png";
import { getFormattedBankName, getFormattedAccountNumber } from "./helper";
import BankDetailsFormModal from "../../../organisms/add-bank-details-modal";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../constants";
import BankDetailsModal from "../../bank-details-modal";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { isAdmin } from "../../../utils/role";



interface Props {
  isAddBankOpen?: boolean;
  isPopup?: boolean;
  expertDetails?: {
    expertId?: any;
    primary_bank_id?: any;
  };
  primaryBankId?: string;
  setExpertDetails?: any;
  refresh?: () => void;
  removeAddbankFromUrl?: () => void;
  closeBankDetailSection?: () => void;
}

const BankDetailSection: React.FC<Props> = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramId = queryParams.get("id");
  const expertId = props.expertDetails?.expertId || paramId || "";

  const { value: addBankFormOpen, setTrue: openBankForm, setFalse: handleCloseDialog } = useBoolean(!!props.isAddBankOpen);

  const { loading, data: bankDetails, refetch } = useFetch<any[]>(APIRoutes.bankDetails + "?fk_expert=" + expertId);

  const [showDetails, setShowDetails] = useState<any>(null);

  useEffect(() => {
    if (props.removeAddbankFromUrl) {
      props.removeAddbankFromUrl();
    }
  }, [props.removeAddbankFromUrl]);

  useEffect(() => {
    if (props.expertDetails?.primary_bank_id && bankDetails) {
      const primaryBank = bankDetails.find(bank => bank.id === props.expertDetails?.primary_bank_id);
      if (primaryBank) {
        setShowDetails(primaryBank);
      }
    }
  }, [props.expertDetails?.primary_bank_id, bankDetails]);

  const closeModal = () =>{ 
    setShowDetails(null);
    if(props.setExpertDetails) {
      props.setExpertDetails({expertId:null, primary_bank_id:null})
    }
  
  };

  const isPrimary = (bankId: string) => bankId === props.primaryBankId;

  const refreshData = () => {
    refetch();
    if (props.refresh) props.refresh();
  };

  return (
    <Box className="bank-details-section">
      {!props.isPopup && (
        <div className="bank-details-header">
          <h2>Payment Bank</h2>
          {props.closeBankDetailSection && (
            <AttachmentIcons
              isIcon={true}
              title="Close"
              icon={CloseIcon}
              handleClick={props.closeBankDetailSection}
            />
          )}
        </div>
      )}
      
      {(!isAdmin() && !props.isPopup) && (
        <div>
          <button onClick={openBankForm} className="add-bank-btn">
            + Add Bank Account
          </button>
        </div>
      )}

      {loading && (
        <>
          <ChipSkeleton />
          <ChipSkeleton />
          <ChipSkeleton />
        </>
      )}

      <div className="bank-details-container">
        {bankDetails?.map((data) => (
          <div
            key={data.id}
            onClick={() => setShowDetails(data)}
            className="bank-details"
          >
            <div className="account-details">
              <p>{getFormattedBankName(data)}</p>
              <p>{getFormattedAccountNumber(data)}</p>
            </div>
            {isPrimary(data.id) && <p className="primary">Primary</p>}
          </div>
        ))}
      </div>

      <BankDetailsFormModal
        open={addBankFormOpen}
        closeDialog={handleCloseDialog}
        refresh={refreshData}
      />
      <BankDetailsModal
        open={!!showDetails}
        closeDialog={closeModal}
        bankDetail={showDetails}
        isPrimary={showDetails ? (isPrimary(showDetails.id) || !!(props.expertDetails?.primary_bank_id)): false}
        refresh={refreshData}
      />
    </Box>
  );
};

const ChipSkeleton: React.FC = () => (
  <Skeleton
    variant="rectangular"
    width=""
    height="34px"
    sx={{
      borderRadius: "15px",
    }}
  />
);

export default BankDetailSection;