import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const BackdropComponent = ({ isBackdrop }: { isBackdrop: boolean }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={isBackdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropComponent;
