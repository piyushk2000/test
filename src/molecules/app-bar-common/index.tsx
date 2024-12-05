import SearchBar from "./search-bar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoggedInUser from "./logged-in-user";
import AddBoxIcon from "@mui/icons-material/Add";
import AddIconWhite from "../../assets/images/add_icon_white.png";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import { ClientHeaderIcons, ClientMenuIcons } from "../client-profile-header";
import FilterIcon from "../../assets/images/client/filter.png";
import SettingIcon from "../../assets/images/client/settings.png";
import MenuIcon from "../../assets/images/client/menu.png";
import MenuIconBlack from "../../assets/images/client/menu_black.png";
import MenuListIcon from "../../assets/images/client/list.png";
import MenuListIconWhite from "../../assets/images/client/list_white.png";
import Info from "../../assets/images/info.png";
import Hamburger from "./hamburger";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./styles.scss";
import { AppBarProps } from "./types";
import ConditionallyRender from "../../atoms/conditional-render";
import CustomToolTip from "../../atoms/custom-tool-tip";
import { BoxFlex } from "../../atoms/boxSpaceBtw";

const CustomFontTheme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

CustomFontTheme.typography.h3 = {
  [CustomFontTheme.breakpoints.down("xs")]: {
    fontSize: "14px",
    lineHeight: "16px",
  },
  [CustomFontTheme.breakpoints.up("sm")]: {
    fontSize: "16px",
    lineHeight: "18px",
  },
  [CustomFontTheme.breakpoints.up("md")]: {
    fontSize: "20px",
    lineHeight: "24px",
  },
  fontWeight: 600,
  letterSpacing: 0,
  color: "#252b3b",
};

export default function AppBarCommon({
  title,
  isInfo,
  onInfoClick,
  isFilter,
  onFilterClick,
  isSetting,
  onSettingClick,
  isUserIcon,
  isAddIcon,
  isAddThroughIcon,
  AddIcon,
  AddThroughIcon,
  addIconLabel = "",
  addThroughIconLabel = "",
  onAddIconClick,
  onAddThroughIconClick,
  isAdvanceFilter,
  isExtraComponent,
  component,
  isExtraLeftComponent,
  leftComponent,
  isSidebar = true,
  hover_html,
  hover_html_on_left = false,
  downloadBtnClickHandler,
  titleLeftComponent = false,
  ...props
}: AppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const listBtnStyle = {
    backgroundColor: "#EC9324",
  };
  const menuBtnStyle = {
    backgroundColor: "#ffffff",
  };

  return (
    <ThemeProvider theme={CustomFontTheme}>
      <Box sx={{ pt: "10px" }}>
        <div className="app-bar-wrapper">
          <BoxFlex sx={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
            <div className="label-container">
              {isSidebar && <Hamburger />}
              <Typography variant="h3" >{title}</Typography>
              {(hover_html_on_left && hover_html) &&
                <CustomToolTip title={hover_html} >
                  <img src={Info} alt="" style={{ height: '20px', width: '20px', cursor: 'pointer', marginLeft: '10px' }} />
                </CustomToolTip>
              }
            </div>
            <ConditionallyRender render={titleLeftComponent}>
              {!!leftComponent ? leftComponent : <></>}
            </ConditionallyRender>
          </BoxFlex>
          {!isMobile ? (
            props.isSearch ? (
              <SearchBar
                placeholder={props.searchLabel}
                onSearch={props.onSearch}
                searchValue={props.searchValue || ""}
              />
            ) : null
          ) : null}

          <div className="action-icon-container">
            <ConditionallyRender render={isInfo}>
              <ClientMenuIcons
                isIcon={true}
                title="info"
                icon={Info}
                width="100%"
                height="100%"
              />
            </ConditionallyRender>

            <>
              {(hover_html && !hover_html_on_left) &&
                <CustomToolTip
                  title={hover_html}
                >
                  <img src={Info} alt="" style={{ height: '20px', width: '20px', cursor: "pointer" }} />
                </CustomToolTip>
              }
            </>
            <ConditionallyRender render={isAddThroughIcon}>
              {isTab ? (
                AddIcon ?
                  <CustomBtnFilled
                    label={""}
                    variant="contained"
                    onClick={onAddThroughIconClick}
                  >
                    <AddIcon />
                  </CustomBtnFilled> :
                  <ClientHeaderIcons
                    title={addThroughIconLabel}
                    icon={AddIconWhite}
                    width="100%"
                    height="100%"
                    isIcon={true}
                    iconStyle={{
                      color: "#FFF",
                      padding: "5px",
                      "& img": {
                        transform: "translate(1px,1px)",
                      },
                    }}
                    handleClick={onAddThroughIconClick}
                  />
              ) : (
                <>

                  <CustomBtnFilled
                    label={addThroughIconLabel}
                    variant="contained"
                    onClick={onAddThroughIconClick}
                  >
                    {AddIcon ? <AddIcon /> : <AddBoxIcon sx={{ fontSize: "14px", mr: "5px" }} />}
                  </CustomBtnFilled>
                </>
              )}
            </ConditionallyRender>

            <ConditionallyRender render={isAddIcon}>
              {isTab ? (
                AddIcon ?
                  <CustomBtnFilled
                    label={""}
                    variant="contained"
                    onClick={onAddIconClick}
                  >
                    <AddIcon />
                  </CustomBtnFilled> :
                  <ClientHeaderIcons
                    title={addIconLabel}
                    icon={AddIconWhite}
                    width="100%"
                    height="100%"
                    isIcon={true}
                    iconStyle={{
                      color: "#FFF",
                      padding: "5px",
                      "& img": {
                        transform: "translate(1px,1px)",
                      },
                    }}
                    handleClick={onAddIconClick}
                  />
              ) : (
                <>

                  <CustomBtnFilled
                    label={addIconLabel}
                    variant="contained"
                    onClick={onAddIconClick}
                  >
                    {AddIcon ? <AddIcon /> : <AddBoxIcon sx={{ fontSize: "14px", mr: "5px" }} />}
                  </CustomBtnFilled>
                </>
              )}
            </ConditionallyRender>

            <ConditionallyRender render={!isMobile}>
              <ConditionallyRender render={props.isIconDefine}>
                <ClientMenuIcons
                  isIcon={false}
                  title="Icon Definitions"
                  text="i"
                  style={{}}
                  textStyle={{
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    border: "1px solid black",
                    fontFamily: "serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  handleClick={props.onIcondefineClick}
                />
              </ConditionallyRender>
            </ConditionallyRender>

            <ConditionallyRender render={isExtraLeftComponent}>
              {!!leftComponent ? leftComponent : <></>}
            </ConditionallyRender>

            <ConditionallyRender render={!!downloadBtnClickHandler}>
              <ClientHeaderIcons
                title="Download"
                isMaterialIcon={true}
                isIcon={false}
                handleClick={downloadBtnClickHandler}
                MaterialIcon={DownloadIcon}
                iconStyle={{
                  color: "white"
                }}
              />
            </ConditionallyRender>

            <ConditionallyRender render={isFilter}>
              <Box sx={{ position: "relative" }} onClick={onFilterClick}>
                <ClientHeaderIcons
                  isIcon={true}
                  title="Filter"
                  icon={FilterIcon}
                />
                {isAdvanceFilter && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "100",
                      top: "-4px",
                      right: "-4px",
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: "#17AD4B",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                      }}
                    ></p>
                  </div>
                )}
              </Box>
            </ConditionallyRender>

            <ConditionallyRender render={!isMobile}>
              <ConditionallyRender render={isSetting}>
                <ClientHeaderIcons
                  isIcon={true}
                  title="Settings"
                  icon={SettingIcon}
                  width="80%"
                  height="80%"
                />
              </ConditionallyRender>
            </ConditionallyRender>

            {props.isToggle ? (
              <ConditionallyRender render={!isMobile}>
                <div
                  className="expert-header-Menubtns"
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    height: "34px",
                    alignItems: "center",
                  }}
                >
                  <ConditionallyRender
                    render={props.toggleOptions.includes("card")}
                  >
                    <ClientHeaderIcons
                      isIcon={true}
                      title="Card View"
                      icon={
                        props.selectedToggleOption === "card"
                          ? MenuIcon
                          : MenuIconBlack
                      }
                      width="80%"
                      height="80%"
                      style={
                        props.selectedToggleOption === "card"
                          ? null
                          : menuBtnStyle
                      }
                      handleClick={() => props.onToggleOptionChange("card")}
                    />
                  </ConditionallyRender>
                  <ConditionallyRender
                    render={props.toggleOptions.includes("list")}
                  >
                    <ClientMenuIcons
                      isIcon={true}
                      title="Table View"
                      icon={
                        props.selectedToggleOption === "list"
                          ? MenuListIconWhite
                          : MenuListIcon
                      }
                      width="80%"
                      height="80%"
                      style={
                        props.selectedToggleOption === "list"
                          ? listBtnStyle
                          : null
                      }
                      handleClick={() => props.onToggleOptionChange("list")}
                    />
                  </ConditionallyRender>
                </div>
              </ConditionallyRender>
            ) : null}

            <ConditionallyRender render={isExtraComponent}>
              {!!component ? component : <></>}
            </ConditionallyRender>
            <ConditionallyRender render={isUserIcon}>
              <LoggedInUser />
            </ConditionallyRender>
          </div>
        </div>
        {isMobile && props.isSearch ? (
          <div>
            <SearchBar
              placeholder={props.searchLabel}
              onSearch={props.onSearch}
              searchValue={props.searchValue || ""}
            />
          </div>
        ) : null}
      </Box>
    </ThemeProvider>
  );
}

// function ConditionallyRender({
//   render,
//   children,
// }: {
//   render?: boolean;
//   children: JSX.Element;
// }) {
//   return <>{render ? children : null}</>;
// }
