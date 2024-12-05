import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../../../constants";
import { RequestServer } from "../../../../../utils/services";
import { PeComplianceData } from "../../type";
import { FormatToLVCommon, formatToLV } from "../../../../../common/formatData";

type ClientContactResponse = {
    success: boolean;
    message: string;
    data: Data[];
}

type Data = {
    user_id: number;
    name: string;
    is_compliance_officer: boolean;
}

export const GetComplianceOfficers = async (pe_compliance: PeComplianceData, setOptions: Dispatch<SetStateAction<Array<{label: string,value: number}> | null>>) => {
    try {
        const fk_client = pe_compliance.fk_client;

        const response: ClientContactResponse = await RequestServer(`${APIRoutes.clientContactUrl}?fkClient=${fk_client}&show_columns=user_id,name,is_compliance_officer`,"GET");

        const data = response.data.filter(d => d.is_compliance_officer);

        setOptions(FormatToLVCommon(data,"name","user_id"));

    } catch(error) {
        console.log(error);
    }
}