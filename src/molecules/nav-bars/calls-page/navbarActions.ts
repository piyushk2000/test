import { isAdmin, isFinance, isSuperAdmin } from "../../../utils/role";
import { NavbarActionsTypes } from "../../nav-bar-common/type";



const navbarActionsSuperAdmins = (
  SubmitPaymentRequestClickHandler: () => void,
  changeCaseCodeClickHandler: () => void
): NavbarActionsTypes => [
    {
      title: "Submit Payment Request",
      label: "Submit Payment Request",
      onClick: SubmitPaymentRequestClickHandler
    },
    {
      title: "Change Casecode",
      label: "Change Casecode",
      onClick: changeCaseCodeClickHandler,
    },
  ];

export const NavbarActions = (
  SubmitPaymentRequestClickHandler: () => void,
  changeCaseCodeClickHandler: () => void
): NavbarActionsTypes => {

  if (isFinance()) {
    return [
      {
        title: "Submit Payment Request",
        label: "Submit Payment Request",
        onClick: SubmitPaymentRequestClickHandler
      }
    ];
  }

  if (isSuperAdmin()) {
    return navbarActionsSuperAdmins(
      SubmitPaymentRequestClickHandler,
      changeCaseCodeClickHandler,
    )
  }

  if(isAdmin()) {
    return [
      {
        title: "Submit Payment Request",
        label: "Submit Payment Request",
        onClick: SubmitPaymentRequestClickHandler
      }
    ]
  }

  return [];
};

export const NavbarActionsLength = NavbarActions(
  () => { },
  () => { },
).length;
