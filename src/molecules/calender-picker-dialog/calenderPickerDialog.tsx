import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CalenderTabs from "./calenderTabs";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useEffect, useState } from "react";
import { dialogTitleStyle, startEndCompare } from "./helper";
import dayjs, { Dayjs } from "dayjs";
import DialogModal from "../../atoms/dialog";
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { LocalDayjs } from "../../utils/timezoneService";

type calenderDialogProps = {
  isOpen: boolean;
  handleClose: any;
  setCalender: any;
  titleRadioBtns: { label: string; value: string }[];
  resetCalenderBtnClickHandler: () => void;
  okBtnApiCalls?: any;
  calenderType?: string | null;
  singleTitle?: string;
  isOnClientDetails?: boolean;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  allowedTabs?: Array<"between" | "on" | "before" | "after">,
  select?: "between" | "on" | "before" | "after" | null;
};

const CalenderPickerDialog = (props: calenderDialogProps) => {
  const {
    isOpen,
    handleClose,
    setCalender,
    resetCalenderBtnClickHandler,
    okBtnApiCalls,
    calenderType,
    titleRadioBtns,
    singleTitle,
    allowedTabs,
    select,
    startDate,
    endDate
  } = props;
  const isMobile = useIsMobile();
  const [selectDate, setSelectDate] = useState<any>({
    date: [startDate ? startDate : LocalDayjs(), endDate ? endDate : LocalDayjs()],
    singleDate: startDate || LocalDayjs(),
    select: select || (allowedTabs ? allowedTabs[0] : "between"),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type =  (event.target as HTMLInputElement).value;
    setCalender((prev: any) => ({
      ...prev,
      type,
    }));
  };

  function setOkBtnClickHandler(selectDate: any) {
    // if (calenderType === "Tutorial completion") {
    //   handleClose();
    //   return;
    // }

    const date = selectDate.date;
    const singleDate = selectDate.singleDate;
    const select = selectDate.select;
    if (select === "between") {
      /* ---------------VALIDATIONS -------------------------- */

      if (
        startEndCompare(
          date[0],
          date[1],
          "From Date can not be greater than To Date"
        )
      ) {
        return;
      }
      /* ----------------------------------------------------- */

      setCalender((prev: any) => ({
        ...prev,
        value: date.map((d: any) => dayjs(d).format("DD/MM/YY")).join(" - "),
      }));

      handleClose();
      okBtnApiCalls(
        dayjs(date[0]).format("YYYY-MM-DD"),
        dayjs(date[1]).format("YYYY-MM-DD"),
        select,
        calenderType
      );
    } else if (select) {
      setCalender((prev: any) => ({
        ...prev,
        value: singleDate
          ? `${select[0].toUpperCase() + select.slice(1)} ${dayjs(
            singleDate
          ).format("DD/MM/YY")}`
          : "",
      }));

      handleClose();
      okBtnApiCalls(
        dayjs(singleDate).format("YYYY-MM-DD"),
        null,
        select,
        calenderType
      );
    }
  }

  useEffect(() => {
    if (isOpen && !calenderType) {
      setCalender((prev: any) => ({ ...prev, type: "updated_at" }));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      title={singleTitle || ""}
      TitleEl={!singleTitle ? <>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={calenderType}
            onChange={handleChange}
            sx={{ flexDirection: "row", gap: isMobile ? "0" : "1.5rem" }}
          >
            {titleRadioBtns.map(({ label, value }) => (
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={label}
                sx={dialogTitleStyle}
                key={value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </> : undefined}
      handleClose={handleClose}
    >
      <CalenderTabs selectDate={selectDate} setSelectDate={setSelectDate} isOnClientDetails={!!props.isOnClientDetails} allowedTabs={allowedTabs} />
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        columnSpacing={2}
        pr={"35px"}
        mt={"10px"}
      >
        <Grid item xs={4}>
          <CustomBtnFilled
            label="reset"
            variant="outlined"
            onClick={() => {
              resetCalenderBtnClickHandler();
              handleClose();
            }}
          />
        </Grid>
        <Grid item container xs={8}>
          <FormCancelSubmitBtns
            handleClose={handleClose}
            handleSubmitBtnClick={() => setOkBtnClickHandler(selectDate)}
          />
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default CalenderPickerDialog;
