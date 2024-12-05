import { EnqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { APIRoutes } from "../../constants";
import { isExpert } from "../../utils/role";
import { RequestServer } from "../../utils/services";

type successResponse = {
  message?: string;
  success?: string;
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
      "PATCH",
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
    alert(error.response.data.error);
    return false;
  }
};

export const questionsCompliance = [
  'You left company A 4 months ago after working there for 7 years. Our client wants to know an estimation of company A\'s financial performance for the past 2 years. Can you share this information with the client?',
  'You are an independent consultant and have been observing trends in a particular industry. Our client wants your opinion regarding investment in a leading company in that industry. Can you share your opinion?',
  'Our client asks you for consultation about a company which you left 2 years ago. Should you go ahead with the engagement?',
  'You are an employee of Company X. The Company is planning to launch a new product soon but this information has not been made public as yet. Can you share this information with our client if he/she wants information related to this topic?',
  'Can you share the forthcoming product launch information with the client if you are no longer the employee of that particular company?',
  'You are an independent solicitor whom we have contacted for consultation. During the engagement, the client asks you queries regarding a specific case or indicates towards a personal engagement. Should you continue such a consultation?',
  'You learned from a senior official in your company that your company is going to enter into a tender offer or joint venture with Company B. Should you share information if our client wants consultation on Company B ?',
  'During the engagement, you gain insight into the client\'s findings or future plans. Can you share this information with anyone else?',
  'You are a medical expert and have been asked by the client for your general opinion regarding the upcoming medical hub in a particular city. Should you provide your opinion regarding such a query?',
  'If a client requests to get back to you for follow-up or further information, should you go ahead without involving Infollion Research?',
  'If a client, to whom you have provided consultation in the past, approaches you directly for consultation, can you engage in the venture?',
];

export const questionsExplanationsCompliance = [
  'You cannot disclose the company\'s financial information under any circumstances if it has not been made public. The non-public information you gained while working there is strictly confidential. It should not be disclosed regardless of the fact whether you are currently employed by the company or not.',
  'Experts are requested not to provide financial or investment-related judgments in any case. Expert consultation should not involve any kind of financial or investment advice inclusive of securities, commodities or any other kind of physical or financial assets.',
  'Experts who are no longer associated with a particular company for more than 6 months can provide consultation concerning publicly-available information for that company.',
  'Experts are prohibited from sharing any information that has not been made public. Non-public information must not be disclosed as it is a company\'s confidential matter.',
  'The information still remains confidential even if you are no longer associated with the company.',
  'Independent practitioners are advised to provide a general or industry outlook and not take up specific/personal cases.',
  'Experts are advised not to provide consultation in such a case as experts are likely to have non-public information which should not be disclosed.',
  'Experts are not allowed to share confidential information that the client might have divulged during the consultation.',
  'Experts can surely provide consultation on such a matter. As long as the query does not hint towards the establishment of a doctor-patient relationship, purchase or investment decision or disclosure of non-public clinical trials, the expert is free to share his opinion.',
  'All communication between the client and the expert has to be coordinated by Infollion Research. Any communication between the two parties outside the realm of knowledge of Infollion Research does not entitle the expert for any remuneration.',
  'Experts who are registered as members of Infollion Expert Panel cannot be involved in any engagement directly with former clients.'
];

export const correctAnswersCompliance = [
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false
];


export const loginUserCompliance = async (
  token:string,
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

    console.log('login response',response)

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
