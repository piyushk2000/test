import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { AppRoutes } from '../../constants';

const pageNameMapping = {
  [AppRoutes.ROOT]: 'Home',
  [AppRoutes.EXPERT_SEARCH]: 'Expert Search',
  [AppRoutes.EXPERT_PROFILE]: 'Expert Profile',
  [AppRoutes.EDIT_EXPERT]: 'Edit Expert',
  [AppRoutes.ADD_EXPERT]: 'Add Expert',
  [AppRoutes.PROJECTS]: 'Projects',
  [AppRoutes.PROJECT_DETAILS]: 'Project Details',
  [AppRoutes.PROJECT_PE_MAPPING]: 'Project PE Mapping',
  [AppRoutes.COMPLIANCE_APPROVAL_TABLE]: 'Compliance Approval',
  [AppRoutes.CLIENTS]: 'Clients',
  [AppRoutes.CLIENT_PROFILE]: 'Client Profile',
  [AppRoutes.MODERATE]: 'Moderate',
  [AppRoutes.ADVANCE_SETTINGS]: 'Advance Settings',
  [AppRoutes.LOGIN]: 'Login',
  [AppRoutes.REGISTER]: 'Register',
  [AppRoutes.COMPLIANCE]: 'Compliance',
  [AppRoutes.EXPERTCOMPLIANCE]: 'Expert Compliance',
  [AppRoutes.AGREEMENT]: 'Agreement',
  [AppRoutes.OTP]: 'OTP',
  [AppRoutes.FORGOTPASSWORD]: 'Forgot Password',
  [AppRoutes.RESETPASSWORD]: 'Reset Password',
  [AppRoutes.ADMIN_USER]: 'Admin User',
  [AppRoutes.CALENDER]: 'Calendar',
  [AppRoutes.CONTACTS]: 'Contacts',
  [AppRoutes.GROUPS]: 'Groups',
  [AppRoutes.SETTINGS]: 'Settings',
  [AppRoutes.CALLS]: 'Calls',
  [AppRoutes.MY_CALENDAR]: 'My Calendar',
  [AppRoutes.TAGS]: 'Tags',
  [AppRoutes.ACCEPT_INVITATION]: 'Accept Invitation',
  [AppRoutes.Expert_Project_Page]: 'Expert Projects',
  [AppRoutes.PROFILES_SHARED]: 'Profiles Shared',
  [AppRoutes.CALL_CALENDAR]: 'Call Calendar',
  [AppRoutes.PAYMENTS]: 'Payments',
  [AppRoutes.EXPERT_PENDING_APPROVAL]: 'Expert Pending Approval',
  [AppRoutes.DOCUMENTS]: 'Documents',
  [AppRoutes.VIEW_INVOICE]: 'View Invoice',
  [AppRoutes.REPORTS]: 'Reports',
  [AppRoutes.MYDASHBOARDS]: 'My Dashboard',
  [AppRoutes.ZOOM]: 'Zoom',
  [AppRoutes.USAGE]: 'Usage',
  [AppRoutes.CE_MAPPING_EXPERTS]: 'CE Mapping Experts',
  [AppRoutes.VENDORS]: 'Vendors'
};



export const allowedSubdomains = ['webapp.infollion.com', 'ext.infollion.com'];

function getMostSpecificRoute(pathname: string): string {
  // First, check if the full pathname (including /layout/) is in pageNameMapping
  if (pageNameMapping[pathname]) {
    return pathname;
  }

  // If not found, try without the /layout/ prefix
  const withoutLayout = pathname.replace(/^\/layout/, '');
  if (pageNameMapping[withoutLayout]) {
    return withoutLayout;
  }

  // If still not found, try matching progressively shorter paths
  const pathParts = pathname.split('/').filter(Boolean);
  for (let i = pathParts.length; i > 0; i--) {
    const route = '/' + pathParts.slice(0, i).join('/');
    if (pageNameMapping[route]) {
      return route;
    }
  }

  return pathname;
}

function getPageName(pathname: string): string {
  if (!pathname) {
    return 'Unknown Page';
  }

  // Get the most specific route
  const specificRoute = getMostSpecificRoute(pathname);

  // If we have a mapping for this route, use it
  if (pageNameMapping[specificRoute]) {
    return pageNameMapping[specificRoute];
  }

  // If we don't have a mapping, return the last part of the path
  return pathname || 'Unknown Page';
}



const GoogleAnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.initialize("G-T28HK59PS8");
  }, []);

  useEffect(() => {
    const currentHostname = window.location.hostname;
        
    if (allowedSubdomains.includes(currentHostname)) {
    const currentSubdomain = window.location.hostname;
    const pageName = getPageName(location.pathname);
    const subdomain = currentSubdomain.split('.')[0];
    const capitalizedSubdomain = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
    const fullPageName = `${capitalizedSubdomain} - ${pageName}`;

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: fullPageName
    });
  }
  }, [location.pathname, navigate]);

  return null;
};

export default GoogleAnalyticsTracker;