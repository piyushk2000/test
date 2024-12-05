import { useState } from "react";
import Box from "@mui/material/Box";
import ModerateHeader from "../../molecules/app-bars/moderate-page";
import ModerateNavBar from "../../organisms/moderate-component/moderate-nav";
import ModerateSelectProfile from "../../organisms/moderate-component/moderate-select-profile";
import ModerateProfile from "../../organisms/moderate-component/moderate-profile";

export default function Moderate() {
  const [showProfile, setShowProfile] = useState(true);
  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleHideProfile = () => {
    setShowProfile(false);
  };
  return (
    <Box
      sx={{
        mt: 0,
        mb: 4,
        background: "#F5F4F4",
        px: 3,
      }}
    >
      <ModerateHeader />
      <ModerateNavBar />
      <ModerateSelectProfile
        handleShowProfile={handleShowProfile}
        handleHideProfile={handleHideProfile}
        showProfile={showProfile}
      />
      {showProfile && <ModerateProfile />}
    </Box>
  );
}
