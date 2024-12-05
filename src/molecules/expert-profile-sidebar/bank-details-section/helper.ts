import SbiLogo from "../../../assets/images/expert/sbi_logo.png"
import UbiLogo from "../../../assets/images/expert/ubi_logo.png"
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";

export const bankData = [{
    logo: SbiLogo,
    bankName: "SBI",
    accountNo : "XXXXX74 8457",
    isPrimary: true,
},
{
    logo: SbiLogo,
    bankName: "SBI",
    accountNo : "XXXXX74 8457",
    isPrimary: false,
},
{
    logo: UbiLogo,
    bankName: "UBI",
    accountNo : "XXXXX74 8457",
    isPrimary: false,
},
]

export async function getbankDetails(id: string) {
  const response = await RequestServer(
    APIRoutes.bankDetails + "?fk_expert=" + id,
    "GET"
  );
  return response.data;
}

export function getFormattedBankName(bankDetail: any){
    if (bankDetail.country === "India"){
        const bankCode = bankDetail?.bank_details?.ifsc_code?.slice(0, 4) || ""
        return bankCode
    }

    else {
        if (bankDetail.bank_country_code){
            return bankDetail.bank_country_code
        }
        else{
            const swiftCode = bankDetail?.bank_details?.swift_code || ""
            return swiftCode;
        }
    }
}
export function getFormattedAccountNumber(bankDetail: any){
    const accountNumber = bankDetail?.bank_details?.account_number || "";
    return "xxxx" + accountNumber.slice(-4);    
}