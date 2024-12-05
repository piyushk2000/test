import { isSuperAdmin } from "../../../utils/role";
import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const PeMappingActions = {
  Invite: "Invite",
  ReInvite: "ReInvite",
  Shortlist_Reject: "Shortlist / Reject",
  Bulk_Share: "Share Profile With Client",
  expert_details: "Expert Details",
  bulkRevert: "Bulk Revert"
};

export const NavbarActions = (
  inviteClickHandler: (s: boolean) => void,
  ShortlistClickHandler: () => void,
  bulkShareClickHandler: () => void,
  expertDetailsClickHandler: () => void,
  bulkRevertClickHandler: () => void
): NavbarActionsTypes => [
  {
    title: PeMappingActions.Invite,
    label: PeMappingActions.Invite,
    onClick: () => inviteClickHandler(false),
  },
  {
    title: PeMappingActions.ReInvite,
    label: PeMappingActions.ReInvite,
    onClick: () => inviteClickHandler(true),
  },
  {
    title: PeMappingActions.Shortlist_Reject,
    label: PeMappingActions.Shortlist_Reject,
    onClick: ShortlistClickHandler,
  },
    {
      title: PeMappingActions.Bulk_Share,
      label: PeMappingActions.Bulk_Share,
      onClick: bulkShareClickHandler
  },
  {
    title: PeMappingActions.expert_details,
    label: PeMappingActions.expert_details,
    onClick: expertDetailsClickHandler
  },
  ...(isSuperAdmin() ? [{
    title: PeMappingActions.bulkRevert,
    label: PeMappingActions.bulkRevert,
    onClick: bulkRevertClickHandler
  }] : [])
];

export const NavbarActionsLength = NavbarActions(
  () => {},
  () => {},
  () => {},
  () => {},
  () => {}
).length;
