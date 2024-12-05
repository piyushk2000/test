import Grid from "@mui/material/Grid";
import { headingTable, tableContent, projectContent, inputRow } from "./style";
import { Tooltip, Typography } from "@mui/material";
import { selectedCardsTypes } from "../../../pages/Experts/types";
import React from "react";

type props = {
    selectedCards: selectedCardsTypes;
    allowMtTop?:boolean;
}

export default function SelectedExperts({selectedCards,allowMtTop}: props) {
    return (
        <>
            <Grid container mt={allowMtTop?'-0.7rem':"1rem"} sx={inputRow}>
                <Grid item xs={2.5} sx={headingTable}>
                    <p>SNo.</p>
                </Grid>
                <Grid item xs={2.5} sx={headingTable}>
                    <p>Expert Id</p>
                </Grid>
                <Grid item xs={7} sx={headingTable}>
                    <p>Expert Name</p>
                </Grid>
                <Grid item xs={12} m={"0.5rem 0"}>
                    <hr />
                </Grid>
                {selectedCards.map((p,index) => (
                    <React.Fragment key={p.value}>
                        <Grid item xs={2.5} sx={tableContent}>
                            <p>{index + 1}</p>
                        </Grid>
                        <Grid item xs={2.5} sx={tableContent}>
                            <p>{p.value}</p>
                        </Grid>
                        <Grid item xs={7}>
                            <Tooltip title={p.label} arrow>
                                <Typography sx={projectContent}>{p.label}</Typography>
                            </Tooltip>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </>
    )
}