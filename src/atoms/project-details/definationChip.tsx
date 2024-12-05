import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  toolTipTitle: string;
  text: string;
  color?: string;
};

const DefinitionChip = ({ toolTipTitle, text, color = '#ffffff' }: Props) => {
  const isColorChip = color !== '#ffffff';

  return (
    <Tooltip title={toolTipTitle} arrow>
      <Box
        sx={{
          width: isColorChip ? 14 : 19,
          height: isColorChip ? 14 : 19,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: '1px solid #000',
          backgroundColor: color,
          position: 'relative',
        }}
      >
        {!isColorChip && (
          <Typography
            sx={{
              fontSize: 8,
              fontWeight: "600",
              color: "black",
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default DefinitionChip;