import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DialogModal from "../../atoms/dialog";
import { LocalDayjs } from "../../utils/timezoneService";
import { getTotalAmount } from "../Calls/helpers";
import { CallsData } from "./types";
import { useMemo, useState } from "react";
import { useBoolean } from "../../utils/hooks/useBoolean";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    allCalls: CallsData[];
}

export default function CallDetailsDialog({ isOpen, handleClose, allCalls }: Props) {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Call Details"}
        >
            <CallDetailsFormat
                allCallDetails={allCalls}
            />
        </DialogModal>
    )
}

export function CallDetailsFormat({ allCallDetails, hideTotal }: { allCallDetails: CallsData[], hideTotal?: boolean }) {
    const [allCalls, setAllCalls] = useState(allCallDetails?.slice(0, 3));
    const { value: showAllCalls, setTrue: showAllCallsTrue, setFalse: showAllCallsFalse } = useBoolean((allCallDetails.length - 3) <= 0);

    const total = useMemo(() => {
        return allCallDetails.reduce((prev, currentValue) => {
            const amount: any = getTotalAmount(currentValue.cost_price, currentValue.payable_mins, false, true);
            return prev + amount;
        }, 0).toFixed(2)
    }, [allCallDetails.length]);

    return (
        <Grid container item mt={"10px"} sx={{
            minWidth: "800px",
            width: "100%",
            "& p": {
                fontSize: "14px",
                color: "rgba(0,0,0,0.5)"
            },
            "& .bold": {
                fontWeight: "500"
            },
            "& .extra-bold": {
                fontWeight: "600"
            },
            "& .font-large": {
                fontSize: "20px"
            },
            "& .color-black": {
                color: "black"
            },
            "& .pl-1": {
                paddingLeft: "1rem"
            }
        }}>
            <Grid item container xs={12} mt={"20px"}>
                {/* Titles */}
                <Grid item xs={1.25} sx={{ pl: "1rem" }}><p className="color-black bold">#</p></Grid>
                <Grid item xs={4.75}><p className="color-black bold">Call Details</p></Grid>
                <Grid item xs={2} textAlign={"center"}><p className="color-black bold">Price/hr</p></Grid>
                <Grid item xs={2} textAlign={"center"}><p className="color-black bold">Duration</p></Grid>
                <Grid item xs={2} sx={{ pr: "1rem" }} textAlign={"end"}><p className="color-black bold">Total</p></Grid>
            </Grid>
            <Grid item xs={12} sx={{
                "& div": {
                    backgroundColor: "black",
                    height: "1px",
                    width: "100%"
                }
            }}>
                <div></div>
            </Grid>
            <Grid item container xs={12}>
                {allCalls.map((call, index) => {
                    return (
                        <Grid
                            onClick={() => {
                            }}
                            item container xs={12} key={call.id} sx={{
                                padding: "1rem 0",
                                borderBottom: "1px solid rgba(0,0,0,0.2)",
                                paddingRight: "0.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                            <Grid item xs={1.25}>
                                <p className="color-black pl-1" style={{ fontSize: "12px" }}>{call.id}</p>
                            </Grid>
                            <Grid item xs={4.75}>
                                <Stack>
                                    <p className="color-black bold">{call.title}</p>
                                    {call.remark && <p style={{fontSize: "12px", color: "var(--green-color)"}}>{call.remark}</p>}
                                    <p style={{ fontSize: "12px" }}>
                                        Call Date: {LocalDayjs(call.call_start_time).format("DD MMM YYYY")}
                                    </p>
                                </Stack>
                            </Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{call.cost_price_currency} {call.cost_price}</p></Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{call.payable_mins} mins</p></Grid>
                            <Grid item xs={2} textAlign={"end"}><p className="color-black">{getTotalAmount(call.cost_price, call.payable_mins, true)}</p></Grid>
                        </Grid>)
                })}
                {((allCallDetails.length - 3) > 0) &&
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <div onClick={() => {
                            if (!showAllCalls) {
                                showAllCallsTrue()
                                setAllCalls(allCallDetails)
                            } else {
                                showAllCallsFalse();
                                setAllCalls(allCallDetails.slice(0, 3));
                            }
                        }}>
                            <Typography sx={{
                                color: "var(--primary-color) !important",
                                textDecoration: "underline",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "500",
                                width: "fit-content",
                                "&:hover": {
                                    textDecoration: "initial"
                                }
                            }}
                            >
                                {!showAllCalls ?
                                    <>+ {allCallDetails.length - 3} Calls</> : <>
                                        - Hide Calls
                                    </>
                                }
                            </Typography>
                        </div>
                    </Grid>
                }
            </Grid>
            {!hideTotal &&
                <Grid item container xs={12} sx={{ padding: "0.4rem 0",  pt: "1rem", paddingRight: "0.5rem", }}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black bold">Total ( {allCallDetails.length} {allCallDetails.length === 1 ? "Call" : "Calls"} )</p></Grid>
                    <Grid item xs={2} textAlign={"end"}><p className="color-black bold">{total}</p></Grid>
                </Grid>
            }
        </Grid>
    )
}