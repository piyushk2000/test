import { useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import ZohoExpertStatementPdfViewer from "./zoho-expert-statement-pdf-viewer";
import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { IsCalenderTypes } from "../../../pages/Calls/types";
import CalenderPickerDialog from "../../../molecules/calender-picker-dialog/calenderPickerDialog";
import { dataRangeFilter } from "../../../molecules/nav-bars/calls-page/helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { changeFilterUrl } from "./helper";
import { useSnackbar } from "notistack";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
  expert_id: number;
  expert_name: string;
  isOpen: boolean;
  handleClose: () => void;
};

const customDialogSx = (stage: "form" | "pdf"): SxProps<Theme> => ({
  '& .MuiDialog-paper': {
    maxWidth: '70%', // Set to desired width
    width: stage === "form" ? "40%" : '90%',     // Set width as a percentage
    margin: 'auto',   // Center horizontally,
  },
})

export function ZohoExpertStatementDialog({
  expert_id,
  expert_name,
  isOpen,
  handleClose
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile();
  const [stage, setStage] = useState<"form" | "pdf">('form');
  const [filter, setFilters] = useState<string | null>(null);
  const [isCalender, setCalender] = useState<IsCalenderTypes>({
    open: false,
    value: "",
    date: null,
    tDate: null,
    select: null,
  });

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={"Transactions Statement"}
      isFullScreen={stage === "pdf"}
      dialogSx={isMobile ? null : customDialogSx(stage)}
      TitleEl={
        <>
          {stage === "pdf" &&
            <CustomBtnFilled
              variant="contained"
              label="Change Date"
              onClick={() => {
                setFilters(null);
                setStage("form");
                setCalender((prev) => ({
                  ...prev,
                  open: true,
                }))
              }}
            />
          }
        </>
      }
    >
      {stage === "pdf" && filter &&
        <ZohoExpertStatementPdfViewer
          filter={filter}
        />
      }

      {stage === "form" &&
        <Grid container rowSpacing={2} pt={2}>
          <Grid item xs={12}>
            <BoxFlex
              sx={{ gap: "1rem" }}
              onClick={() => setCalender(prev => ({ ...prev, open: true }))}
            >
              <Typography fontWeight={500}>
                Date:
              </Typography>
              <Typography sx={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", cursor: "pointer", border: "1px solid rgba(0,0,0,0.3)" }}>
                {isCalender.value || "Click to Choose a Date"}
              </Typography>
            </BoxFlex>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: "var(--green-color)" }}>
              Transactions statement is available 1st April, 2024 onwards. Please contact your relationship manager for the statement prior to this date.*
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormCancelSubmitBtns
              handleClose={handleClose}
              submitLabel="View Pdf"
              handleSubmitBtnClick={() => {
                if (!filter) {
                  setFilters(`?expert_id=${expert_id}&expert_name=${expert_name}`)
                }
                setStage("pdf");
              }}
            />
          </Grid>
        </Grid>
      }
      {/* Calender Picker Dialog */}
      {isCalender.open &&
        <CalenderPickerDialog
          isOpen={isCalender.open}
          handleClose={() =>
            setCalender((prev: any) => ({ ...prev, open: false }))
          }
          setCalender={setCalender}
          select={isCalender.select}
          startDate={isCalender.date}
          endDate={isCalender.tDate}
          okBtnApiCalls={(
            date: Date | null,
            tDate: Date | null,
            select: "between" | "on" | "before" | "after" | null,
            calenderType: string | null
          ) => {
            const dates = changeFilterUrl(date, tDate, select, enqueueSnackbar);
            if (dates) {
              setFilters(`?expert_id=${expert_id}&expert_name=${expert_name}&from_date=${dates.from_date}&to_date=${dates.to_date}`);
              setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))
            } else {
              setCalender(() => ({
                open: true,
                value: "",
                date: null,
                tDate: null,
                select: null,
              }))
            }
          }}
          calenderType={""}
          titleRadioBtns={[]}
          singleTitle={"Date"}
          resetCalenderBtnClickHandler={() => {
            setCalender(() => ({
              open: false,
              value: "",
              date: null,
              tDate: null,
              select: null,
            }))
          }}
        />
      }
    </DialogModal>
  );
}
