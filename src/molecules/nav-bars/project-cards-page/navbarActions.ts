import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const ProjectCardsPage = {
  PICK_NEW_ACCOUNT_MNGR: "Pick New Account Manager",
};

export const NavbarActions = (
  pickAccManagerHandler: () => void
): NavbarActionsTypes => [
  {
    title: ProjectCardsPage.PICK_NEW_ACCOUNT_MNGR,
    label: ProjectCardsPage.PICK_NEW_ACCOUNT_MNGR,
    onClick: () => pickAccManagerHandler(),
  },
];

export const NavbarActionsLength = NavbarActions(() => {}).length;
