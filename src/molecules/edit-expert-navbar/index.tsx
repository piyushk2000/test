import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./edit-expert-navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { isExpert, isSuperAdmin } from "../../utils/role";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants";

type Props = {
  id: string | null;
  page: string | null;
  NumberPendingApproval: number;
}

const EditExpertNavbar = (props: Props) => {
  const navigate = useNavigate();
  const { id, page, NumberPendingApproval } = props;

  return (
    <Box className={styles.EditExpertNavbar}>
      <Button
        className={styles.backButton}
        variant="text"
        onClick={() => {
          const url = isExpert() ? `/layout/expert-profile?id=${id}` : `/layout/expert-profile?id=${id}&page=${page}`
          navigate(url)
        }}
      >
        <ArrowBackIcon />
        <span className="back-btn-title">Back to Expert</span>
      </Button>
      {isSuperAdmin() &&
        <Link to={`${AppRoutes.EXPERT_PENDING_APPROVAL}?id=${id}`}
          target="_blank"
          rel="noopener,noreferrer"
        >
          <Chip
            label={`${NumberPendingApproval === 1 ? "Pending Edit" : "Pending Edits"} (${NumberPendingApproval || '0'})`}
            sx={pendingApprovalStyle(NumberPendingApproval)}
          />
        </Link>
      }
    </Box>
  );
};

export default EditExpertNavbar;


export const pendingApprovalStyle = (NumberPendingApproval: number) => {
  let color = "rgba(0, 0, 0, 0.87)";
  let backgroundColor = "rgba(0, 0, 0, 0.08)";

  if (NumberPendingApproval) {
    color = "#ec9324"
    backgroundColor = "#ec932430"
  }


  return {
    color,
    backgroundColor,
    cursor: "pointer",
    fontWeight: "600",
  }
}