import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  toolTipTitle: string;
  text: string;
  completed: boolean;
  pending?: boolean;
  handleClick?: () => void;
};

const PEStatusChip = ({ toolTipTitle, text, completed, pending = false , handleClick = () => {}}: Props) => {
  return (
    <Tooltip title={toolTipTitle} arrow>
      <Box
      onClick={handleClick}
        sx={{
          backgroundColor: completed ? "#16A848" : pending ? "red" : "grey",
          width: "17px",
          height: "17px",
          borderRadius: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",

          "& p": {
            fontSize: "10px",
            fontWeight: "700",
            color: "white",
          },
        }}
      >
        <p>{text}</p>
      </Box>
    </Tooltip>
  );
};

export default PEStatusChip;
