import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";

export const AttachmentIcons: FC<{
  icon?: any;
  text?: string;
  title: string;
  width?: string;
  height?: string;
  isIcon: boolean;
  isMaterialIcon?: boolean;
  MaterialIcon?: any;
  handleClick?: any;
}> = ({
  icon,
  title,
  width,
  height,
  isIcon,
  text,
  isMaterialIcon = false,
  MaterialIcon,
  handleClick,
}) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          maxWidth: "30px",
          maxHeight: "30px",
          height: "100%",
          width: "100%",
          margin: "0",
          //   backgroundColor: "#e7e9e8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
