import { EnqueueSnackbar } from "notistack";
import { getUserId } from "./role";
import { RequestServer } from "./services";
import { APIRoutes } from "../constants";

export const settingsConfigTypeOptions = {
    ExpertsTabDefaultColumns: "ExpertsTabDefaultColumns",
    ExpertsTabDefaultView: "ExpertsTabDefaultView"
}
export const settingsConfigTypeOptionsCalls = {
    CallTabDefaultColumns: "CallTabDefaultColumns",
}

const successMessages: Record<string,string> = {
    ExpertsTabDefaultColumns: "Experts Table View Successfully Saved",
    CallTabDefaultColumns: "Call Table View Successfully Saved",
    ExpertsTabDefaultView: "Experts Default View Saved"
}

export async function changeSettings(config_type: string, config_value: Record<string,any>, enqueueSnackbar: EnqueueSnackbar, setLoading: (loading: boolean) => void) {
    try {
        const fk_user = getUserId();

        if(!fk_user) {
            enqueueSnackbar("User ID not found", {
                variant: "warning"
            });
            return;
        }


        const payload = {
            fk_user,
            config_type,
            config_value
        }

        const response = await RequestServer(APIRoutes.SETTINGS,"POST", payload);

        setLoading(true);
        if(response.success) {
            localStorage.setItem("user_settings", JSON.stringify(response.data));
            enqueueSnackbar(successMessages[config_type], {
                variant: "success"
            })
        } else {
            console.log({response});
            enqueueSnackbar(response.message, {
                variant: "warning"
            })
        }

    } catch(err: any) {
        enqueueSnackbar(err.toString() ?? "Error Occured", {
            variant: "warning"
        })
        console.log(err);
    } finally {
        setLoading(false);
    }
}