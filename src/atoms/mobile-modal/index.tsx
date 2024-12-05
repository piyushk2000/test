import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

type Props = {
  onClose: () => void;
  children: JSX.Element;
};

export default function MobileModal({ onClose, children }: Props) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ p: "3rem 0.5rem" }}>{children}</Box>
    </Modal>
  ) : (
    children
  );
}
