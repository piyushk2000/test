import IconButton from "@mui/material/IconButton";
import MenuBurgerIcon from "../../../assets/images/menu-burger-new.png";
import { useSidebar } from "../../../utils/hooks/useSidebar";


export default function Hamburger() {
  const { setSidebarOpen } = useSidebar();

  return (
    <IconButton
      sx={{ width: {
        xs: "40px",
        sm: "40px"
      }, height: {
        xs: "40px",
        sm: "40px"
      }, marginRight: "5px", marginLeft: "-8px" }}
      color="inherit"
      aria-label="open drawer"
      onClick={() => setSidebarOpen((prev) => !prev)}
      edge="start"
      disableRipple
    >
      <img
        alt="hamburger icon"
        src={MenuBurgerIcon}
      />
    </IconButton>
  );
}
