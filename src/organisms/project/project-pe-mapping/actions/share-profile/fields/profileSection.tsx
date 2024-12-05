import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {
  ProfileSectionStyle,
  avatarStyle,
  profileDetailsStyle,
} from "../style";
import { formattedExpertsData } from "../type";
import { Link } from "react-router-dom";

type Props = {
  expert_id: number | null,
  company: string | null,
  expertsData: formattedExpertsData | null,
  designation: string | null,
  location: string | null
}

const ProfileSection = ({ company, designation, expert_id, expertsData, location }: Props) => {

  return (
    <Grid item xs={12} sx={ProfileSectionStyle}>
      <Avatar sx={avatarStyle} src={expertsData?.picture || ""} />
      <Box sx={profileDetailsStyle}>
        <Link style={{
          fontWeight: "600",
        }} to={"/layout/expert-profile?page=1&id=" + expert_id} target="_blank" rel="noopener,noreferrer">{expertsData?.name || null}</Link>
        <p>{designation || ""}, <small>{company || ""}</small> </p>

        <small>{location || ""}</small>
      </Box>
    </Grid>
  );
};

export default ProfileSection;
