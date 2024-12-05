import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import React, { useState } from "react";
import DialogModal from "../../../atoms/dialog";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import Box from "@mui/material/Box";
import { Select } from "../../../pages/Calls/types";
import NoResultFoundFilters from "../../../atoms/noResultsFilters";
import { getPayableMinutes } from "../../../pages/Calls/helpers";
import { mulipleExpertSelect } from "./style";
import { checkAllValuesAreSame } from "../../../utils/utils";
import TotalRevenueSection from "../total-revenue-section";

type RequestPaymentModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: Function;
  expertName: string;
  select: Select;
};

const RequestPaymentModal = ({
  isOpen,
  handleClose,
  onSubmit,
  expertName,
  select
}: RequestPaymentModalProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const { setLoading } = useFullPageLoading();

  const [controller, setController] = useState({
    control: null,
    for: "",
    setSelectedFile: null,
  }); // abort controller

  // --------- USED ONLY WHEN REQUEST PAYMENT IS SUBMITTED IN BULK ----------------------------------------- //

  const currency_arr = select.isClicked ? select.selectedCards.map((call) => call.cost_price_currency) : [];

  const is_currency_same = select.isClicked ? checkAllValuesAreSame<string>(currency_arr) : true;
  // ------------------------------------------------------------------------------------------------------ //


  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={"Upload Invoice" + (select.isClicked ? "" : ": " + expertName)}
    >
      {select.isClicked && !select.selectedCards.length ?
        <NoResultFoundFilters sx={{ paddingBottom: "12px" }} text="Please select calls before requesting for payment" /> :
        !is_currency_same ? <NoResultFoundFilters sx={{ paddingBottom: "12px" }} text="Please select calls with same payable currency" /> :
          <Grid container justifyContent={"flex-end"} columnSpacing={2}>

            {/* Bulk Request Payments */}
            {select.isClicked &&
              <TotalRevenueSection
                selectedCards={select.selectedCards}
                isClicked={select.isClicked}
              />
            }


            {/* DropZone */}
            <Grid item xs={12}>
              <Box sx={{ p: "1rem", pt: "32px" }}>
                {/* <Typography>Upload receipt</Typography> */}
                <FileUpload
                  setUrl={setImageUrl}
                  setLoading={setLoading}
                  setController={setController}
                  dropzoneConfig={{
                    maxSize: 5,
                    text:
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <p>Upload Invoice (File should be upto 5MB)</p>
                        <p>[ Drag 'n' drop file here, or click to select file ]</p>
                      </div>
                  }}
                />
              </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid item>
              <CustomBtnFilled
                label="cancel"
                variant="outlined"
                onClick={handleClose}
              />
            </Grid>
            <Grid item>
              <CustomBtnFilled
                label="submit"
                onClick={() => {
                  onSubmit(imageUrl).then((notClose?: boolean) => !notClose && handleClose());
                }}
                variant="contained"
                buttonType="button"
              />
            </Grid>
          </Grid>
      }
    </DialogModal>
  );
};

export default RequestPaymentModal;
