import { APIRoutes } from "../../../constants";
import { Select, SelectedCards } from "../../../pages/Calls/types";
import { RequestServer } from "../../../utils/services";
import { LocalDayjs } from "../../../utils/timezoneService";
import { PrimaryBankValue } from "../../project/project-pe-mapping/actions/share-profile/email-format-dialog/types";
import { Invoice, SetViewInvoice } from "../view-invoice/types";

export async function getInvoice(
  expert_id: string | null,
  selectedCards: SelectedCards[],
  setViewInvoice: SetViewInvoice,
  bankDetails: PrimaryBankValue | null,
  setLoading: (l: boolean) => void
) {
  if (!expert_id || !bankDetails) {
    return null;
  } 

  let invoice_no;

  try {
    setLoading(true);
    invoice_no = await getInvoiceNumber(expert_id);
  } catch(err) {
    console.log(err);
  } finally {
    setLoading(false);
  }

  let invoice: Invoice | null = null;
  const callDetails = selectedCards[0];

  const isDomestic = callDetails.fk_expert_value.primary_bank_value?.bank_country_code === "IND";

  const total_amount = `${
    isDomestic ? "INR" : selectedCards[0].cost_price_currency
  } ${selectedCards
    .map((call) => ((isDomestic ? (call.cost_price * call.exchange_rate_payable) : call.cost_price) * call.payable_mins) / 60)
    .reduce((total, current) => total + current, 0)
    .toFixed(2)}`;

  invoice = {
    invoice_no,
    invoice_date: LocalDayjs().format("DD MMM, YYYY"),
    expert_name: bankDetails.account_holder_name,
    expert_address: [bankDetails.bank_details.account_holder_address,bankDetails.bank_details.account_holder_residing_country].filter(d => !!d).join(", "),
    expert_email: callDetails.fk_expert_value.primary_email,
    expert_phone: callDetails.fk_expert_value.primary_mobile,
    billed_to: {
      name: "Infollion Research Services Ltd.",
      address:
        "3rd Floor, Tower B, Unitech Cyberpark, Sector 39, Gurugram, Haryana 122003",
      email: "",
    },
    subtotal: total_amount,
    total_amount: total_amount,
    tax: 0,
    currency: isDomestic ? "INR" : selectedCards[0].cost_price_currency,
    bank_account_details: bankDetails,
    line_items: selectedCards.map((call) => ({
      call_id: call.id,
      call_title: call.title,
      cost_price_currency: isDomestic ? "INR" : call.cost_price_currency,
      cost_price_per_hour: isDomestic ? (call.cost_price * call.exchange_rate_payable) : call.cost_price,
      call_start_time: call.call_start_time,
      payable_mins: call.payable_mins,
      total: `${isDomestic ? "INR" : call.cost_price_currency} ${(
        ((isDomestic ? (call.cost_price * call.exchange_rate_payable) : call.cost_price) * call.payable_mins) /
        60
      ).toFixed(2)}`,
    })),
  };

  setViewInvoice(invoice);
}

async function getInvoiceNumber(expert_id: string | number) {
  try {
    const response = await RequestServer(APIRoutes.getInvoiceNum + "?fk_expert=" + expert_id,"GET");

    if(response.success) {
      return response.data.invoice_num;
    } else {
      return null;
    }
  } catch(err) {
    console.log(err);
  }
}
