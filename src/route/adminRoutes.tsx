import App from "../App/App";
import { AppRoutes } from "../constants";
import AllClients from "../organisms/client/all-clients";
import ClientPage from "../organisms/client/client-page";
import AllContacts from "../organisms/contacts/allContacts";
import EditExpert from "../organisms/edit-expert";
import ExpertProfile from "../organisms/expert-profile";
import ProjectCards from "../organisms/project-cards";
import ProjectDetails from "../organisms/project-detail";
import Calendar from "../pages/project-calendar";
import ClientSearch from "../pages/Client";
import ErrorPage from "../pages/Error-Page";
import ExpertSearch from "../pages/Experts";
import Layout from "../pages/Layout";
import Projects from "../pages/Projects";
import Contacts from "../pages/contacts";
import SettingsPage from "../pages/Settings";
import Calls from "../pages/Calls";
import MyCalender from "../pages/my-calendar";
import AcceptInvitation from "../pages/Accept-invitation";
import ExpertProjectPage from "../pages/expert-project";
import PEMappingDynamicRoute from "../pages/Projects/peMapping/DynamicRoute";
import UserRoleManagement from "../pages/Role-Module";
import PaymentsPage from "../pages/payments";
import ExpertPendingApproval from "../organisms/expert-pending-approval";
import Reports from "../pages/reports";
import { unprotectedRoutes } from "./unprotectedRoutes";
import Dashboards from "../pages/My-dashboard";

const adminRoutes = {
    path: AppRoutes.ROOT,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: AppRoutes.LAYOUT,
            element: <Layout />,
            children: [
                {
                    path: AppRoutes.EXPERT_SEARCH,
                    element: <ExpertSearch />,
                },
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
                    path: AppRoutes.Expert_Project_Page,
                    element: <ExpertProjectPage />
                },
                {
                    path: AppRoutes.MYDASHBOARDS,
                    element: <Dashboards/>
                },
                {
                    path: AppRoutes.CLIENTS,
                    element: <ClientSearch />,
                    children: [
                        {
                            path: "all",
                            element: <AllClients />,
                        },
                        {
                            path: AppRoutes.CLIENT_PROFILE,
                            element: <ClientPage />,
                        },
                    ],
                },
                {
                    path: AppRoutes.CONTACTS,
                    element: <Contacts />,
                    children: [
                        {
                            path: "all",
                            element: <AllContacts />,
                        },
                    ],
                },
                {
                    path: AppRoutes.CALENDER,
                    element: <Calendar />,
                },
                {
                    path: AppRoutes.SETTINGS,
                    element: <SettingsPage />,
                },
                {
                    path: AppRoutes.CALLS,
                    element: <Calls />,
                },
                {
                    path: AppRoutes.MY_CALENDAR,
                    element: <MyCalender />,
                },
                {
                    path: AppRoutes.ACCEPT_INVITATION,
                    element: <AcceptInvitation />,
                },
                {
                    path: "/layout/role",
                    element: <UserRoleManagement />,
                },
                {
                    path: AppRoutes.CALL_CALENDAR,
                    element: <MyCalender />,
                },
                {
                    path: AppRoutes.PAYMENTS,
                    element: <PaymentsPage />
                }
            ],
        },
        ...unprotectedRoutes
    ],
};

export default adminRoutes;