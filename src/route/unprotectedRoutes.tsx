import App from "../App/App";
import { AppRoutes } from "../constants";
import ForgetPassForm from "../organisms/login/forgetPass";
import LoginForm from "../organisms/login/loginForm";
import OtpForm from "../organisms/login/otpForm";
import ResetPassword from "../organisms/login/resetPass";
import Compliance from "../pages/Compliance";
import Agreement from "../pages/Compliance/agreement";
import ErrorPage from "../pages/Error-Page";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegistorUser";
import DocumentViewPage from "../pages/documents";
import ZoomPage from "../pages/zoom";

export const unprotectedRoutes = [
  {
    path: AppRoutes.AGREEMENT,
    element: <Agreement />,
  },
  {
    path: AppRoutes.COMPLIANCE,
    element: <Compliance />
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterUser />
  },
  {
    path: AppRoutes.LOGIN,
    element: <Login />,
    children: [{
      path: '',
      element: <LoginForm />
    },
    {
      path: AppRoutes.OTP,
      element: <OtpForm />
    },
    {
      path: AppRoutes.FORGOTPASSWORD,
      element: <ForgetPassForm />
    }, {
      path: AppRoutes.RESETPASSWORD,
      element: <ResetPassword />
    }]
  },
  {
    path: AppRoutes.DOCUMENTS,
    element: <DocumentViewPage />
  },
  {
    path: AppRoutes.ZOOM,
    element: <ZoomPage />,
},
];

export const unprotectedRoutesLayout = {
  path: AppRoutes.ROOT,
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    ...unprotectedRoutes
  ]
}