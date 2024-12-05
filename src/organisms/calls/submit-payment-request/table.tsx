import Grid from "@mui/material/Grid";
import { Checkbox, Stack } from "@mui/material";
import dayjs from "dayjs";
import { CallDetails, SelectedCards } from "../../../pages/Calls/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { getTotalAmount } from "../../../pages/Calls/helpers";
import { toggleItemInArray } from "../../../common/select";
import { SectionType } from "./helper";

type Props = {
    callDetails: CallDetails;
    select: SelectedCards[];
    setSelected: Dispatch<SetStateAction<SelectedCards[]>>;
    section: SectionType;
}

const SubmitPaymentRequestTable = ({ callDetails, select, setSelected, section }: Props) => {
    const total = useMemo(() => {
        return select.reduce((prev, currentValue) => {
            const isDomestic = currentValue.fk_expert_value.primary_bank_value?.bank_country_code === "IND";
            const cost_price = isDomestic ? (currentValue.cost_price * currentValue.exchange_rate_payable) : currentValue.cost_price;
            const amount: any = getTotalAmount(cost_price, currentValue.payable_mins, false, true);
            return prev + amount;
        }, 0).toFixed(2)
    }, [select.length])

    const isConfirmSection = section === "Confirm call details";

    const allCalls = isConfirmSection ? callDetails : select;

    const isDomestic = allCalls[0].fk_expert_value.primary_bank_value?.bank_country_code === "IND";
    const call_cost_price_currency = isDomestic ? "INR" : allCalls[0].cost_price_currency


    return (
        <Grid container item mt={"10px"} sx={{
            minWidth: "800px",
            width: "100%",
            "& p": {
                fonSize: "14px",
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
                <Grid item xs={1} sx={{ pl: "1rem" }}><p className="color-black bold">#</p></Grid>
                <Grid item xs={5}><p className="color-black bold">Call Details</p></Grid>
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
                {allCalls.map((call,index) => {
                    const isSelected = !!select.find((call_detail) => call_detail.id === call.id);
                    const isDomestic = call.fk_expert_value.primary_bank_value?.bank_country_code === "IND";
                    const cost_price = isDomestic ? (call.cost_price * call.exchange_rate_payable) : call.cost_price;
                    return (
                        <Grid
                            onClick={() => {
                                isConfirmSection &&
                                setSelected(prev => {
                                    return toggleItemInArray<SelectedCards>(prev, {
                                        value: call.id,
                                        ...call
                                    })
                                })
                            }}
                            item container xs={12} key={call.id} sx={{ 
                                padding: "1rem 0",
                                 borderBottom: "1px solid rgba(0,0,0,0.2)", 
                                 backgroundColor: (isSelected && isConfirmSection) ? "#ec932410" : "initial", 
                                 paddingRight: "0.5rem", 
                                 cursor: isConfirmSection ? "pointer": "initial" }}>
                            <Grid item xs={1}>
                                {isConfirmSection ?
                                    <>
                                        <Checkbox
                                            checked={isSelected}
                                        />
                                    </> :
                                    <>
                                        <p className="color-black bold pl-1">{(index + 1) < 10 ? `0${index + 1}` : index + 1}</p>
                                    </>
                                }

                            </Grid>
                            <Grid item xs={5}>
                                <Stack><p className="color-black bold">{call.title}</p><p style={{ fontSize: "12px" }}>Call Date: {dayjs(call.call_start_time).format("DD MMM YYYY")}</p></Stack></Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{isDomestic ? "INR" : call.cost_price_currency} {cost_price}</p></Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{call.payable_mins} mins</p></Grid>
                            <Grid item xs={2} textAlign={"end"}><p className="color-black">{call_cost_price_currency} {getTotalAmount(cost_price, call.payable_mins, true)}</p></Grid>
                        </Grid>)
                })}
            </Grid>
            <Grid item container xs={12} sx={{ padding: "0.4rem 0", paddingRight: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
                <Grid item xs={7}></Grid>
                <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Sub Total</p></Grid>
                <Grid item xs={3} textAlign={"end"}><p className="color-black">{call_cost_price_currency} {total}</p></Grid>
            </Grid>
            <Grid item container xs={12} sx={{ padding: "0.4rem 0", paddingRight: "0.5rem" }}>
                <Grid item xs={7}></Grid>
                <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Tax</p></Grid>
                <Grid item xs={3} textAlign={"end"}><p className="color-black">0</p></Grid>
            </Grid>
            <Grid item container xs={12} sx={{ padding: "0.4rem 0", paddingRight: "0.5rem", }}>
                <Grid item xs={7}></Grid>
                <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Total</p></Grid>
                <Grid item xs={3} textAlign={"end"}><p className="color-black bold">{call_cost_price_currency} {total}</p></Grid>
            </Grid>
        </Grid>
    )
}

export default SubmitPaymentRequestTable