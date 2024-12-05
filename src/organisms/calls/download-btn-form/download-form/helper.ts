import { HOSTURL_LOCAL } from "../../../../utils/services"

export const vendorsFormat = (formData: any, dateUrl: string, isDomestic: boolean) => {
    const data_key = isDomestic ? "data.domestic" : "data.international";
    const sheet_title = isDomestic ? "Domestic" : "International";

    return {
        sheet_title,
        apiUrl: HOSTURL_LOCAL + "/plan/call/reports?type=Vendors&limit=" + (formData.no_of_records.value || 5000) + (dateUrl || ""),
        data_key,
        hideExcelHeader: true,
        keyTitles: {
            expert_id: "Expert ID",
            expert_name: "Expert Name",
            vendor_name: "Vendor Name",
            account_holder_name: "Account Holder Name",
            email_id: "Email ID",
            tds_name: "TDS Name",
            tds_section: "TDS Section",
            tds_rate: "TDS Rate",
            currency_code: "Currency Code",
            notes: "Notes",
            gst_treatment: "GST Treatment",
            gstn: "GSTN",
            pan: "PAN",
            msme_udyam_no: "MSME/Udyam No",
            msme_udyam_type: "MSME/Udyam Type",
            ...(isDomestic ? {exchange_rate: "Exchange Rate"} : {}),
            beneficiary_name: "Beneficiary Name",
            bank_account_no: "Bank Account Number",
            bank_name: "Bank Name",
            ifsc_code: "IFSC",
            ...(isDomestic ? {} : {no_pe_certificate: "PE Certificate"})
        }
    }
}

export const panVerifyFormat = () => {

    return {
        sheet_title: "Payment Requested",
        apiUrl: HOSTURL_LOCAL + "/plan/call/reports?type=Pan",
        data_key: "data",
        hideExcelHeader: true,
        keyTitles: {
            expert_id: "Expert ID",
            call_ids: "Call IDs",
            account_holder_name: "Account Holder Name",
            pan_card: "Pan Card"
        }
    }
}

export const billsFormat = (formData: any, dateUrl: string | null, isDomestic: boolean) => {
    const data_key = isDomestic ? "data.domestic" : "data.international";
    const sheet_title = isDomestic ? "Domestic" : "International";

    return {
        sheet_title,
        apiUrl: HOSTURL_LOCAL + "/plan/call/reports?type=Bills&limit=" + (formData.no_of_records.value || 5000) + (dateUrl || ""),
        data_key,
        hideExcelHeader: true,
        keyTitles: {
            "bill_date": "Bill Date",
            "invoice_num": "Invoice Number",
            "order_number": "Order Number",
            "gst_treatment": "GST Treatment",
            "gstin": "GST Identification Number (GSTIN)",
            "is_inclusive_tax": "Is Inclusive Tax",
            'tax_name': "Tax Name",
            'tax_percentage': "Tax Percentage",
            "tax_type": "Tax Type",
            "status": "Status",
            "template": "Template",
            "tds_percentage": "TDS Percentage",
            "tds_amount": "TDS Amount",
            "tds_section_code": "TDS Section Code",
            "tds_name": "TDS Name",
            "expert_id": "Expert ID",
            "expert_name": "Expert Name",
            "vendor_name": "Vendor Name",
            "currency_code": "Currency Code",
            "exchange_rate": "Exchange Rate",
            "item_name": "Item Name",
            "item_description": "Item Description",
            "account": "Account",
            "quantity": "Quantity",
            "rate": "Rate",
            "due_date": "Due Date",
            "item_type": "Item Type",
            ...(isDomestic ? {} : {no_pe_certificate: "PE Certificate"})
        }
    }
}