import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const PeMappingActions = {
  showExperts: "Include Experts",
  hideExperts: "Exclude Experts"
};

export const NavbarActions = (
  showExperts: () => void,
  hideExperts: () => void
): NavbarActionsTypes => [
  {
    title: PeMappingActions.showExperts,
    label: PeMappingActions.showExperts,
    onClick: () => showExperts(),
  },
  {
    title: PeMappingActions.hideExperts,
    label: PeMappingActions.hideExperts,
    onClick: () => hideExperts(),
  }
];

export const NavbarActionsLength = NavbarActions(
  () => {},
  () => {}
).length;
