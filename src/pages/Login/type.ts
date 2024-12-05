import { Dispatch, SetStateAction } from "react";
import {
  OtpFormState,
  OtpState,
  SetOtpFormState,
  SetOtpState,
} from "../../organisms/login/type";

export type IsForgetPass = {
  clicked: boolean;
  submit: boolean;
};

export type SetForgetPass = Dispatch<SetStateAction<IsForgetPass>>;

export type LoginContextType = {
  otp: OtpState;
  setOtp: SetOtpState;
  formValues: OtpFormState;
  setFormValues: SetOtpFormState;
};
