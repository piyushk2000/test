import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "./loading";
import { useBoolean } from "../utils/hooks/useBoolean";
import { LoadingContext } from "./loading/context";
import { SxProps, Theme } from "@mui/material";
import { useIsMobile } from "../utils/hooks/useIsMobile";

type props = {
  isOpen: boolean;
  handleClose: any;
  title: any;
  children: any;
  loading?: boolean;
  dialogSx?: SxProps<Theme> | undefined,
  contentSx?: SxProps<Theme> | undefined,
  titleSx?: SxProps<Theme> | undefined,
  TitleEl?: JSX.Element;
  isFullScreen?: boolean;
};

const DialogModal = ({ isOpen, handleClose, title, children, loading, dialogSx = {}, contentSx = {}, titleSx = {}, TitleEl = <></>, isFullScreen = false }: props) => {
  const { value: contextLoading, setValue: setLoading } = useBoolean();
  const isMobile = useIsMobile();
  return (
    <LoadingContext.Provider value={{ loading: contextLoading, setLoading }}>
      <Dialog
        maxWidth={"xs"}
        style={{ maxWidth: "none" }}
        className={isFullScreen ? "" : "add-project-modal"}
        open={isOpen}
        onClose={handleClose}
        sx={dialogSx}
        fullScreen={isFullScreen || isMobile}
      >
        <Loading loading={!!loading || contextLoading} />
        <DialogTitle sx={{
          ...titleSx, paddingLeft: "24px !important",
          '@media print': {
            display: 'none', // Hide the button when printing
          },
        }} className="dialog-header px-8 py-5">
          <Grid container>
            <Grid className="dialog-title-span" item xs={11} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0" }}>
              <p>{title}</p>
              {TitleEl}
            </Grid>
            <Grid className="dialog-title-close-btn" item xs={1}>
              <CloseIcon onClick={handleClose} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={contentSx} className="add-project-modal-content">
          {children}
        </DialogContent>
      </Dialog>
    </LoadingContext.Provider >
  );
};

export default DialogModal;
