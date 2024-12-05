import { ThemeProvider, createTheme } from "@mui/material/styles";
import BankDetailsForm from "./add-bank-form";
import { useBoolean } from "../../utils/hooks/useBoolean";
import DialogModal from "../../atoms/dialog";
import Loading from "../../atoms/loading";
import { useState } from "react";
import { BankContext } from "./context";

const CustomFontTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});


type Props = {
  open: boolean;
  closeDialog: () => void;
  refresh: () => void;
  isEdit?: boolean;
  formDefaultValues?: any;
  showMainPageValue?: boolean;
  msmeUrl?: string;
}

export default function BankDetailsFormModal({ open, closeDialog, refresh, isEdit, formDefaultValues, showMainPageValue, msmeUrl }: Props) {
  const { value: loading, setValue: setLoading } = useBoolean();
  const [msmeFileUrl, setMsmeUrl] = useState(msmeUrl || ""); // when bank in india, this is the url when user upload its msme certificate
  const [controller, setController] = useState<any>({
    control: null,
    for: "",
    setSelectedFile: null,
  }); // abort controller

  return (
    <ThemeProvider theme={CustomFontTheme}>
      <DialogModal
        isOpen={open}
        handleClose={closeDialog}
        title={isEdit ? "Edit Bank Details" : "Add New Bank Details"}
      >
        <BankContext.Provider
          value={{
            controller,
            setController,
            msmeFileUrl,
            setMsmeUrl,
            setLoading
          }}
        >
          <Loading loading={loading} controller={controller} />
          <BankDetailsForm
            refresh={refresh}
            handleClose={closeDialog}
            setLoading={setLoading}
            isEdit={!!isEdit}
            formDefaultValues={formDefaultValues}
            showMainPageValue={showMainPageValue}
          />
        </BankContext.Provider>
      </DialogModal>
    </ThemeProvider>
  );
}