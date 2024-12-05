import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calender from "../../assets/images/expert/calendar_expert.png";
import CalenderWhite from "../../assets/images/calendar_white.png";
import { ClientMenuIcons } from "../../molecules/client-profile-header";
import style from "./style.module.scss";

type props = {
  label: any;
  isCalenderValue: any;
  calenderOpenClickHandler: any;
  calenderCloseBtnClickHandler: any;
  isMobile?: boolean;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
};

const DatePickerField = ({
  label,
  isCalenderValue,
  calenderOpenClickHandler,
  calenderCloseBtnClickHandler,
  isMobile = false,
  labelStyle = {},
  inputStyle = {}
}: props) => {
  return (
    <div className={style.approvedOn}>
      {!isMobile && (
        <>
          <label htmlFor="calender-value" style={{whiteSpace: "nowrap", ...labelStyle}} className={style.label}>
            {label}
          </label>
          <div className={style.calenderInputContainer}>
            <input
              name="calender-value"
              id="calender-value"
              value={isCalenderValue}
              className={style.calenderInput}
              readOnly
              style={{ cursor: "pointer" , ...inputStyle}}
              onClick={calenderOpenClickHandler}
            />
            {isCalenderValue && (
              <IconButton
                onClick={calenderCloseBtnClickHandler}
                className={style.closeBtn}
              >
                <CloseIcon
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </IconButton>
            )}
          </div>
        </>
      )}

      <ClientMenuIcons
        style={{
          width: isMobile ? "30px" : "16px",
          height: isMobile ? "30px" : "16px",
          padding: isMobile ? "8px" : "1px",
          margin: "2px",
          backgroundColor: isMobile ? isCalenderValue ? "var(--green-color)" : "inherit" : "inherit",
        }}
        isIcon={true}
        icon={isMobile ? isCalenderValue ? CalenderWhite : Calender : Calender}
        title={isMobile ? "Date Filters" : "Calender"}
        handleClick={calenderOpenClickHandler}
      />
    </div>
  );
};

export default DatePickerField;
