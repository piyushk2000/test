import Grid from "@mui/material/Grid";
import { Invoice } from "./types";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import dayjs from "dayjs";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { useState } from "react";
import { useBoolean } from "../../../utils/hooks/useBoolean";

type Props = {
    invoice: Invoice;
    showPrintBtn?: boolean;
}

const TitleValue = ({ title, value, sx = {} }: { title: string, value: string, sx?: SxProps<Theme> }) => {
    return (
        <Stack direction={"column"} alignItems={"flex-end"} sx={sx}>
            <p style={{ fontSize: "20px", fontWeight: "500" }}>{title}</p>
            <p>{value}</p>
        </Stack>
    )
}

const ViewInvoice = ({ invoice, showPrintBtn = true }: Props) => {

    console.log({showPrintBtn});

    const [allCalls, setAllCalls] = useState(invoice.line_items?.slice(0, 3));
    const { value: showAllCalls, setTrue: showAllCallsTrue, setFalse: showAllCallsFalse } = useBoolean((invoice.line_items.length - 3) <= 0);

    const handlePrintClick = () => {
        const style = document.createElement('style');

        // Define a unique class for the printable area with the desired scaling
        const printStyle = `
        @media print {
                .printable-area {
                    transform: scale(0.8); 
                    transform-origin: top left; 
                    width: 100%; 
                    height: auto; 
                    display: inline-block; 
                }
                body {
                    margin: 0;
                    padding: 0;
                }
                @page {
                    margin: 5mm;
                }
            }`;

        style.innerHTML = printStyle;
        document.head.appendChild(style);

        // Trigger the browser's print functionality
        window.print();

        // Remove the added style to avoid affecting other pages
        document.head.removeChild(style);
    }

    return (
        <BoxFlex sx={{ alignItems: "center", justifyContent: "center" }}>
            <Grid container item mt={"10px"} sx={{
                width: "660px",
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
                }
            }}>
                <Grid item xs={12}>
                    <p className="bold" style={{ fontSize: "2rem" }}>{invoice.expert_name}</p>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"column"}>
                        <p>{invoice.expert_address}</p>
                        <p>{invoice.expert_email}</p>
                        <p>{invoice.expert_phone}</p>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ margin: "1rem 0" }}>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <p className="font-large bold">Billed To:</p>
                    <Stack direction={"column"}>
                        <p className="font-large bold">{invoice.billed_to.name}</p>
                        <p>{invoice.billed_to.address}</p>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <TitleValue
                        title={"Invoice No:"}
                        value={invoice.invoice_no}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TitleValue
                        title="Invoice Date:"
                        value={invoice.invoice_date}
                    />
                </Grid>
                <Grid item container xs={12} mt={"20px"}>
                    {/* Titles */}
                    <Grid item xs={1}><p className="color-black bold">#</p></Grid>
                    <Grid item xs={5}><p className="color-black bold">Call Details</p></Grid>
                    <Grid item xs={2} textAlign={"center"}><p className="color-black bold">Price/hr</p></Grid>
                    <Grid item xs={2} textAlign={"center"}><p className="color-black bold">Duration</p></Grid>
                    <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Total</p></Grid>
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
                    {allCalls.map((call, index) => (
                        <Grid item container xs={12} key={call.call_id} sx={{ padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
                            <Grid item xs={1}><p className="color-black bold">{(index + 1) < 10 ? `0${index + 1}` : index + 1}</p></Grid>
                            <Grid item xs={5}>
                                <Stack><p className="color-black bold">{call.call_id}</p><p style={{ fontSize: "12px" }}>Call Date: {dayjs(call.call_start_time).format("DD MMM YYYY")}</p></Stack></Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{call.cost_price_currency} {call.cost_price_per_hour}</p></Grid>
                            <Grid item xs={2} textAlign={"center"}><p className="color-black">{call.payable_mins} mins</p></Grid>
                            <Grid item xs={2} textAlign={"end"}><p className="color-black">{call.total}</p></Grid>
                        </Grid>
                    ))}
                    {((invoice.line_items.length - 3) > 0) &&
                        <Grid item xs={12}
                            sx={{
                                '@media print': {
                                    display: "none",
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}
                        >
                            <div onClick={() => {
                                if (!showAllCalls) {
                                    showAllCallsTrue()
                                    setAllCalls(invoice.line_items)
                                } else {
                                    showAllCallsFalse();
                                    setAllCalls(invoice.line_items.slice(0, 3));
                                }
                            }}>
                                <Typography sx={{
                                    color: "var(--primary-color) !important",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    width: "fit-content",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    "&:hover": {
                                        textDecoration: "initial"
                                    }
                                }}
                                >
                                    {!showAllCalls ?
                                        <>+ {invoice.line_items.length - 3} Calls</> : <>
                                            - Hide Calls
                                        </>}
                                </Typography>
                            </div>
                        </Grid>
                    }
                </Grid>
                <Grid item container xs={12} sx={{ padding: "0.4rem 0", pt: "1rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Sub Total</p></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black">{invoice.subtotal}</p></Grid>
                </Grid>
                <Grid item container xs={12} sx={{ padding: "0.4rem 0" }}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={2} textAlign={"end"}><p className="color-black bold">Tax</p></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black">{invoice.tax}</p></Grid>
                </Grid>
                <Grid item container xs={12} sx={{ padding: "0.4rem 0" }}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black bold">Total <Typography component={"span"} className="color-black bold" sx={{ '@media print': {display: "none"},  fontSize: "14px",
                    color: "rgba(0,0,0,0.5)"}}>( {invoice.line_items.length} {invoice.line_items.length === 1 ? "Call" : "Calls"} )</Typography></p></Grid>
                    <Grid item xs={3} textAlign={"end"}><p className="color-black bold">{invoice.total_amount}</p></Grid>
                </Grid>
                <Grid padding={"1rem 0"}>
                    <p>This is a computer-generated invoice. No signature is required.</p>
                </Grid>
                {showPrintBtn &&
                    <Grid item xs={12} sx={{
                        '@media print': {
                            display: "none",
                        },
                    }}>
                        <IconButton sx={{
                            backgroundColor: "#198754",
                            width: "50px",
                            height: "50px",
                            borderRadius: "5px",
                            "&:hover,&:focus": {
                                backgroundColor: "#198754"
                            },
                        }}
                            onClick={async () => {
                                await showAllCallsTrue();
                                await setAllCalls(invoice.line_items);
                                handlePrintClick();
                            }}
                        >
                            <PrintIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Grid>
                }
            </Grid>
        </BoxFlex>

    )
}

export default ViewInvoice