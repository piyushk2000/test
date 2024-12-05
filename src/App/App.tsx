import "./App.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OnlineStatus from "../atoms/online-status";
import { useSnackbar } from "notistack";
import { RedirectAfterLogin, loginUser } from "../organisms/login/helper";
import { isInfollion } from "../utils/role";
import { unProtectedRoutes, validRoutes } from "./helper";
import GoogleAnalyticsTracker from "../utils/ga-tracker/GoogleAnalyticsTracker";



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  useLayoutEffect(() => {
    (window as any)["enqueueSnackbar"] = enqueueSnackbar;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function handleAuth() {
      const searchParams = new URLSearchParams(location?.search);
      const tokenParam = searchParams.get("token");
      const e_key = searchParams.get("e"); // This value will only be present In case of we open the Expert => "Copy Profile Link"
      if (tokenParam) {
        localStorage.setItem("authToken", tokenParam);
        localStorage.setItem("token", tokenParam);
        if (e_key) {
          localStorage.setItem("e", e_key);
        }
        await loginUser({}, location, navigate, () => { }, enqueueSnackbar, {
          disableDefaultRedirect: true,
          disableSuccessMessage: true,
          handleLoginFailure: () => {
            localStorage.clear();
          }
        });
      }

      let token = localStorage.getItem("authToken");
      if (!token || token === "") {
        if (!location.pathname.includes("/login") && !unProtectedRoutes.includes(location.pathname)) {
          const redirect_url = location.pathname + location.search;
          const append_url = searchParams.get("append_url");
          if (redirect_url !== "/") {
            
            navigate(`/login?redirect_url=${redirect_url}${(append_url ? `&append_url=1` : "")}`);
          } else {
            navigate("/login");
          }
        }
      } else {
        if (isInfollion()) {
          // IF ROLE IS INFOLLION -------------------------------------------------- //

          const e_local = localStorage.getItem("e");
          const token_local = localStorage.getItem("authToken");
          if (!location.pathname.includes("/expert-profile")&&!location.pathname.includes("/expert-compliance") && token_local && e_local) {
            navigate(`/layout/expert-profile?e=${e_local}`);
          }

          // ----------------------------------------------------------------------- //
        } else {
          if (!location.pathname.includes("/login") && !location.pathname.includes("/compliance")) {
            if (location.pathname === "/") {
              RedirectAfterLogin(location, token, navigate);
            } else {
              validRoutes(location, navigate);
            }
          }
        }
      }

      setAuthCheckCompleted(true);
    }

    handleAuth()

    // eslint-disable-next-line
  }, [location.pathname]);

  if (!authCheckCompleted) {
    return null;
  }

  return (
    <div className="App">
      <OnlineStatus />
      <CssBaseline />
      <GoogleAnalyticsTracker />
      <Outlet />
    </div>
  );
}

export default App;
