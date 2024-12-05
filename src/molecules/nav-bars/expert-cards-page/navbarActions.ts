import { isAdmin, isSuperAdmin } from "../../../utils/role";
import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const NavbarActions = (
  addToProjectClickHandler: () => void,
  addToStagingClickHandler: () => void
): NavbarActionsTypes => {
  const Actions = (isAdmin() || isSuperAdmin()) ?
  [
    {
      title: "Add to Project",
      label: "+ Add to Project",
      onClick: addToProjectClickHandler,
    },
    {
      title: "Add to Staging",
      label: "+ Add to Staging",
      onClick: addToStagingClickHandler
    }
  ] : [
    {
      title: "Add to Project",
      label: "+ Add to Project",
      onClick: addToProjectClickHandler,
    }
  ]

  return Actions;
}

export const NavbarActionsLength = NavbarActions(() => {}, () => {}).length;
