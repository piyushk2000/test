import { Dispatch, SetStateAction } from "react";

export type LoginFormState = { email: string; password: string };

export type SetLoginFormState = Dispatch<SetStateAction<LoginFormState>>;

export type OtpFormState = { email: string; otp: string };

export type SetOtpFormState = Dispatch<SetStateAction<OtpFormState>>;

export type OtpState = {
  sent: boolean;
  startTimer: boolean;
  counter: number;
};

export type SetOtpState = Dispatch<SetStateAction<OtpState>>;

export type ResetResponseType = { message: string; code?: number; data?: null };
