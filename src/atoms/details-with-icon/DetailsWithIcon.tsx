import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FC } from "react";
import style from "./style.module.scss";

const DetailsWithIcon: FC<{
  icon: string | null;
  text: string;
  classNames?: string;
  title: string;
  isEmail?: boolean;
  tooltipTitle?: string | null;
}> = ({ icon, text, classNames, title, isEmail = false, tooltipTitle = null }) => {
  return (
    <Tooltip sx={{ zIndex: "13000" }} title={tooltipTitle || title} arrow>
      <div className={style.singleDetailContainer}>
        {
          !icon ?
            <Typography
              component={"p"}
              className={style.detailtitle}
            >
              {title}
            </Typography> :
            <img
              alt={title + " icon"}
              src={icon}
              className={style.detailIcon}
            />
        }

        <Typography
          component={"p"}
          sx={{ textTransform: isEmail ? "lowercase" : "capitalize" }}
          className={style.detailText}
        >
          {text}
        </Typography>
      </div>
    </Tooltip>
  );
};

export default DetailsWithIcon;
