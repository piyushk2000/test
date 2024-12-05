import { EnqueueSnackbar } from "notistack";
import { APIRoutes } from "../../../../constants";
import { RequestServer } from "../../../../utils/services";

export const activateAdmin = async (id: string, name: string, enqueueSnackbar: EnqueueSnackbar, handleSubmitClose: () => void, setLoading: (b: boolean) => void) => {

    const payload = {
        action: "ActivateUser",
        id
    }

    setLoading(true);
    try {
        const response = await RequestServer(APIRoutes.users, "PATCH", payload);

        if (response.success) {
            enqueueSnackbar("Admin: " + name + " is successfully Activated");
            handleSubmitClose();
        } else {
            console.log({ response });
            if (response.error) {
                enqueueSnackbar(response?.error, { variant: "warning" });
            }
            if (response?.message) {
                enqueueSnackbar(response?.message?.toString(), {
                    variant: "warning",
                });
            }
        }

    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
}