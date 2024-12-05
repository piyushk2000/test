import { Dispatch, SetStateAction } from "react";
import { Group } from "../../admin/types";
import { AccountManagersResponse, ClientAMResponse, FormData, ResponseData } from "./type";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../../utils/role";
import { FormatToLVCommon } from "../../../common/formatData";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { labelValueType } from "../../client/all-clients/types";
import { Filters } from "../types";

export const getFormOptions = async (
    groupData: Group[] | null,
    setFormOptions: Dispatch<SetStateAction<FormData>>
) => {
    let group: any[] = [];
    let am: any[] = [];
    let client: any[] = [];
    let client_am: any[] = [];

    try {
        if (isSuperAdmin()) {

            // GROUPS ------------------ //

            if (groupData) {
                group = FormatToLVCommon(groupData, "label", "id");
            } else {
                const all_groups = await getGroups();
                group = FormatToLVCommon<Group, "label", "id">(all_groups, "label", "id");
            }

            // ------------------------ //

            // AM --------------------- //

            am = await getAMs();

            // ------------------------ //
        }

        if (isAdmin()) {
            const admin_groups = await getGroups();
            console.log({admin_groups});
            group = FormatToLVCommon<Group, "label", "id">(admin_groups, "label", "id");
        }


        if (isClient()) {
            client_am = await getClientAMs();
        }

        setFormOptions((prev) => ({
            ...prev,
            client: client,
            am: am,
            group: group,
            filtered_am: am,
            filtered_client: client,
            client_filter_am: client_am
        }))
    } catch (err) {
        console.log(err);
    }
}

export const getGroups = async () => {
    try {
        const response = await RequestServer(APIRoutes.groupsMappedToMe, "GET");
        return response.data || [];
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getAMs = async (fk_group?: string) => {
    try {

        // avoid calling the api if fk_group is not given in case of admin
        if (isAdmin() && !fk_group) {
            return [];
        }

        const url = APIRoutes.getAccountManager + (fk_group ? "?in___fk_group=" + fk_group : "");

        const response: AccountManagersResponse = await RequestServer(url, "GET");

        if (response.success) {
            return response.data.map(am => ({
                label: am.account_manager_value.name,
                value: am.account_manager_value.id
            }))
        } else {
            return [];
        }

    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getClientAMs = async () => {
    try {
        const url = APIRoutes.getCallsAM;

        const response: ClientAMResponse = await RequestServer(url, "GET");

        if (response.success) {
            return response.data.account_managers.map(am => ({
                label: am.name,
                value: am.id
            }))
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
        return [];
    }
}


export const getClientValues = async (clients: string | null, setClientValues: Dispatch<SetStateAction<labelValueType[] | null>>) => {

    if (!clients) {
        setClientValues([]);
        return;
    }

    try {
        const response: ResponseData = await RequestServer(APIRoutes.clientContactUrl + "?in___id=" + clients, "GET");
        
        if (response.success) {
            setClientValues(() => FormatToLVCommon(response.data,"name","id"))
        }

    } catch (err) {
        console.log(err);
    }
}

export const handleSubmit = (newChecked: number[], setFilters: React.Dispatch<React.SetStateAction<Filters>>) => {
    const isClientOrExpert = isClient() || isExpert();
        const status: string[] = [];

        if (isClientOrExpert) {
            for (let idx of newChecked) {
                switch (idx) {
                    case 0: {
                        status.push("Logged")
                        break;
                    }
                    case 1: {
                        status.push("Pending,Scheduled")
                        break;
                    }
                    default: break;
                }
            }

        } else {
            for (let idx of newChecked) {
                switch (idx) {
                    case 0: {
                        status.push("Logged")
                        break;
                    }
                    case 1: {
                        status.push("Pending")
                        break;
                    }
                    case 2: {
                        status.push("Scheduled")
                        break;
                    }
                }
            }
        }

        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                status: status.join(",")
            }
        }))
    }