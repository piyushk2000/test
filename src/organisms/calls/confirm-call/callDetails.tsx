import { Grid } from "@mui/material";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { CallDetail } from "../../../pages/Calls/types";
import { getTotalAmount, priceFormatter } from "../../../pages/Calls/helpers";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
    callDetail: CallDetail;
}

export default function CallDetailEL({ callDetail }: Props) {
    const { cost_price_currency, cost_price, payable_mins, call_start_time } = callDetail;

    const amount = `${cost_price_currency} ${getTotalAmount(
        cost_price,
        payable_mins
    )}`;

    const billing_rate = `${priceFormatter(cost_price)}/Hr`;
    const callDate = LocalDayjs(call_start_time).format("DD MMM YYYY");
    const callTime = LocalDayjs(call_start_time).format("hh:mmA");

    return (
        <Grid container spacing={1} mt={2}>
            <CallItems
                label="Amount:"
                value={amount}
            />
            <CallItems
                label="Billing Rate:"
                value={billing_rate}
            />
            <CallItems
                label={"Call Date: "}
                value={callDate}
            />
            <CallItems
                label={"Start Time: "}
                value={callTime}
            />
            <CallItems
                label={"Duration: "}
                value={payable_mins + " mins"}
            />
        </Grid>
    )
}

function CallItems({ label, value }: { label: string, value: string }) {
    return (
        <>
            <Grid item xs={3} sx={{ fontWeight: "500", fontSize: "14px" }}>
                {label}
            </Grid>
            <Grid item xs={3} sx={{ fontSize: "14px" }}>
                {value}
            </Grid>
        </>

    )
}