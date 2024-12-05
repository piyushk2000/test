import { EnqueueSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";

type successResponse = {
  message: string;
};

type errorResponse = {
  error: string;
};

type responseType = successResponse | errorResponse;

export const sendOtp = async (
  username: string,
  enqueueSnackbar: EnqueueSnackbar
): Promise<boolean> => {
  const user = {
    username: username,
  };

  try {
    const response: responseType = await RequestServer(
      APIRoutes.sendUserOtp,
      "POST",
      user
    );

    if ("message" in response) {
      const successResponse = response as successResponse;
      enqueueSnackbar(successResponse.message, {
        variant: "success",
      });
      return true;
    } else {
      const errorResponse = response as errorResponse;
      enqueueSnackbar(errorResponse.error, {
        variant: "warning",
      });
      return false;
    }
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.error);
    return false;
  }
};
