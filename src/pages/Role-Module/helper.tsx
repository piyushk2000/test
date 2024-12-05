export const advanceSettingData = [
  "Healthcare",
  "Brewbulbs",
  "Fintech",
  "Aquaholics",
  "IT",
  "RIOC",
  "US",
  "Equity",
];
export const options = ["ReadOnly", "Full Access", "Client Specific"];

export const roles = [
  "Superadmin",
  "Admin",
  "Accounts",
  "Sales exe",
  "Sales Mgr",
  "Ops exe",
  "Ops Mgr",
  "Client",
];

export const modules = [
  "Users",
  "Payments",
  "Orders",
  "Clients",
  "Documents",
  "Tickets",
  "Invoice",
];

export const roleModulesMatrix: Record<
  string,
  Record<string, string>
> = roles.reduce((Final, role) => {
  const moduleMatrix = modules.reduce((finalModule, module) => {
    return {
      ...finalModule,
      [module]: "",
    };
  }, {});
  return {
    ...Final,
    [role]: moduleMatrix,
  };
}, {});
