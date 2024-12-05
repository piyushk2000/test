import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";

export const defaultValues = {
  doc_type: "",
  url: "",
  other_doc: "",
};

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
  sx: { background: "white" },
};

export const docType = [
  { label: "PAN Card", value: "PAN Card" },
  { label: "GST Certificate", value: "GST Certificate" },
  { label: "Cancelled Cheque", value: "Cancelled Cheque" },
  { label: "No PE Certificate", value: "no_pe_certificate" },
  { label: "Other", value: "Other" },
];

export async function addDocument(
  docType: String,
  url: string,
  expertId: string
) {
  const payload = {
    doc_type: docType,
    url: url,
    table: "experts",
    fk_id: expertId,
  };

  try {
    const response = await RequestServer(APIRoutes.documents, "POST", payload);
    return response;
  } catch (err) {
    console.log(err);
  }
}
