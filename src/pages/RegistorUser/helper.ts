import { EnqueueSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";

type successResponse = {
  message: string;
  success:boolean;
  already_regsitered_user?:boolean;
  data?:any;
  shared_link?: string;
};


type errorResponse = {
  error: string;
};

type responseType = successResponse | errorResponse;

export const getOtp = async (
  salutation: any, firstname: string,lastname: string ,isd_code: { label: string; value: string; } | null, mobile: string, email: string,
  enqueueSnackbar: EnqueueSnackbar,
  setRecurringUser?: (value:boolean) => void
): Promise<boolean> => {
  const user = {
    "salutation": salutation?.value,
    "name": `${firstname} ${lastname}`,
    "email": email,
    "mobile": `${isd_code?.value} ${mobile}`
  };

  try {
    const response: responseType = await RequestServer(
      APIRoutes.registorUser,
      "POST",
      user
    );

    if(setRecurringUser){
      if("already_registered_user" in response && response?.already_registered_user === true){
        setRecurringUser(true)
      }else{
        setRecurringUser(false)
      }
    }

    if ("message" in response) {    
      const successResponse = response as successResponse;
      if (successResponse.success) {
        enqueueSnackbar(successResponse.message, {
          variant: "success",
        });
        return true;
      } else {
        enqueueSnackbar(successResponse.message, {
          variant: "warning",
        });
        return false;
      }
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


export const sendOtp = async (
  otp: string, email: string,
  enqueueSnackbar: EnqueueSnackbar
): Promise<any> => {
  const user = {
    "action" : "SelfRegister",
    "otp": otp,
    "email": email
  };

  try {
    const response: responseType = await RequestServer(
      APIRoutes.verifyOtp,
      "POST",
      user
    );

    if ("message" in response) {
      const successResponse = response as successResponse;
      if (successResponse.shared_link) {
        enqueueSnackbar(successResponse.message, {
          variant: "success",
        });
        return { success: true, link: successResponse.shared_link };
      } else {
        enqueueSnackbar(successResponse.message, {
          variant: "warning",
        });
        return { success: false, link: "" };
      }
    } else {
      const errorResponse = response as errorResponse;
      enqueueSnackbar(errorResponse.error, {
        variant: "warning",
      });
      return { success: false, link: "" };
    }
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.error);
    return { success: false, link: "" };
  }
};

export type RegisterFormTypes = {
  name_salutations: any;
  firstname: string;
  lastname: string;
  isd_code: { label: string; value: string } | null;
  mobile_number: string;
  email: string;
  otp: string;
};


export const RegisterFormDefault: RegisterFormTypes = {
  name_salutations: null,
  firstname:"",
  lastname:"",
  isd_code: null,
  mobile_number: "",
  email: "",
  otp: ""
};