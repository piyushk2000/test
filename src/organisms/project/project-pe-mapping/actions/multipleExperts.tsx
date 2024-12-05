import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SelectedCards } from "../type"
import NoResultFoundFilters from "../../../../atoms/noResultsFilters";

const MultipleExperts = ({ selectedCards }: { selectedCards: SelectedCards[] }) => {

    const headings = ["Expert Name", "Relevant Company", "Relevant Designation"]

    return (
        <Grid container mt={"10px"}>
            <>
                {selectedCards.length ?
                    <>
                        <Grid item xs={12} mb="5px">
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", textDecoration: "underline" }}>Selected Experts:</Typography>
                        </Grid>
                        <Grid item container xs={12} component={"ul"}>
                            {headings.map((heading) => (
                                <Grid item xs={4} component={"li"}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>{heading}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item container xs={12} component={"ul"}>
                            {selectedCards.map((card, index) => (
                                <>
                                    <Grid item key={card.value} xs={4} component={"li"}>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {index + 1}. {card.label}
                                        </Typography>
                                    </Grid>
                                    <Grid item key={card.value} xs={4} component={"li"}>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {card.company}
                                        </Typography>
                                    </Grid>
                                    <Grid item key={card.value} xs={4} component={"li"}>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {card.designation}
                                        </Typography>
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                        <Grid item xs={12} margin={"10px 0"}>
                            <hr />
                        </Grid>
                    </>
                    : <Grid item xs={12} mb="42px">
                        <NoResultFoundFilters text="Please Select an Expert" />
                    </Grid>
                }
            </>

        </Grid>
    )
}

export default MultipleExperts