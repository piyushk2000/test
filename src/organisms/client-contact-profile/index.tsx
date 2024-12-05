// import "../project-detail/project-detail-card/project-detail-cards.scss";
import Box from "@mui/material/Box";
import "./client-profile.scss";
import ClientContactProfileHeader from "../../molecules/app-bars/client-contact-profile";
import ClientContactProfileNavbar from "../../molecules/client-contact-profile-navbar";
import ClientContactProfileInfo from "../../molecules/client-contact-profile-sections/client-contact-profile-info";
import ClientContactProfileProjects from "../../molecules/client-contact-profile-sections/client-contact-profile-projects";
import ClientContactProfileInflow from "../../molecules/client-contact-profile-sections/client-contact-profile-inflow";

const ClientProfile = () => {
  return (
    <Box className="client-profile">
      <ClientContactProfileHeader />
      <Box className="client-profile-header">
        <Box className="client-profile-header-section">
          <ClientContactProfileNavbar />
          <ClientContactProfileInfo />
          <ClientContactProfileProjects />
          <ClientContactProfileInflow />
        </Box>
      </Box>
    </Box>
  );
};
export default ClientProfile;
