import Chip from "@mui/material/Chip";

export function CustomChip({
  sx,
  icon,
  label,
  bg,
  color,
  onClick
}: {
  sx?:any;
  label: any;
  icon?: string;
  bg?: string;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <Chip
      sx={{
        ...sx,
        background: bg,
        color: color,
        fontWeight: "400",
        fontSize: "12px",
        cursor: onClick ? "pointer": undefined
      }}
      onClick={onClick}
      icon={icon ? <img src={icon} width="12px" height="12px" /> : undefined}
      label={label}
      size="small"
    />
  );
}
