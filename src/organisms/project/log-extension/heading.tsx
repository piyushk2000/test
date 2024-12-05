import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Grid"
import { FormLevelTypes } from './LogExtension'

type Props = {
    formLevel: FormLevelTypes
}

const LogExtensionHeading = ({ formLevel }: Props) => {
    return (
        <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"15px 0"}
            gap={"0.25rem"}
        >
            <Typography
                fontSize={"12px"}
                width={"18px"}
                height={"18px"}
                borderRadius={"50%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ backgroundColor: "#EC9324", color: "white" }}
            >
                1
            </Typography>
            <Typography
                fontSize={"12px"}
                fontWeight={"600"}
                style={{ opacity: "0.75" }}
            >
                Project Details
            </Typography>
            <div style={{
                width: "20%",
                marginLeft: "10px",
                display: "flex",
            }}>
                <hr
                    style={{
                        width: "50%",
                        border: "1px solid #EC9324",
                    }}
                />
                <hr
                    style={{
                        width: "50%",
                        border: `1px solid ${formLevel === "PE_Mapped" ? "#EC9324" : "#B2B2B2"}`,
                    }}
                />
            </div>

            <Typography
                fontSize={"12px"}
                width={"18px"}
                height={"18px"}
                borderRadius={"50%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ backgroundColor: formLevel === "PE_Mapped" ? "#EC9324" : "#B2B2B2", color: "white" }}
            >
                2
            </Typography>
            <Typography
                fontSize={"12px"}
                fontWeight={"600"}
                style={{ opacity: "0.75" }}
            >
                PE Mapped
            </Typography>
        </Grid>
    )
}

export default LogExtensionHeading