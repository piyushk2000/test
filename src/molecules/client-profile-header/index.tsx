import "./client-profile-header.scss";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";

export const ClientHeaderIcons: FC<{
  icon?: any;
  text?: string;
  title: string;
  width?: string;
  height?: string;
  isIcon: boolean;
  isMaterialIcon?: boolean;
  MaterialIcon?: any;
  handleClick?: any;
  style?: any;
  iconStyle?: any;
}> = ({
  icon,
  title,
  width,
  height,
  isIcon,
  text,
  isMaterialIcon = false,
  MaterialIcon,
  style,
  handleClick,
  iconStyle = {},
}) => {
  return (
    <Tooltip title={title} arrow style={style}>
      <IconButton
        sx={{
          width: {
            xs: "30px",
            sm: "34px",
          },
          height: {
            xs: "30px",
            sm: "34px",
          },
          margin: "0",
          backgroundColor: "#EC9324",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#EC9324",
          },
          ...iconStyle,
        }}
        onClick={handleClick}
      >
        {isMaterialIcon ? (
          <MaterialIcon />
        ) : (
          <>
            {isIcon ? (
              <img src={icon} alt={title} width={width} height={height} />
            ) : (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#14171f",
                }}
              >
                {text}
              </Typography>
            )}
          </>
        )}
      </IconButton>
    </Tooltip>
  );
};

export const ClientMenuIcons: FC<{
  icon?: any;
  text?: string;
  title: string;
  width?: string;
  height?: string;
  isIcon: boolean;
  isMaterialIcon?: boolean;
  MaterialIcon?: any;
  handleClick?: any;
  style?: any;
  textStyle?: any;
}> = ({
  icon,
  title,
  width,
  height,
  isIcon,
  text,
  isMaterialIcon = false,
  MaterialIcon,
  style,
  handleClick,
  textStyle,
}) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          maxWidth: "34px",
          maxHeight: "34px",
          height: "100%",
          width: "100%",
          margin: "0",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ":hover": {
            backgroundColor: "white",
          },
        }}
        style={style}
        onClick={handleClick}
      >
        {isMaterialIcon ? (
          <MaterialIcon />
        ) : (
          <>
            {isIcon ? (
              <img src={icon} alt={title} width={width} height={height} />
            ) : (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#14171f",
                  ...textStyle,
                }}
              >
                {text}
              </Typography>
            )}
          </>
        )}
      </IconButton>
    </Tooltip>
  );
};
