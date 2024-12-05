import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const NavbarActions = (
  approveClickHandler: () => void,
  rejectClickHandler: () => void
): NavbarActionsTypes => [
  {
    title: "Approve Compliances",
    label: "Approve Compliances",
    onClick: approveClickHandler,
  },
  {
    title: "Reject Compliances",
    label: "Reject Compliances",
    onClick: rejectClickHandler
  }
];

export const NavbarActionsLength = NavbarActions(() => {}, () => {}).length;
