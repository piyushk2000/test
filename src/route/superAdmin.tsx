import App from "../App/App";
import { AppRoutes } from "../constants";
import AllAdmins from "../organisms/admin/allAdmins";
import AllClients from "../organisms/client/all-clients";
import ClientPage from "../organisms/client/client-page";
import AllContacts from "../organisms/contacts/allContacts";
import EditExpert from "../organisms/edit-expert";
import ExpertProfile from "../organisms/expert-profile";
import ProjectCards from "../organisms/project-cards";
import ProjectDetails from "../organisms/project-detail";
import Admin from "../pages/Admin";
import AdvanceSettings from "../pages/Advance-Settings";
import Calendar from "../pages/project-calendar";
import ClientSearch from "../pages/Client";
import ErrorPage from "../pages/Error-Page";
import ExpertSearch from "../pages/Experts";
import Layout from "../pages/Layout";
import Moderate from "../pages/Moderate";
import Projects from "../pages/Projects";
import Contacts from "../pages/contacts";
import GroupPage from "../pages/groups";
import SettingsPage from "../pages/Settings";
import Calls from "../pages/Calls";
import MyCalender from "../pages/my-calendar";
import Tags from "../pages/Tags-page";
import AcceptInvitation from "../pages/Accept-invitation";
import ExpertProjectPage from "../pages/expert-project";
import PEMappingDynamicRoute from "../pages/Projects/peMapping/DynamicRoute";
import UserRoleManagement from "../pages/Role-Module";
import PaymentsPage from "../pages/payments";
import ExpertPendingApproval from "../organisms/expert-pending-approval";
import Reports from "../pages/reports";
import { unprotectedRoutes } from "./unprotectedRoutes";
import ExpertCompliance from "../pages/Expert-Compliance";
import ComplianceApprovalTable from "../pages/compliance-approval-table";
import { Usage } from "../pages/usage";
import { CEMappingExpert } from "../pages/ce-mapping-expert";
import CETracker from "../organisms/project/ce-tracker";
import PaymentRequestsPage from "../pages/payment-requests";
import ExchangeRatePage from "../pages/exchange-rate";
import Dashboards from "../pages/My-dashboard";

const superAdminRoutes = {
    path: AppRoutes.ROOT,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: AppRoutes.LAYOUT,
            element: <Layout />,
            children: [
                {
                    path: AppRoutes.CE_TRACKER,
                    element: <CETracker />
                },
                {
                    path: AppRoutes.PAYMENT_REQUESTS,
                    element: <PaymentRequestsPage />
                },
                {
                    path: AppRoutes.CE_MAPPING_EXPERTS,
                    element: <CEMappingExpert />
                },
                {
                    path: AppRoutes.COMPLIANCE_APPROVAL_TABLE,
                    element: <ComplianceApprovalTable />
                },
                {
                    path: AppRoutes.USAGE,
                    element: <Usage />
                },
                {
                    path: AppRoutes.REPORTS,
                    element: <Reports />
                },
                {
                    path: AppRoutes.MYDASHBOARDS,
                    element: <Dashboards/>
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
                    path: AppRoutes.EDIT_EXPERT,
                    element: <EditExpert />,
                },
                {
                    path: AppRoutes.EXPERT_PENDING_APPROVAL,
                    element: <ExpertPendingApproval />
                },
                {
                    path: AppRoutes.ADMIN_USER,
                    element: <Admin />,
                    children: [
                        {
                            path: "all",
                            element: <AllAdmins />,
                        },
                    ],
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
                    path: AppRoutes.GROUPS,
                    element: <GroupPage />,
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
                    path: AppRoutes.MODERATE,
                    element: <Moderate />,
                },
                {
                    path: AppRoutes.ADVANCE_SETTINGS,
                    element: <AdvanceSettings />,
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
                    path: AppRoutes.TAGS,
                    element: <Tags />,
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
                },
                {
                    path: AppRoutes.EXCHANGE_RATE,
                    element: <ExchangeRatePage />
                }
                // {
                //   path: AppRoutes.PROFILES_SHARED,
                //   element: <ProfileShared />,
                // },
            ],
        },
        {
            path: AppRoutes.EXPERTCOMPLIANCE,
            element: <ExpertCompliance />
        },
        ...unprotectedRoutes
    ],
};

export default superAdminRoutes;
