import App from "../App/App";
import { AppRoutes } from "../constants";
import ExpertProfile from "../organisms/expert-profile";
import ProjectCards from "../organisms/project-cards";
import ProjectDetails from "../organisms/project-detail";
import Calls from "../pages/Calls";
import ErrorPage from "../pages/Error-Page";
import ExpertSearch from "../pages/Experts";
import Layout from "../pages/Layout";
import Projects from "../pages/Projects";
import PEMappingDynamicRoute from "../pages/Projects/peMapping/DynamicRoute";
import { unprotectedRoutes } from "./unprotectedRoutes";
import Calendar from "../pages/project-calendar";
import MyCalender from "../pages/my-calendar";

const clientRoutes = {
    path: AppRoutes.ROOT,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: AppRoutes.LAYOUT,
            element: <Layout />,
            children: [
                {
                    path: AppRoutes.PROJECTS,
                    element: <Projects />,
                    children: [
                        {
                            path: "all",
                            element: <ProjectCards />,
                        },
                        {
                            path: AppRoutes.PROJECT_DETAILS,
                            element: <ProjectDetails />,
                        },
                        {
                            path: AppRoutes.PROJECT_PE_MAPPING,
                            element: <PEMappingDynamicRoute />,
                        },
                    ],
                },
                {
                    path: AppRoutes.CALLS,
                    element: <Calls />,
                },
                {
                    path: AppRoutes.CALL_CALENDAR,
                    element: <MyCalender />,
                },
                {
                    path: AppRoutes.EXPERT_SEARCH,
                    element: <ExpertSearch />,
                },
                {
                    path: AppRoutes.EXPERT_PROFILE,
                    element: <ExpertProfile />,
                },
                {
                    path: AppRoutes.CALENDER,
                    element: <Calendar />,
                },
                {
                    path: AppRoutes.MY_CALENDAR,
                    element: <MyCalender />,
                }
            ]
        },
    ],
    ...unprotectedRoutes
}

export default clientRoutes;