import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import MyCalendarBoxes from "../../organisms/my-calendar-boxes";
import { getTotalCalls } from "./helper";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { DatePicker } from "@mui/x-date-pickers";
import MyCalenderNavbar from "../../molecules/nav-bars/my-calender-page";

export default function MyCalenderView() {
    const {
        date,
        setDate,
        CallsDetails,
        groupData,
        filters
    } = useMyCalenderContext();

    return (
        <>
            <MyCalenderNavbar />
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    padding: "1rem",
                    borderRadius: "15px",
                    marginBottom: "2rem",
                }}
            >
                <Stack direction={"row"} justifyContent={"flex-start"} mb={2} alignItems={"center"}>
                    <p style={{ width: "35%", fontWeight: "500", fontSize: "14px" }}>
                        Total Calls: {CallsDetails ? getTotalCalls(CallsDetails) : 0}
                    </p>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <IconButton
                            onClick={() => setDate(date ? date.subtract(1, "day") : date)}
                            disableRipple
                        >
                            <ChevronLeft />
                        </IconButton>
                        <DatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: {
                                    size: "small",
                                },
                            }}
                        />
                        <IconButton
                            onClick={() => setDate(date ? date.add(1, "day") : date)}
                            disableRipple
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Stack>
                </Stack>


                {CallsDetails &&
                    Object.keys(CallsDetails).length ? (
                    <MyCalendarBoxes arrangeBy="Day" CallsDetails={CallsDetails} groupData={groupData} isGroupedByAm={filters.tab === "groupedbyAM"} />
                ) : (
                    <Typography
                        sx={{ textAlign: "center", fontSize: "16px", color: "#252B3B" }}
                    >
                        There is no data to display for the given date.
                    </Typography>
                )}
            </Box>
        </>

    );
}