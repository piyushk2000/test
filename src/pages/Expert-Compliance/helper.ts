import { EnqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { APIRoutes } from "../../constants";
import { Answers, NumberQuestion } from "../../organisms/compliances/autoAprovalDialog/types";
import { isExpert } from "../../utils/role";
import { RequestServer } from "../../utils/services";

type successResponse = {
  message?: string;
  success?: string;
  data?: {
    state: string;
    questions: NumberQuestion[];
    fk_client: number;
  }
};


type errorResponse = {
  error: string;
};

type responseType = successResponse | errorResponse;

export const completeCompliance = async (id: string, token: string,
  enqueueSnackbar: EnqueueSnackbar
): Promise<boolean> => {
  const user = {
    "action": 'ComplianceDone',
    "id": id
  };

  try {
    const response: responseType = await RequestServer(
      APIRoutes.completeCompliance,
      "POST",
      user,
      false,
      token
    );

    console.log('api response', response)
    if ("success" in response) {
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
    console.log('api response error', error)
    enqueueSnackbar(error.response.data.error, {
      variant: "error",
    })
    // alert(error.response.data.error);
    return false;
  }
};


export const submitComplianceAnswers = async (code: string | null, answers: Answers,
  enqueueSnackbar: EnqueueSnackbar, url: string | null,isEdit: string | null
): Promise<boolean> => {
  if(!code) {
    enqueueSnackbar("Provide unique code", {variant: "warning"})
    return false;
  }
  
  const user: any = {
    "answers": answers,
    "unique_code": code
  };

  if(url) {
    user.expert_compliance_proof_url = url;
  }

  if(isEdit) {
    user.isEdit = true;
  }

  const method = isEdit ? "PATCH" : "POST"

  try {
    const response: responseType = await RequestServer(
      APIRoutes.completeComplianceAnswers,
      method,
      user,
      false
    );

    console.log('api response', response)
    if ("success" in response) {
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
    console.log('api response error', error)
    enqueueSnackbar(error.response.data.error, {
      variant: "error",
    })

    // alert(error.response.data.error);
    return false;
  }
};


export const getQuestionsApi = async (
  code: string, enqueueSnackbar: EnqueueSnackbar,isEdit: string | null
): Promise<any> => {
  try {

    const response: responseType = await RequestServer(
      APIRoutes.getComplianceAnswers + `?unique_code=${code}` + (isEdit ? `&isEdit=true` : ""),
      "GET",
      undefined,
      false
    );


    if ("success" in response) {
      const successResponse = response as successResponse;

      const clientResponse = await RequestServer(APIRoutes.clients + "?id=" + successResponse.data?.fk_client + "&show_columns=id,compliance_description","GET");

      if (successResponse.success && successResponse.data && clientResponse.success) {
        return { success: true, data: successResponse.data, questions: successResponse.data.questions || [], state: successResponse.data.state, message: successResponse.message, compliance_description: clientResponse.data[0].compliance_description };
      } else {
        enqueueSnackbar(successResponse.message, {
          variant: "warning",
        });
        return { success: false, questions: [], state: '', message: successResponse.message };
      }
    } else {
      const errorResponse = response as errorResponse;
      enqueueSnackbar(errorResponse.error, {
        variant: "error",
      });
      return { success: false, questions: [], state: '', message: errorResponse.error };
    }

  } catch (error: any) {
    console.log(error);
    alert(error.response.data.error);
    return { success: false, questions: [], state: '', message: error.response.data.error };
  }
};


export const loginUserCompliance = async (
  token: string,
  enqueueSnackbar: EnqueueSnackbar,
  navigate: NavigateFunction
) => {
  try {
    const response: any = await RequestServer(
      APIRoutes.userLogin,
      "POST",
      {},
      false,
      token
    );

    console.log('login response', response)

    if (response.message === "Login successful!") {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("authToken", response?.token);
      localStorage.setItem("name", response?.user?.name);
      localStorage.setItem("id", response?.user?.id);
      localStorage.setItem("role", response?.user?.role);
      localStorage.setItem("expert_id", response?.user?.expert?.id);
      localStorage.setItem("email", response?.user?.email);
      localStorage.setItem("user", JSON.stringify(response?.user));
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

      return true;
    } else {
      // enqueueSnackbar(
      //   response?.message || response?.error || "something went wrong",
      //   {
      //     variant: "error",
      //   }
      // );
      return false;
    }
  } catch (err: any) {
    console.log(err);
    // enqueueSnackbar(err, {
    //   variant: "error",
    // });
    return false;
  }
};

export function RedirectAfterLogin(
  navigate: NavigateFunction
) {

  const expert_id = localStorage.getItem("expert_id");
  const url = isExpert()
    ? "/layout/expert-profile?id=" + expert_id
    : "/layout/projects/all?page=1";
  navigate(url);
}
