import { Grid, Stack, Tooltip } from "@mui/material";
import { IndianBankAccountValue, InternationalBankAccountValue, RowsData } from "../types";
import React, { useMemo } from "react";
import { LocalDayjs } from "../../../utils/timezoneService";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";

type Props = {
    RowsData: RowsData;
    hideTotal?: boolean;
}


export default function TransactionDetails({ RowsData, hideTotal }: Props) {

    const total = useMemo(() => {
        return RowsData.reduce((prev, currentValue) => {
            return prev + +currentValue.amount;
        }, 0);
    }, [RowsData.length])

    return (
        <Grid container item mt={"10px"} sx={{
            minWidth: "800px",
            width: "100%",
            "& p": {
                fonSize: "14px",
                color: "rgba(0,0,0,0.5)"
            },
            "& .small": {
                fontSize: "12px"
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
                <Grid item xs={3} sx={{ pl: "1rem" }}><p className="color-black bold">Request</p></Grid>
                <Grid item xs={3}><p className="color-black bold">Expert</p></Grid>
                <Grid item xs={3} textAlign={"center"}><p className="color-black bold">Calls</p></Grid>
                <Grid item xs={3} sx={{ pr: "1rem" }} textAlign={"end"}><p className="color-black bold">Amount</p></Grid>
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
                {RowsData.map((call, index) => {

                    const callIds = call.callIds;
                    return (
                        <Grid
                            item container xs={12} key={call.id} sx={{
                                padding: "1rem 0",
                                borderBottom: "1px solid rgba(0,0,0,0.2)",
                            }}>
                            <Grid item xs={3} sx={{ pl: "1rem" }}>
                                <ColumnInfo>
                                    <p className="color-black bold">ID: {call.id}</p>
                                    <p className="small">{LocalDayjs(call.requested_on).format("DD MMM YYYY")}</p>
                                </ColumnInfo>
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnInfo>
                                    <p className="color-black bold">ID: {call.expert_id}</p>
                                    <p style={{ fontSize: "12px" }}>{call.expert_name}</p>
                                </ColumnInfo>
                            </Grid>
                            <Grid item xs={3} textAlign={"center"}>
                                <Stack>
                                    <p className="color-black bold">Total: {call.callIds.split(",").length}</p>
                                    <p className="small">
                                        {callIds.split(",").length <= 2 ? callIds :
                                            <>
                                                {callIds.split(",").slice(0, 2).join(", ")}

                                                <Tooltip title={callIds.split(",").slice(2).join(", ")} arrow>
                                                    <span style={{ color: "var(--green-color)", marginLeft: "0.5rem", textDecoration: "underline", cursor: "pointer" }}>+{callIds.split(",").slice(2).length} more</span>
                                                </Tooltip>
                                            </>
                                        }
                                    </p>
                                </Stack>
                            </Grid>
                            <Grid item xs={3} sx={{ pr: "1rem" }} textAlign={"end"}><p className="color-black">{call.currency} {call.amount}</p></Grid>
                            <Grid item xs={12}>
                                <BoxFlex sx={{ pl: "1rem", gap: "1rem", width: "100%", alignItems: "center", justifyContent: "flex-start"}}>
                                    <p className="small">A/H Name: {call.bankAccountValue.account_holder_name}</p>
                                    <p className="small">IFSC/SWIFT: {call.bankAccountValue.bank_country_code === "IND" ? (call.bankAccountValue as IndianBankAccountValue).bank_details.ifsc_code : (call.bankAccountValue as InternationalBankAccountValue).bank_details.swift_code }</p>
                                    {call.bankAccountValue.bank_country_code === "IND" &&
                                        <p className="small">Pan: {(call.bankAccountValue as IndianBankAccountValue).pan}</p>}
                                    <p className="small">Bank: {call.bankAccountValue.bank_details.bank_name}</p>
                                    <p className="small">Acc No.: {call.bankAccountValue.bank_details.account_number}</p>
                                </BoxFlex>
                            </Grid>
                        </Grid>)
                })}
            </Grid>
            {!hideTotal &&
                <Grid item container xs={12} sx={{ padding: "0.4rem 0", paddingRight: "0.5rem", }}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Total</p></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black bold">{RowsData[0].currency} {total.toFixed(2)}</p></Grid>
                </Grid>
            }

        </Grid>
    )
}

function ColumnInfo({ children }: { children: React.ReactNode }) {
    return (
        <BoxFlex sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            {children}
        </BoxFlex>
    )
}