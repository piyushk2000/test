import { EnqueueSnackbar } from "notistack";

let testUrl = "";
let isDev = false;
if (window.location.href.includes("webapp.infollion.com")) {
  testUrl = "https://colo.infollion.com/api/v1";
  isDev = false;
} else if (window.location.href.includes("ext.infollion.com")) {
  testUrl = "https://colo.infollion.com/api/v1";
  isDev = false;
} else {
  testUrl = "https://colo-dev.infollion.com/api/v1";
  isDev = true;
}
//  export const HOSTURL_LOCAL = "http://localhost:3000/api/v1";

export const HOSTURL_LOCAL = testUrl;
export const IS_DEV = isDev;

export const RequestServer = async (
  url: any,
  method: string,
  body?: object,
  isFile?: boolean,
  tokenAPI?: string,
  getAbortController?: (ab: AbortController, clearTimeout: () => void) => void
) => {
  const authToken = tokenAPI || localStorage.getItem("authToken");
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
    if ((window as any).enqueueSnackbar) {
      (window as any).enqueueSnackbar("Server connection failed", {
        variant: "error",
      });
    }
  }, 60000);

  const headers: any = isFile
    ? {}
    : {
        "Content-Type": "application/json",
      };

  if (authToken) headers.Authorization = authToken;

  const request: object = body
    ? {
        method: method,
        headers,
        body: isFile ? body : JSON.stringify(body),
        signal: controller.signal,
      }
    : {
        method: method,
        headers,
        signal: controller.signal,
      };

  try {
    if (getAbortController) {
      await getAbortController(controller, () => clearTimeout(id));
    }

    const response = await fetch(HOSTURL_LOCAL + url, request);
    
    !getAbortController && clearTimeout(id); // Clear the timeout immediately when a response is received
    
    if (response.status === 200) {
      if (typeof response === "string") {
        return response;
      }
      return await response.json();
    } else if (response.status === 401) {
      // If Token Expires, redirect to login page by clearning local storage and reloading the page
      const data = await response.json();
      if (
        data.error === "Invalid token" ||
        data.error === "Session Expired" ||
        data.error === "JsonWebTokenError" ||
        data.error === "Token Blocked"
      ) {
        const url = new URL(window.location.href);
        // If any token if append in the url, we are removing it
        if (url.searchParams.get("token")) {
          url.searchParams.delete("token");
          // Use replaceState to modify the URL without adding a new entry to the history
          window.history.replaceState(null, "", url.toString());
        }
        localStorage.clear();
        if (!tokenAPI) {
          window.location.reload();
        }
      }
      return data;
    } else {
      return await response.json();
    }
  } catch (error) {
    if (controller.signal.aborted) {
      console.error("Request was aborted.");
    }
    throw error; // Re-throw error for handling by calling code
  } finally {
    clearTimeout(id); // Ensure timeout is cleared in case of an error
  }
};


export const genericPostPatch = async (
  functionToCall: () => Promise<any>,
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (loading: boolean) => void,
  onSuccess?: () => void
) => {
  try {
    setLoading(true);
    const response = await functionToCall();
    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      onSuccess && onSuccess();
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
    console.error({ err });
    enqueueSnackbar("Request failed.", { variant: "error" });
  } finally {
    setLoading(false);
  }
};