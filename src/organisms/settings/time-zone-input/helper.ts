import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";

export const setTimeZone = async (
  timezone: string,
  enqueueSnackbar: any,
  setTimeZone: (t: string) => void
) => {
  const payload = {
    action: "ChangeTimezone",
    timezone
  };

  const response = await RequestServer(APIRoutes.users, "PATCH", payload);
  if (response.success) {
    setTimeZone(timezone) 
    enqueueSnackbar("Timezone updated", {
      variant: "success",
    });
  }
};
