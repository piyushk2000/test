import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import axios from "axios";


export type BankDetailsContext = {
  controller: any,
  setController: React.Dispatch<React.SetStateAction<any>>,
  msmeFileUrl: string,
  setMsmeUrl: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const emptyDefaultValues = {
  bank_country: "",
  ifsc_code: "",
  bank_name: "",
  bank_address: "",
  holder_name: "",
  pan_number: "",
  account_number: "",
  is_primary: false,
  is_gstin: false,
  gstin: "",
  gst_name: "",
  gst_address: "",
  add_intermediatry: false,
  intermediary_bank_name: "",
  intermediary_bank_address: "",
  intermediary_bank_swift_code: "",
  intermediary_bank_account_number: "",
  swift_code: "",
  routing_code: "",
  account_holder_address: "",
  account_holder_country: "",
  reason_for_different_country: "",
  iban: "",
  canada_code: "",
  bank_country_code: "",
  // itr: "",
  msme: "",
  // itr_2years_ago: "",
  // itr_previous_year: ""
};

export const msme_options = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
  sx: { background: "white" },
};

export const BankCountry = [
  { label: "India", value: "India" },
  { label: "US", value: "US" },
];

export function isValid_IFSC_Code(ifsc_Code: string) {
  let regex = new RegExp(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/);

  if (ifsc_Code == null) {
    return false;
  }

  if (regex.test(ifsc_Code) === true) {
    return true;
  } else {
    return false;
  }
}

export async function searchIFSC(searchTerm: string) {
  const data = await axios.get("https://ifsc.razorpay.com/" + searchTerm);
  return data;
}

export const submitIndiaForm = async (
  formData: any,
  id?: number,
  isEdit?: boolean,
  bank_id?: string,
  msmeFileUrl?: string
) => {
  let payload: any = {
    is_primary: formData.is_primary,
    account_holder_name: formData.holder_name,
    account_number: formData.account_number,
    ifsc_code: (formData.ifsc_code as string).toLocaleUpperCase(),
    fk_expert: id,
    bank_name: formData.bank_name,
    bank_address: formData.bank_address,
    bank_country: formData.bank_country,
    pan: (formData.pan_number as string).toLocaleUpperCase(),
    bank_country_code: formData.bank_country_code,
    registered_under_msme_act: formData.msme === "yes" ? 1 : 0,
    account_holder_address: formData.account_holder_address,
    account_holder_residing_country: formData.account_holder_country
    // is_itr_ack: formData.itr === 0
  };

  if (formData.is_gstin) {
    payload = {
      ...payload,
      gstin: formData?.gstin,
      gst_name: formData.gst_name,
      gst_address: formData.gst_address,
    };
  } else {
    payload = {
      ...payload,
      gstin: null,
      gst_name: null,
      gst_address: null,
    }
  }

  if (formData.msme === "yes" && msmeFileUrl) {
    payload.msme_certificate = msmeFileUrl;
  }

  // if (formData.itr === "yes") {
  //   payload.itr_ack = {
  //     two_years_ago: formData.itr_2years_ago,
  //     previous_year: formData.itr_previous_year
  //   }
  // }

  // If Edit Form is Opened, Bank Details ID is neccessary
  if (isEdit && bank_id) {
    payload = {
      ...payload,
      id: bank_id,
    };
  }

  const method = isEdit ? "PATCH" : "POST";
  const response = await RequestServer(APIRoutes.bankDetails, method, payload);
  return response;
};

export const submitUsForm = async (
  formData: any,
  id?: number,
  isEdit?: boolean,
  bank_id?: string
) => {
  let payload: Object = {
    is_primary: formData.is_primary,
    account_holder_name: formData.holder_name,
    account_number: formData.account_number,
    fk_expert: id,
    bank_name: formData.bank_name,
    bank_address: formData.bank_address,
    bank_country: formData.bank_country,
    account_holder_address: formData.account_holder_address,
    account_holder_residing_country: formData.account_holder_country,
    swift_code: (formData.swift_code as string).toLocaleUpperCase(),
    bank_country_code: formData.bank_country_code,
  };

  if (formData.bank_country !== formData.account_holder_country) {
    payload = {
      ...payload,
      is_different_country: true,
      reason_for_different_country: formData.reason_for_different_country,
    };
  } else {
    payload = {
      ...payload,
      is_different_country: false,
    };
  }

  if (formData.bank_country === "United States") {
    payload = {
      ...payload,
      routing_code: formData.routing_code,
    };
  } else if (formData.bank_country === "Canada") {
    payload = {
      ...payload,
      canadian_code: formData.canada_code,
    };
  } else {
    if (formData.iban) {
      payload = {
        ...payload,
        iban: formData.iban,
      };
    }
  }

  if (formData.add_intermediatry) {
    payload = {
      ...payload,
      intermediary_bank: {
        intermediary_bank_name: formData.intermediary_bank_name,
        intermediary_bank_address: formData.intermediary_bank_address,
        intermediary_bank_swift_code: formData.intermediary_bank_swift_code,
        intermediary_bank_account_number:
          formData.intermediary_bank_account_number,
      },
    };
  }

  // If Edit Form is Opened, Bank Details ID is neccessary
  if (isEdit && bank_id) {
    payload = {
      ...payload,
      id: bank_id,
    };
  }

  const method = isEdit ? "PATCH" : "POST";
  const response = await RequestServer(APIRoutes.bankDetails, method, payload);
  return response;
};

export interface CountryData {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
}

export function getBankCountryCode(data: CountryData[], country: string) {
  if (!data) return "";
  const result = data.find((item) => item.name === country);
  if (!result) return "";

  return result.iso3;
}
