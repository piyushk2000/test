import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

type Props = {
  navigateTo: string;
  title: string;
};

const BackToPageBtn = ({ navigateTo, title }: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        color: "#000000",
        textTransform: "capitalize",
        fontSize: "14px",
        fontFamily: "inherit",
        mb: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
      onClick={() => navigate(navigateTo)}
    >
      <ArrowBackIcon sx={{ fontSize: "20px" }} />
      <Typography
        component={"span"}
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default BackToPageBtn;
