export const APIRoutes = {
  clientOfficeUrl: "/clients/offices",
  clientContactUrl: "/clients/contact",
  projects: "/projects",
  projectNameMasking: "/projects/name-masking",
  projectCETracker: "/projects/ce-tracker",
  projectLink: "/projects/link",
  projectDeLink: "/projects/delink",
  projectsFilter: "/projects/filters",
  projectWorkspace: "/projects/workspace",
  searchProjects: "/projects/find?search=",
  searchExpert: "/experts/find?search=",
  shareProfileLink: "/experts/share",
  addExpert: "/experts/add",
  addExpertThroughLink: "/data-enrichment/profile",
  updateExpert: "/experts/update-expert",
  getExpert: "/experts",
  expertFilters: "/experts/filters",
  editExpert: "/experts/update",
  expertContacted: "/experts/markAsContacted",
  expertGenerateCompliance: "/experts/share-compliance",
  approveExpert: "/experts/approveExpert",
  approveExpertCompliance: "/experts/approve-compliance",
  refuseExpert: "/experts/refuseExpert",
  undoRefuseExpert: "/experts/undo-refuse",
  suggestExpert: "/suggest-expert",
  clients: "/clients",
  clientsUsage: "/clients/usage",
  users: "/users",
  domains: "/domains",
  geographies: "/geographies",
  adminUsers: "/users?role=ADMIN,SUPERADMIN",
  adminFinanceUsers: "/users?role=FINANCE,ADMIN,SUPERADMIN",
  bankDetails: "/bank-details",
  setPrimary: "/bank-details/set-primary",
  agenda: "/projects/agenda",
  updateAgenda: "/projects/agenda/update",
  getTimeline: "/history?tableName=",
  logout: "/users/logout/",
  generateSignedUrl: "/file-service/generate-signed",
  documents: "/documents",
  updateExpertPic: "/experts/update-picture",
  getAdmins: "/users?role=ADMIN",
  sendUserOtp: "/users/generate-otp",
  registorUser: "/self-registration/register",
  verifyOtp: "/self-registration/verify-otp",
  completeCompliance: "/experts/complete-compliance",
  completeComplianceAnswers: "/project-expert/compliance/answer",
  getComplianceAnswers: "/project-expert/compliance/expert",
  userLogin: "/users/login",
  forgotPassword: "/users/forgot-password",
  resetPassword: "/users/reset-password",
  currentCompanies: "/masters/company?type=current",
  pastCompanies: "/masters/company?type=past",
  getCompanies: "/masters?type=Company",
  masters: "/masters",
  getGroup: "/masters?type=Group",
  groupsMappedToMe: "/users/groupsMappedToMe",
  addClientOffice: "/clients/offices",
  peMapping: "/projects/expert",
  peMappingExpertInvite: "/projects/expert/invite",
  projectAccountManager: "/projects/assign-manager",
  getCallsAM: "/plan/call/getam",
  zoomAuth: "/plan/zoom-call-auth",
  getAccountManager: "/projects/getam",
  plan: "/plan",
  getZoomReports: "/plan/call/zoom_reports",
  PeCallLog: "/plan/call/log",
  scheduleCall: "/plan/call",
  getCalls: "/plan/getCalls",
  signUp: "/users/signup",
  getCallsForDate: "/plan/getCallsForDate",
  generateSigned: "/file-service/generate-signed",
  expertAgreement: "/experts/agreement",
  projectExpertBulk: "/projects/expert/bulk",
  getPayments: "/transactions",
  getInvoiceNum: "/transactions/generate-invoice-no",
  uploadImage: "/experts/upload-profile-image-v2",
  profileEdit: "/experts/profile-edits",
  approvProfileEdit: "/experts/approve-profile-edits",
  getDashboardIds: "/alldashboards/getDashboardIds",
  getMetabaseURL: "/alldashboards/getMetabaseURL",
  rejectProfileEdit: "/experts/reject-profile-edits",
  latestWorkExEdit: "/experts/latest-workex-edit",
  meta: "/meta",
  CLIENT_REPORT: "/clients/revenue",
  AM_REPORT: "/projects/revenue",
  STAGING_EXPERTS:"/staging-expert",
  ADD_STAGING: "/staging-expert/create",
  EXPERT_COMPLIANCE:"/compliance",
  PE_COMPLIANCE: "/project-expert/compliance",
  PRIORITIZE_EXPERT: "/experts/prioritize-expert",
  SETTINGS: "/settings",
  ZOOM_SLOTS: "/plan/zoom/getAllSlots",
  getCallExchangeRate: "/plan/call/exchange-rate",
  ZohoExpertStatement: "/zoho/expert-statement",
  ZohoPaymentReceipt: "/zoho/payment-receipt",
  EXCHANGE_RATE: "/exchange-rate",
  CASECODEUPDATE: "/plan/call/casecode-update",
  UPDATE_METABASE_URL: "/users/update-dashboard",
};
