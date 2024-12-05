import { AppRoutes } from "../../constants";
import { isAdmin, isClient, isComplianceOfficer, isExpert, isFinance } from "../../utils/role";

export interface NavigationItemType {
  title: string;
  childrens: {
    title: string;
    href: string;
  }[];
}

export const adminSidebarItems: NavigationItemType[] = [
  {
    title: "Manage",
    childrens: [
      {
        title: "My Dashboard",
        href: AppRoutes.MYDASHBOARDS
      },
      {
        title: "Exchange Rates",
        href: AppRoutes.EXCHANGE_RATE,
      }
    ],
  },
  {
    title: "Users",
    childrens: [
      {
        title: "Clients",
        href: AppRoutes.CLIENTS + "/all",
      },
    ],
  },
  {
    title: "Engagements",
    childrens: [
      {
        title: "Projects",
        href: "/layout/projects/all",
      },
      {
        title: "Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Calendar",
        href: AppRoutes.MY_CALENDAR,
      },
    ],
  },
  {
    title: "Experts",
    childrens: [
      {
        title: "All",
        href: AppRoutes.EXPERT_SEARCH + "?page=1",
      },
    ]
  }
];

export const items: NavigationItemType[] = [
  {
    title: "Manage",
    childrens: [
      {
        title: "Moderate",
        href: "/layout/moderate",
      },
      {
        title: "Tag",
        href: AppRoutes.TAGS,
      },
      {
        title: "Groups",
        href: AppRoutes.GROUPS,
      },
      // {
      //   title: "Compliance",
      //   href: "",
      // },
      {
        title: "Payments",
        href: AppRoutes.PAYMENTS,
      },
      {
        title: "Advance Settings",
        href: "/layout/advance-settings",
      },
      {
        title: "Reports",
        href: AppRoutes.REPORTS
      },
      {
        title: "Exchange Rates",
        href: AppRoutes.EXCHANGE_RATE,
      },
      {
        title: "My Dashboard",
        href: AppRoutes.MYDASHBOARDS
      }
    ],
  },
  {
    title: "Users",
    childrens: [
      {
        title: "Employees",
        href: "/layout/admin/all",
      },
      {
        title: "Clients",
        href: AppRoutes.CLIENTS + "/all",
      },
    ],
  },
  {
    title: "Engagements",
    childrens: [
      {
        title: "Projects",
        href: "/layout/projects/all",
      },
      {
        title: "Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Calendar",
        href: AppRoutes.MY_CALENDAR,
      },
      {
        title: "Payment Requests",
        href: AppRoutes.PAYMENT_REQUESTS
      }
    ],
  },
  {
    title: "Experts",
    childrens: [
      {
        title: "All",
        href: AppRoutes.EXPERT_SEARCH,
      },
    ]
  }
];

export const FinanceSidebarItems: NavigationItemType[] = [
  {
    title: "Engagements",
    childrens: [
      {
        title: "Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Payment Requests",
        href: AppRoutes.PAYMENT_REQUESTS
      }
    ],
  },
]

export const ExpertsSidebarItems: NavigationItemType[] = [
  {
    title: "Manage",
    childrens: [
      {
        title: "My Profile",
        href: AppRoutes.EXPERT_PROFILE,
      },
      // {
      //   title: "Payments",
      //   href: AppRoutes.PAYMENTS,
      // },
    ],
  },
  {
    title: "Engagements",
    childrens: [
      {
        title: "Projects",
        href: AppRoutes.Expert_Project_Page,
      },
      {
        title: "Completed Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Calendar",
        href: AppRoutes.MY_CALENDAR,
      },
    ],
  },
];

export const ClientSidebarItems: NavigationItemType[] = [
  // {
  //   title: "Manage",
  //   childrens: [
  //     {
  //       title: "Moderate",
  //       href: "/layout/moderate",
  //     },
  //     {
  //       title: "Tag",
  //       href: AppRoutes.TAGS,
  //     },
  //     {
  //       title: "Groups",
  //       href: AppRoutes.GROUPS,
  //     },
  //     {
  //       title: "Compliance",
  //       href: "",
  //     },
  //     {
  //       title: "Payments",
  //       href: "",
  //     },
  //     {
  //       title: "Advance Settings",
  //       href: "/layout/advance-settings",
  //     },
  //   ],
  // },
  // {
  //   title: "Users",
  //   childrens: [
  //     {
  //       title: "Admins",
  //       href: "/layout/admin/all",
  //     },
  //     {
  //       title: "Clients",
  //       href: AppRoutes.CLIENTS + "/all",
  //     },
  //   ],
  // },
  {
    title: "Engagements",
    childrens: [
      {
        title: "Projects",
        href: "/layout/projects/all",
      },
      {
        title: "Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Calendar",
        href: AppRoutes.CALL_CALENDAR,
      }
    ],
  },
  {
    title: "Experts",
    childrens: [
      {
        title: "Experts",
        href: AppRoutes.EXPERT_SEARCH,
      },
    ],
  },
];

export const ClientComplianceOfficerSidebarItems: NavigationItemType[] = [
  {
    title: "Usage / Calls",
    childrens: [
      {
        title: "Calls",
        href: AppRoutes.CALLS,
      },
      {
        title: "Usage",
        href: AppRoutes.USAGE
      }
    ],
  },
  {
    title: "Engagements",
    childrens: [
      {
        title: "Projects",
        href: "/layout/projects/all",
      },
      {
        title: "Calendar",
        href: AppRoutes.CALL_CALENDAR,
      },
      {
        title: "Compliances",
        href: AppRoutes.COMPLIANCE_APPROVAL_TABLE
      }
    ],
  },
  {
    title: "Experts",
    childrens: [
      {
        title: "Experts",
        href: AppRoutes.EXPERT_SEARCH,
      },
    ],
  },
];
export function getSidebarItems() {
  if (isExpert()) return ExpertsSidebarItems;
  if (isClient()) return isComplianceOfficer() ? ClientComplianceOfficerSidebarItems : ClientSidebarItems;
  if (isAdmin()) return adminSidebarItems;
  if(isFinance()) return FinanceSidebarItems;
  return items;
}
