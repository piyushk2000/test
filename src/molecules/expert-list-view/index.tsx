import Box from "@mui/material/Box";
import { useState } from "react";
import SortIcon from "../../assets/images/sort.png";
import More from "../../assets/images/more.png";
import Image from "../../assets/images/image-4.png";
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { selectExpertdata } from "./helper";
import Star from "../../assets/images/expert/star_expert.png";
import Contact from "../../assets/images/expert/call_new.png";
import CloseIcon from "@mui/icons-material/Close";
import Reopen from "../../assets/images/expert/refresh.png";
import Approved from "../../assets/images/expert/tick.png";
import Checkmark from "../../assets/images/expert/checkmark.png";
import { MoreActions } from "./MoreActions";
import {
  styleDefault,
  styleIdentified,
  styleContacted,
  styleConfirmed,
  stylePendingUpdates,
  styleRefuse,
  styleOnboarding,
  headerDataStyle,
  headerpaddingAndFont,
  headerCheckBoxStyle,
  cellCheckBoxStyle,
  cellPaddingAndFont,
  contactIconStyle,
  refuseIconStyle,
  reopenIconStyle,
  approvedIconStyle,
  checkMarkIconStyle,
} from "./selectExpertStyle";
import {
  selectedCardsTypes,
  setSelectedCardsTypes,
} from "../../pages/Experts/types";

type Props = {
  selectExpert: boolean;
  selectedCards: selectedCardsTypes;
  setSelectedCards: setSelectedCardsTypes;
};

export default function ListView({
  selectExpert,
  selectedCards,
  setSelectedCards,
}: Props) {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);

  const handleSelectAllClick = () => {
    if (selectedCheckbox.length === selectExpertdata.length) {
      setSelectedCheckbox([]);
    } else {
      setSelectedCheckbox(selectExpertdata.map((_, index) => index));
    }
  };

  const handleCheckboxClick = (index: number) => {
    if (selectedCheckbox.includes(index)) {
      setSelectedCheckbox(
        selectedCheckbox.filter((rowIndex) => rowIndex !== index)
      );
    } else {
      setSelectedCheckbox([...selectedCheckbox, index]);
    }
  };

  const handleClearClick = () => {
    setSelectedCheckbox([]);
  };

  return (
    <Box
      mt={5}
      sx={{
        backgroundColor: "white",
        paddingBottom: {
          xs: "20px",
          sm: "50px",
        },
        borderRadius: "10px",
        border: "1px solid white",
        overflowX: "scroll",
      }}
      className="horizontal-scrollbar"
    >
      <TableContainer
        component={Table}
        sx={{
          borderRadius: "10px 10px 0 0",
          borderBottom: "0px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {selectExpert ? (
                <TableCell sx={headerpaddingAndFont}>
                  <Checkbox
                    color="default"
                    size="small"
                    sx={headerCheckBoxStyle}
                    checked={
                      selectedCheckbox.length === selectExpertdata.length
                    }
                    onChange={handleSelectAllClick}
                    disableRipple
                  />
                </TableCell>
              ) : null}
              <TableCell align="right" sx={headerpaddingAndFont}>
                <div style={{ ...headerDataStyle, marginLeft: "10px" }}>
                  <span>Name</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>Email</div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>Phone</div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>ID</div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Cost Price</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Created On</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Status</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Call</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Projects</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>Bad calls</div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>
                  <span>Rating</span>
                  <img src={SortIcon} height={"14px"} alt="sort" />
                </div>
              </TableCell>
              <TableCell align="left" sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>More</div>
              </TableCell>
              <TableCell sx={headerpaddingAndFont}>
                <div style={headerDataStyle}>Action</div>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  padding: "25px 8px 0 0",
                  fontSize: "11px",
                  display: "flex",
                }}
              >
                <MoreActions />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectExpertdata.map((data, index) => (
              <TableRow key={index}>
                {selectExpert ? (
                  <TableCell component="th" scope="row" sx={{ padding: "0" }}>
                    <Checkbox
                      color="default"
                      size="small"
                      sx={cellCheckBoxStyle}
                      checked={selectedCheckbox.includes(index)}
                      onChange={() => handleCheckboxClick(index)}
                      disableRipple
                    />
                  </TableCell>
                ) : null}
                <TableCell align="left" sx={{ padding: "0 10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      fontSize: "11px",
                      color: "#252B3B",
                      marginLeft: "10px",
                    }}
                  >
                    <Avatar
                      src={Image}
                      sx={{ height: "18px", width: "18px" }}
                    />
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#252B3B",
                        opacity: "0.95",
                        letterSpacing: "0",
                      }}
                    >
                      {data.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  {data.email}
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  {data.phone}
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  {data.id}
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  {data.cost_price}
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  {data.created_on}
                </TableCell>
                <TableCell align="left" sx={cellPaddingAndFont}>
                  <div
                    style={
                      data.status === "Identified"
                        ? styleIdentified
                        : data.status === "Contacted"
                        ? styleContacted
                        : data.status === "Confirmed"
                        ? styleConfirmed
                        : data.status === "Pending update"
                        ? stylePendingUpdates
                        : data.status === "Refused"
                        ? styleRefuse
                        : data.status === "Onboarding"
                        ? styleOnboarding
                        : styleDefault
                    }
                  >
                    {data.status}
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "0", fontSize: "11px", color: "#19AD4B" }}
                >
                  {data.call}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "0", fontSize: "11px", color: "#19AD4B" }}
                >
                  {data.projects}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "0", fontSize: "11px", color: "#AD4719" }}
                >
                  {data.bad_calls}
                </TableCell>
                <TableCell align="left" sx={{ padding: "0" }}>
                  {data.rating && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.1rem",
                        fontSize: "11px",
                        color: "#AD4719",
                      }}
                    >
                      <img src={Star} width={"11px"} alt="Star" />
                      <span>{data.rating}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    padding: "0",
                    transform: "rotate(90deg)",
                    paddingTop: "25px",
                    paddingLeft: "10px",
                  }}
                >
                  <img
                    src={More}
                    height={"10px"}
                    width={"12px"}
                    alt="more"
                    style={{ color: "#545454", opacity: "0.6" }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ padding: "0" }}>
                  {data.action.is_contact && (
                    <Tooltip title="Contact" arrow>
                      <IconButton sx={contactIconStyle}>
                        <img
                          src={Contact}
                          width={"14px"}
                          alt="Contact"
                          style={{ transform: "rotate(-45deg)" }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  {data.action.is_refuse && (
                    <Tooltip title="Refuse" arrow>
                      <IconButton sx={refuseIconStyle}>
                        <CloseIcon sx={{ width: "14px", color: "#9B1C31" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {data.action.is_reopen && (
                    <Tooltip title="Reopen" arrow>
                      <IconButton sx={reopenIconStyle}>
                        <img src={Reopen} width={"12px"} alt="reopen" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {data.action.is_approved && (
                    <Tooltip title="Approved Expert" arrow>
                      <IconButton sx={approvedIconStyle}>
                        <img
                          src={Approved}
                          width={"12px"}
                          alt="reopen"
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                            padding: "2px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="left" sx={{ padding: "0" }}>
                  {data.accept_action && (
                    <Tooltip title="Accept" arrow>
                      <IconButton sx={checkMarkIconStyle}>
                        <img src={Checkmark} width={"12px"} alt="Accept" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
