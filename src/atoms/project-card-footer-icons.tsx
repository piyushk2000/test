import { IconButton, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { FC } from "react";

const TooltipIcons: FC<{
  icon?: any;
  text?: string;
  title: string;
  width?: string;
  height?: string;
  isIcon: boolean;
  isMaterialIcon?: boolean;
  MaterialIcon?: any;
  handleClick?: any;
  isDisabled?: boolean;
  sxIconButton?: SxProps<Theme>;
  sxMaterialIcon?: SxProps<Theme>;
  sxText?: SxProps<Theme>;
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
  isDisabled = false,
  sxIconButton = {},
  sxMaterialIcon = {},
  sxText = {}
}) => {
    return (
      <Tooltip title={title} arrow>
        <span>
          <IconButton
            sx={{
              width: {
                xs: "32px",
                sm: "36px",
                lg: "40px"
              },
              height: {
                xs: "32px",
                sm: "36px",
                lg: "40px"
              },
              padding: {
                xs: "8px",
                sm: "9px",
                lg: "10px"
              },
              margin: "0",
              backgroundColor: "#e7e9e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...sxIconButton
            }}
            onClick={handleClick}
            disabled={isDisabled}
          >
            {isMaterialIcon ? (
              <MaterialIcon sx={sxMaterialIcon} />
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
                      ...sxText
                    }}
                  >
                    {text}
                  </Typography>
                )}
              </>
            )}
          </IconButton>
        </span>
      </Tooltip>
    );
  };

export default TooltipIcons;
