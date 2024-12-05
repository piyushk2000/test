import { Work_ex } from "../../organisms/expert-cards/types"
import { LocalDayjs } from "../../utils/timezoneService";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";


type Props = {
    work_experiences: Work_ex[];
}

export function ExpertWorkEx({ work_experiences }: Props) {

    if (work_experiences.length === 0) {
        return (
            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500",marginLeft: '45px', width: "100%" }}>
                No Experience Found for this Expert
            </Typography>
        )
    }

    return (
            <Box sx={{marginLeft: '45px'}}>
                <p style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "15px" }}>Experience</p>
                <WorkExTable work_experiences={work_experiences} />
            </Box>
    )
}

function WorkExTable({ work_experiences }: { work_experiences: Work_ex[] }) {
    return (
        <TableContainer sx={{minWidth: "800px"}} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><p style={{ fontWeight: "700" }}>Date</p></TableCell>
                        <TableCell><p style={{ fontWeight: "700" }}>Company</p></TableCell>
                        <TableCell><p style={{ fontWeight: "700" }}>Designation</p></TableCell>
                        <TableCell><p style={{ fontWeight: "700" }}>Divison</p></TableCell>
                        <TableCell><p style={{ fontWeight: "700" }}>Location</p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {work_experiences.map((exp, index) => (
                        <TableRow key={index}>
                            <TableCell>{exp.start_date && (
                                <p>
                                    {LocalDayjs(exp.start_date).format("MMM YYYY")}
                                    {" - "}
                                    {exp.currently_works_here
                                        ? "Present"
                                        : LocalDayjs(exp.end_date).format("MMM YYYY")}
                                </p>
                            )}</TableCell>
                            <TableCell> <h4>{exp.company}</h4></TableCell>
                            <TableCell><h5>{exp?.designation}</h5></TableCell>
                            <TableCell><h5>{exp?.division || "-"}</h5></TableCell>
                            <TableCell><h5>{exp?.location}</h5></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}