import Box from "@mui/material/Box"
import logo from "../../assets/images/infollion_logo_200x100.png";
import ViewInvoice from "../../organisms/calls/view-invoice";
import { Invoice } from "../../organisms/calls/view-invoice/types";
import { useEffect, useState } from "react";
import FullPageLoading from "../../atoms/full-page-loading";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useSnackbar } from "notistack";
import { getInvoice } from "./helper";
import { SxProps, Theme } from "@mui/material";

const ViewInvoicePage = ({invoiceNo, sx = {}}: {invoiceNo?: string | null, sx?: SxProps<Theme>}) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const isMobile = useIsMobile();
    const invoice_no = useGetParams("uc") || invoiceNo || null;
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();


    useEffect(() => {
        getInvoice(invoice_no, setInvoice, setLoading, enqueueSnackbar);
    }, [invoice_no])


    return (
        <Box padding={isMobile ? "0.5em" : "1em 2em"} sx={{ bgcolor: "#f4f4f4", minHeight: "100vh" }}>
            <FullPageLoading />
            <Box sx={{
                bgcolor: "white",
                borderRadius: "15px",
                padding: "1rem",
                "& p": {
                    fontSize: isMobile ? "14px" : "initial"
                },
                overflowX: "auto",
                ...sx
            }}>
                {invoice &&
                    <ViewInvoice
                        invoice={invoice}
                    />
                }
            </Box>

        </Box>
    )
}

export default ViewInvoicePage