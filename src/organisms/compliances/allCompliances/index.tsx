import React from "react";
import { apiDataState, AppbarToggleOptions, complianceData } from "./types";
import { dialogState, setFormChange, getComplianceData, handleClose, handleAlertBoxClose, handleAlertBoxYesClick, getComplianceDataBymonth, defaultDialogValues, openEditDialog } from "./helper";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import FullPageLoading from "../../../atoms/full-page-loading";
import BackdropComponent from "../../../atoms/backdropComponent";
import DialogModal from "../../../atoms/dialog";
import WarningDialog from "../../../molecules/form-close-warning";
import AllComliancesNavbar from "../../../molecules/compliance/navbar";
import ComplianceCards from "./card-view";
import ComplianceTable from "./table-view";
import AutoApprovalForm from "../autoAprovalDialog";
import { NumberQuestion } from "../autoAprovalDialog/types";
import { createTheme, ThemeProvider } from "@mui/material";
import AddComplianceDialog from "./add-compliance";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import EditComplianceDialog from "./edit-compliance";

type Props = {
  contained?: boolean
}


const defaultTheme = createTheme(defaultFormTheme);

const AllCompliances = ({ contained }: Props) => {
  const [data, setData] = React.useState<apiDataState>({
    api: null,
    isFilter: true,
    filter: {
      date: new Date(),
      tDate: new Date(),
      bcgTab: 6,
      calender: null,
      isFilterChange: true,
    },
  });
  const [reviewedQuestions, setReviewedQuestions] = React.useState<NumberQuestion[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fkClient = queryParams.get("fkClient") || queryParams.get("id");

  const [isBackdrop, setBackdrop] = React.useState<boolean>(false);
  const [openAlertBox, setAlertBox] = React.useState(false);
  const [toggleOption, setToggleOption] = React.useState<AppbarToggleOptions>('card')
  const [isDialog, setDialog] = React.useState<dialogState>(defaultDialogValues);

  const openDialog = () => {
    setDialog((prev: dialogState) => ({
      ...prev,
      addCompliance: { state: true, id: fkClient, isChange: false }
    }))
  }

  const handleSubmitClose = () => {
    setDialog(() => (defaultDialogValues));
  };

  const openReview = (questions: NumberQuestion[]) => {
    setReviewedQuestions([...questions]);
    setDialog &&
      setDialog((prev: dialogState) => ({
        ...prev,
        reviewCompliance: { state: true, id: fkClient, isChange: false }
      }))
  }

  const getAllCompliance = () => {
    if (data.filter.bcgTab !== 0) {
      getComplianceData(fkClient, setData, data.filter.bcgTab);
    } else {
      getComplianceDataBymonth(fkClient, setData, data.filter.date, data.filter.tDate);
    }
  }

  React.useEffect(() => {
    if (data.filter.isFilterChange) {
      if (data.filter.bcgTab !== 0) {
        getComplianceData(fkClient, setData, data.filter.bcgTab);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.filter.isFilterChange])

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <FullPageLoading />

        <AllComliancesNavbar fkClient={fkClient} selectedToggleOption={toggleOption} onToggleOptionChange={setToggleOption} filters={data.filter} setData={setData} contained={contained} openAddComplianceDialog={openDialog} />

        <Box sx={{ marginTop: toggleOption == 'card' ? "3rem" : "1em" }}>
          {toggleOption == 'card' &&
            <ComplianceCards
              openEditDialog={(data) => openEditDialog(setDialog, fkClient, data)}
              openReviewDialog={openReview}
              isFilter={data.isFilter}
              apiData={data.api}
            />}
          {toggleOption == 'list' &&
            <ComplianceTable
              openEditDialog={(data) =>
                openEditDialog(setDialog, fkClient, data)}
              openReviewDialog={openReview}
              isFilter={data.isFilter}
              apiData={data.api}
            />}
        </Box>

        {/* Add Compliance Dialog */}
        {isDialog.addCompliance.state && isDialog.addCompliance.id &&
          <AddComplianceDialog
            isOpen={isDialog.addCompliance.state}
            handleClose={() =>
              handleClose(setAlertBox, isDialog.addCompliance.isChange, handleSubmitClose)
            }
            handleSubmitClose={() => {
              handleSubmitClose()
              getAllCompliance()
            }}
            setChange={() =>
              setDialog((prev) => {
                if (!prev.addCompliance.isChange) {
                  prev.addCompliance.isChange = true;
                }
                return prev;
              })
            }
            fk_client={+isDialog.addCompliance.id}
          />
        }

        {/* Edit Compliance Form */}
        {isDialog.editCompliance.state && isDialog.editCompliance.data && isDialog.editCompliance.id &&
          <EditComplianceDialog
            isOpen={isDialog.editCompliance.state}
            handleClose={() =>
              handleClose(setAlertBox, isDialog.editCompliance.isChange, handleSubmitClose)
            }
            handleSubmitClose={() => {
              handleSubmitClose()
              getAllCompliance()
            }}
            setChange={() =>
              setDialog((prev) => {
                if (!prev.editCompliance.isChange) {
                  prev.editCompliance.isChange = true;
                }
                return prev;
              })
            }
            fk_client={+isDialog.editCompliance.id}
            data={isDialog.editCompliance.data}
          />
        }



        <DialogModal
          isOpen={isDialog.reviewCompliance.state}
          handleClose={() =>
            handleClose(setAlertBox, false, handleSubmitClose)
          }
          title={"Review Questions"}
        >
          <AutoApprovalForm
            handleClose={() => {
              handleClose(setAlertBox, false, handleSubmitClose);
            }}
            handleSubmitClose={handleSubmitClose}
            setBackdrop={setBackdrop}
            setFormChange={() => setFormChange(setDialog, "reviewCompliance")}
            id={isDialog.reviewCompliance.id}
            questions={reviewedQuestions}
          />
        </DialogModal>

        {/* Form Close Warning */}
        <WarningDialog
          handleClose={() => handleAlertBoxClose(setAlertBox)}
          handleYesClick={() => handleAlertBoxYesClick(setAlertBox, handleSubmitClose)}
          open={openAlertBox}
        />
        {/* Backdrop */}
        <BackdropComponent isBackdrop={isBackdrop} />
      </ThemeProvider>
    </>
  );
};

export default AllCompliances;
