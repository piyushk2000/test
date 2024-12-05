import { Location, NavigateFunction } from "react-router-dom";
import { isAdmin, isClient, isComplianceOfficer, isExpert, isFinance } from "../utils/role";
import { AppRoutes } from "../constants";

export const unProtectedRoutes = [AppRoutes.AGREEMENT, AppRoutes.COMPLIANCE, AppRoutes.REGISTER, AppRoutes.PROJECT_PE_MAPPING, AppRoutes.DOCUMENTS, AppRoutes.VIEW_INVOICE,AppRoutes.CE_MAPPING_EXPERTS, AppRoutes.ZOOM]
const clientRoutes = [AppRoutes.PROJECTS, AppRoutes.CALLS, AppRoutes.CALL_CALENDAR, AppRoutes.EXPERT_SEARCH, AppRoutes.EXPERT_PROFILE, AppRoutes.CALENDER, AppRoutes.MY_CALENDAR, ...unProtectedRoutes];
const ComplianceOfficerRoutes = [AppRoutes.PROJECTS, AppRoutes.CALLS, AppRoutes.CALL_CALENDAR, AppRoutes.EXPERT_SEARCH, AppRoutes.EXPERT_PROFILE, AppRoutes.CALENDER, AppRoutes.MY_CALENDAR, AppRoutes.COMPLIANCE_APPROVAL_TABLE,AppRoutes.USAGE, ...unProtectedRoutes];
const expertRoutes = [AppRoutes.EXPERT_PROFILE, AppRoutes.EDIT_EXPERT, AppRoutes.EXPERT_PENDING_APPROVAL, AppRoutes.CALLS, AppRoutes.Expert_Project_Page, AppRoutes.MY_CALENDAR, AppRoutes.CALL_CALENDAR, AppRoutes.CALENDER,AppRoutes.ACCEPT_INVITATION, AppRoutes.EXPERTCOMPLIANCE ,...unProtectedRoutes];
const adminRoutes = [
    AppRoutes.EXPERT_SEARCH, AppRoutes.EXPERT_PROFILE, AppRoutes.EDIT_EXPERT, AppRoutes.MYDASHBOARDS,
    AppRoutes.EXPERT_PENDING_APPROVAL, AppRoutes.PROJECTS, AppRoutes.Expert_Project_Page, AppRoutes.CLIENTS, AppRoutes.CONTACTS, AppRoutes.CALENDER, AppRoutes.SETTINGS, AppRoutes.CALLS, AppRoutes.MY_CALENDAR, AppRoutes.ACCEPT_INVITATION, "/layout/role", AppRoutes.CALL_CALENDAR,
    AppRoutes.PAYMENTS, AppRoutes.EXPERTCOMPLIANCE,AppRoutes.CE_TRACKER, AppRoutes.EXCHANGE_RATE,...unProtectedRoutes
] 
const financeRoutes = [
    AppRoutes.PAYMENT_REQUESTS, AppRoutes.CALLS, AppRoutes.EXPERT_PROFILE, ...unProtectedRoutes
]
    

export const validRoutes = (location: Location, navigate: NavigateFunction) => {

    const routes = isClient() ? (isComplianceOfficer() ? ComplianceOfficerRoutes : clientRoutes) : isExpert() ? expertRoutes : isAdmin() ? adminRoutes : isFinance() ? financeRoutes : null;

    if (!routes) {
        return;
    }

    let isValid = false;

    for (let route of routes) {
        if (location.pathname.includes(route)) {
            if (location.pathname.includes(AppRoutes.EDIT_EXPERT) && (isClient() || isFinance())) {
                break;
            } else {
                isValid = true;
                return;
            }
        }
    }


    if (!isValid) {
        const expert_id = localStorage.getItem("expert_id");
        const url = isExpert()
        ? "/layout/expert-profile?id=" + expert_id
        : isFinance() 
        ? AppRoutes.PAYMENT_REQUESTS
        : "/layout/projects/all?page=1";
        navigate(url);
    }
}

