import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import "./client-profile-navbar.scss";
import { useNavigate } from "react-router-dom";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import Calender from "../../assets/images/client/calendar.png";
import { AppRoutes } from "../../constants";

const ClientContactProfileNavbar = () => {
  const navigate = useNavigate();

  return (
    <Grid className="client-navbar-container" container>
      <Grid
        sx={{
          alignSelf: "center",
        }}
        item
        xs={12}
        md={3}
        lg={4}
        xl={6}
      >
        <Button
          sx={{
            color: "#000000",
            textTransform: "capitalize",
            fontSize: "15px",
            alignSelf: "center",
            fontFamily: "inherit",
          }}
          onClick={() => navigate(AppRoutes.CLIENTS + "/all")}
        >
          <ArrowBackIcon />
          <span className="back-btn-title">Back to Customer</span>
        </Button>
      </Grid>
      <Grid className="navbar-btns" item xs={12} md={9} lg={8} xl={6}>
        <p>Current Month</p>
        <TooltipIcons icon={Calender} isIcon={true} title="Calender" />
      </Grid>
    </Grid>
  );
};
export default ClientContactProfileNavbar;
