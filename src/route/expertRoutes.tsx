import App from "../App/App";
import { AppRoutes } from "../constants";
import EditExpert from "../organisms/edit-expert";
import ExpertPendingApproval from "../organisms/expert-pending-approval";
import ExpertProfile from "../organisms/expert-profile";
import Calls from "../pages/Calls";
import ErrorPage from "../pages/Error-Page";
import Layout from "../pages/Layout";
import ExpertProjectPage from "../pages/expert-project";
import MyCalender from "../pages/my-calendar";
import { unprotectedRoutes } from "./unprotectedRoutes";

const expertRoutes = {
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
            {
                path: AppRoutes.EDIT_EXPERT,
                element: <EditExpert />,
            },
            {
                path: AppRoutes.EXPERT_PENDING_APPROVAL,
                element: <ExpertPendingApproval />
            },
            {
                path: AppRoutes.CALLS,
                element: <Calls />,
            },
            {
                path: AppRoutes.Expert_Project_Page,
                element: <ExpertProjectPage />
            },
            {
                path: AppRoutes.MY_CALENDAR,
                element: <MyCalender />,
            },
            {
                path: AppRoutes.CALL_CALENDAR,
                element: <MyCalender />,
            }
        ]
    },
    ...unprotectedRoutes
    ]
}

export default expertRoutes;