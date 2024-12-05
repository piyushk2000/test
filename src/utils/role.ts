export type roles =
  | "EXPERT"
  | "ADMIN"
  | "CUSTOMER"
  | "SUPERADMIN"
  | "INFOLLION"
  | "FINANCE"
  | null;

const getUserRoleFromLocalStorage = (): roles => {
  return localStorage.getItem("role") as roles;
};

export function isAdmin() {
  const role = getUserRoleFromLocalStorage();
  return role === "ADMIN";
}

export function isSuperAdmin() {
  const role = getUserRoleFromLocalStorage();
  return role === "SUPERADMIN";
}
export function isExpert() {
  const role = getUserRoleFromLocalStorage();
  return role === "EXPERT";
}
export function isClient() {
  const role = getUserRoleFromLocalStorage();
  return role === "CUSTOMER";
}

export function isInfollion() {
  const role = getUserRoleFromLocalStorage();
  return role === "INFOLLION";
}

export function isFinance() {
  const role = getUserRoleFromLocalStorage();
  return role === "FINANCE"
}
export function isInternalUser() {
  const role = getUserRoleFromLocalStorage();
  return ( role === "ADMIN" || role === "FINANCE" || role === "SUPERADMIN" )
}

export function isOnlyAdmins() {
  const role = getUserRoleFromLocalStorage();
  return ( role === "ADMIN" || role === "SUPERADMIN" )
}

export function getUserId(){
  return(localStorage.getItem('id'))
}
export function getCurrentUserName(){
  return(localStorage.getItem('name'))
}
  
export function isComplianceOfficer() {
  return !!localStorage.getItem("is_compliance_officer");
}
