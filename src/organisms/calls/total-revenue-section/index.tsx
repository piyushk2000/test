import { Grid } from '@mui/material'
import React from 'react'
import { mulipleExpertSelect } from '../request-payment-form/style'
import { getPayableMinutes } from '../../../pages/Calls/helpers'
import { SelectedCards } from '../../../pages/Calls/types'

type Props = {
    selectedCards: SelectedCards[];
    isClicked: boolean;
}

const TotalRevenueSection = ({ selectedCards, isClicked }: Props) => {

    // --------- USED ONLY WHEN REQUEST PAYMENT IS SUBMITTED IN BULK ----------------------------------------- //

    const total_amount = isClicked ? selectedCards.map((call) => ((call.cost_price * call.payable_mins) / 60)).reduce((total, current) => (total + current), 0) : null;

    // ------------------------------------------------------------------------------------------------------ //


    return (
        <>
            <Grid item container xs={12} m={"10px 16px"} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Grid item xs={6} sx={mulipleExpertSelect("500")}><p>Expert Name</p></Grid>
                <Grid item xs={6} sx={mulipleExpertSelect("500")}><p>Payable Amount</p></Grid>
                {selectedCards.map((call: any) => (
                    <React.Fragment key={call.id}>
                        <Grid item xs={6} sx={mulipleExpertSelect("400")}>
                            <p>
                                {call.fk_expert_value.name}
                            </p>
                        </Grid>
                        <Grid item xs={6} sx={mulipleExpertSelect("400")}>
                            <p>
                                {getPayableMinutes(call.cost_price_currency, call.cost_price, call.payable_mins)}
                            </p>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12} sx={{ padding: "5px 0" }}>
                    <hr />
                </Grid>
                <Grid item xs={6} sx={mulipleExpertSelect("500")}><p>Total</p></Grid>
                <Grid item xs={6} sx={mulipleExpertSelect("500")}><p> {selectedCards[0].cost_price_currency} {total_amount?.toFixed(2)}</p></Grid>
                <Grid item xs={12} sx={{
                    textAlign: "center",
                    color: "var(--green-color)",
                    paddingTop: "20px",
                    fontWeight: "500"
                }}><p>Kindly submit an invoice for the total amount of {selectedCards[0].cost_price_currency} {total_amount?.toFixed(2)} below</p></Grid>
            </Grid>
        </>
    )
}

export default TotalRevenueSection