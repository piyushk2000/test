import { createTheme } from "@mui/material/styles";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";
import { EnqueueSnackbar } from "notistack";

export const CustomFontTheme = createTheme({
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

export function getFormattedDetails(bankDetails: any, isPrimary: boolean) {
  let formattedDetails = [
    {
      label: "Country",
      value: bankDetails?.country,
    },
    {
      label: "Account Holder Name",
      value: bankDetails?.account_holder_name,
    },
    {
      label: "Account Holder Address",
      value: (bankDetails?.bank_details?.account_holder_address && bankDetails?.bank_details?.account_holder_residing_country) ? `${bankDetails?.bank_details?.account_holder_address}, ${bankDetails?.bank_details?.account_holder_residing_country}` : null
    },
    {
      label: "Bank Name",
      value: bankDetails?.bank_details?.bank_name,
    },
    {
      label: "Branch Address",
      value: bankDetails?.bank_details?.bank_address,
    },
    {
      label: "Account Number",
      value: bankDetails?.bank_details?.account_number,
    },
    {
      label: "IFSC Code",
      value: bankDetails?.bank_details?.ifsc_code,
    },
    {
      label: "Swift Code",
      value: bankDetails?.bank_details?.swift_code,
    },
    {
      label: "Pan Card No",
      value: bankDetails?.pan,
    },
    {
      label: "Routing Code",
      value: bankDetails?.bank_details?.routing_code,
    },
    {
      label: "Primary Account",
      value: isPrimary ? "Yes" : "No",
    },
    {
      label: "GSTIN",
      value: bankDetails?.gstin,
    },
    {
      label: "GST Name",
      value: bankDetails?.bank_details?.gst_name,
    },
    {
      label: "GST Address",
      value: bankDetails?.bank_details?.gst_address,
    },
    {
      label: "MSME Certificate",
      value: bankDetails?.bank_details?.msme_certificate,
    },
    {
      label: "Intermediary Bank Name",
      value:
        bankDetails?.bank_details?.intermediary_bank?.intermediary_bank_name,
    },
    {
      label: "Intermediary Bank Address",
      value:
        bankDetails?.bank_details?.intermediary_bank?.intermediary_bank_address,
    },
    {
      label: "Intermediary Bank Swift Code",
      value:
        bankDetails?.bank_details?.intermediary_bank
          ?.intermediary_bank_swift_code,
    },
    {
      label: "Intermediary Bank Account Number",
      value:
        bankDetails?.bank_details?.intermediary_bank
          ?.intermediary_bank_account_number,
    },
  ];

  return formattedDetails;
}

export async function setAsPrimary(id: string) {
  const response = await RequestServer(APIRoutes.setPrimary, "POST", {
    id: id,
    action: "SetAsPrimary",
  });
  return response;
}

type BankDetails = {
  gst_name?: string;
  bank_name: string;
  ifsc_code?: string;
  gst_address?: string;
  bank_address: string;
  account_number: string;
};

type IntermediaryBankDetails = {
  intermediary_bank_name: string;
  intermediary_bank_address: string;
  intermediary_bank_swift_code: string;
  intermediary_bank_account_number: string;
};

type ExpertBankInfo = {
  id: number;
  fk_expert: number;
  country: string;
  bank_country_code: string;
  bank_details: BankDetails & {
    iban?: string;
    swift_code?: string;
    intermediary_bank?: IntermediaryBankDetails;
    routing_code?: string;
    canadian_code?: string;
    account_holder_address?: string;
    account_holder_residing_country?: string;
    reason_for_different_country?: string;
    registered_under_msme_act?: number,
    msme_certificate?: string,
    itr_ack?: {
      previous_year: string,
      two_years_ago: string
    }
  };
  gstin: string | null;
  pan: string | null;
  account_holder_name: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  reason_for_different_country?: string;
  account_holder_residing_country?: string;
};

export function getbankDetails(
  detail: ExpertBankInfo | null,
  isPrimary: boolean
) {
  if (!detail) {
    return null;
  }

  const defaultValue: any =  {
    id: detail.id,
    bank_country: detail.country,
    ifsc_code: detail.bank_details.ifsc_code || "",
    bank_name: detail.bank_details.bank_name || "",
    bank_address: detail.bank_details.bank_address || "",
    holder_name: detail.account_holder_name || "",
    pan_number: detail.pan || "",
    account_number: detail.bank_details.account_number || "",
    is_primary: isPrimary || false,
    is_gstin: !!detail?.gstin,
    gstin: detail?.gstin || "",
    gst_name: detail.bank_details?.gst_name || "",
    gst_address: detail.bank_details.gst_address || "",
    add_intermediatry:
      !!detail?.bank_details?.intermediary_bank
        ?.intermediary_bank_account_number,
    intermediary_bank_name:
      detail?.bank_details?.intermediary_bank?.intermediary_bank_name || "",
    intermediary_bank_address:
      detail?.bank_details?.intermediary_bank?.intermediary_bank_address || "",
    intermediary_bank_swift_code:
      detail?.bank_details?.intermediary_bank?.intermediary_bank_swift_code ||
      "",
    intermediary_bank_account_number:
      detail?.bank_details?.intermediary_bank
        ?.intermediary_bank_account_number || "",
    swift_code: detail?.bank_details.swift_code || "",
    routing_code: detail?.bank_details?.routing_code || "",
    account_holder_address: detail?.bank_details?.account_holder_address || "",
    account_holder_country:
      detail?.bank_details?.account_holder_residing_country || "",
    reason_for_different_country:
      detail?.bank_details?.reason_for_different_country || "",
    iban: detail?.bank_details?.iban || "",
    canada_code: detail?.bank_details?.canadian_code || "",
    bank_country_code: detail?.bank_country_code || "",
  };

  if (detail.bank_details.registered_under_msme_act === 1) {
    defaultValue.msme = "yes"
  } else {
    defaultValue.msme = "no"
  }

  if (detail.bank_details.itr_ack) {
    defaultValue.itr = "yes";
    defaultValue.itr_2years_ago = detail.bank_details.itr_ack.two_years_ago;
    defaultValue.itr_previous_year = detail.bank_details.itr_ack.previous_year;
  } else {
    defaultValue.itr = "no"
  }

  return defaultValue;
}

export async function deleteBankDetails(
  bank_details: any,
  enqueueSnackbar: EnqueueSnackbar,
  refetch: () => void,
  closeDialog: () => void
) {
  try {
    const id = bank_details.id;

    if (bank_details.is_primary) {
      enqueueSnackbar(
        "Deletion of bank details is restricted as it serves as the primary account.",
        {
          variant: "warning",
        }
      );
      return;
    }

    const response = await RequestServer(
      APIRoutes.bankDetails + "?id=" + id,
      "DELETE",
      bank_details
    );

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      await refetch();
      closeDialog();
    } else {
      enqueueSnackbar(response.message || response.error || "Something Went Wrong", {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
