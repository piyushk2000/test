import { EnqueueSnackbar } from "notistack";
import { Invoice } from "../../organisms/calls/view-invoice/types";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";

export const getInvoice = async (
  invoice_no: string | null,
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>,
  setLoading: (loading: boolean) => void,
  enqueueSnackbar: EnqueueSnackbar
) => {
  if (!invoice_no) {
    enqueueSnackbar("Invoice number missing", {
      variant: "warning",
    });
    return;
  }

  setLoading(true);

  try {
    const response = await RequestServer(
      APIRoutes.meta + "?unique_code=" + invoice_no,
      "GET"
    );

    if (response.success) {
      setInvoice(response.data.meta);
    } else {
      console.log({ response });
      enqueueSnackbar(response.message || "Something Went Wrong", {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
