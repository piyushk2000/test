import { AppRoutes } from "../../constants";

export interface NavigationItemType {
  title: string;
  childrens: {
    title: string;
    href: string;
  }[];
}

export const itemSmall: NavigationItemType[] = [
  {
    title: "M",
    childrens: [
      {
        title: "M",
        href: "/layout/moderate",
      },
      {
        title: "T",
        href: "",
      },
      {
        title: "C",
        href: "",
      },
      {
        title: "P",
        href: "",
      },
      {
        title: "A",
        href: "",
      },
    ],
  },
  {
    title: "U",
    childrens: [
      {
        title: "A",
        href: "",
      },
      {
        title: "C",
        href: "/layout/customer-search",
      },
      {
        title: "C",
        href: "",
      },
    ],
  },
  {
    title: "E",
    childrens: [
      {
        title: "P",
        href: "/layout/projects/all",
      },
      {
        title: "C",
        href: "",
      },
      {
        title: "C",
        href: "",
      },
    ],
  },
  {
    title: "E",
    childrens: [
      {
        title: "E",
        href: AppRoutes.EXPERT_SEARCH,
      },
      {
        title: "V",
        href: "",
      },
    ],
  },
];
