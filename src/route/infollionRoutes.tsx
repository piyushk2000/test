import App from "../App/App";
import { AppRoutes } from "../constants";
import ExpertProfile from "../organisms/expert-profile";
import ErrorPage from "../pages/Error-Page";
import Layout from "../pages/Layout";
import { unprotectedRoutes } from "./unprotectedRoutes";

const infollionRoutes = {
    path: AppRoutes.ROOT,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{
        path: AppRoutes.LAYOUT,
        element: <Layout />,
        children: [
            {
                path: AppRoutes.EXPERT_PROFILE,
                element: <ExpertProfile />,
            },
        ]
    },
    ...unprotectedRoutes
    ]
}

export default infollionRoutes;