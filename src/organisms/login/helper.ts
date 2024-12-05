import { APIRoutes, AppRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { Location, NavigateFunction } from "react-router-dom";
import { EnqueueSnackbar } from "notistack";
import { isExpert, isFinance } from "../../utils/role";

export const sendForgetPassLink = async (
  email: string | undefined,
  setForgetPass: () => void,
  setSubmitted: (loading: boolean) => void,
  enqueueSnackbar: EnqueueSnackbar,
  showSuccessMsg?: boolean
) => {
  if (!email) {
    return;
  }

  const payload = {
    user_email: email,
  };

  try {
    const response = await RequestServer(
      APIRoutes.forgotPassword,
      "PATCH",
      payload
    );

    if (response.success) {
      setForgetPass();
      if (showSuccessMsg) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      }
    } else {
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.error);
  } finally {
    setSubmitted(false);
  }
};

export const loginUser = async (
  payload: { username?: string; password?: string; otp?: string },
  location: Location,
  navigate: NavigateFunction,
  setSubmitted: (loading: boolean) => void,
  enqueueSnackbar: EnqueueSnackbar,
  config?: {
    disableDefaultRedirect?: boolean;
    disableSuccessMessage?: boolean;
    handleLoginFailure?: () => void;
  }
) => {
  setSubmitted(true);
  try {
    const response: any = await RequestServer(
      APIRoutes.userLogin,
      "POST",
      payload
    );

    if (response.message === "Login successful!") {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("authToken", response?.token);
      localStorage.setItem("name", response?.user?.name);
      localStorage.setItem("id", response?.user?.id);
      localStorage.setItem("role", response?.user?.role);
      localStorage.setItem("expert_id", response?.user?.expert?.id);
      localStorage.setItem("is_compliance_officer",response?.user?.client_contact?.is_compliance_officer);
      localStorage.setItem("email", response?.user?.email);
      localStorage.setItem("user", JSON.stringify(response?.user));
      localStorage.setItem("user_settings", JSON.stringify(response?.user?.user_settings));

      if (response?.user?.role === "CUSTOMER") {
        localStorage.setItem(
          "client_id",
          response?.user?.client_contact?.fkClient
        );
      }
      if (response?.user?.timezone) {
        localStorage.setItem(
          "timezone",
          JSON.stringify(response?.user?.timezone)
        );
      }

      if (!config?.disableSuccessMessage) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      }
        RedirectAfterLogin(location, response?.token, navigate, {
          disableDefaultRedirect: config?.disableDefaultRedirect,
        });
        
      return response;
    } else {
      console.log(response);
      if (config?.handleLoginFailure) {
        config.handleLoginFailure();
      }
      enqueueSnackbar(
        response?.message || response?.error || "something went wrong",
        {
          variant: "error",
        }
      );
    }
  } catch (err: any) {
    console.log(err);
    if (config?.handleLoginFailure) {
      config.handleLoginFailure();
    }
    enqueueSnackbar(err, {
      variant: "error",
    });
  } finally {
    setSubmitted(false);
  }
};

export function RedirectAfterLogin(
  location: Location,
  token: string,
  navigate: NavigateFunction,
  config?: {
    disableDefaultRedirect?: boolean;
  }
) {
  const queryParams = new URLSearchParams(location.search);
  let redirect_url = window.location.href.split("redirect_url=")[1];
  const append_token = queryParams.get("append_token");

  if (redirect_url && redirect_url !== "/") {
    if (append_token === "1") {
      if (redirect_url.includes("?")) {
        redirect_url += `&complianceToken=${token}`;
      } else {
        redirect_url += `?complianceToken=${token}`;
      }
    }
    // console.log()
    if (redirect_url?.includes("http")) {
      window.open(redirect_url, "_self", "noopener,noreferrer");
    } else {
      navigate(redirect_url);
    }
  } else if (!config?.disableDefaultRedirect) {
    const expert_id = localStorage.getItem("expert_id");
    const url = isExpert()
      ? "/layout/expert-profile?id=" + expert_id
      : isFinance() 
      ? AppRoutes.PAYMENT_REQUESTS
      : "/layout/projects/all?page=1";
    navigate(url);
  }
}
