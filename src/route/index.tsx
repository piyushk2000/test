import { isAdmin, isClient, isExpert, isInfollion, isSuperAdmin } from "../utils/role";
import adminRoutes from "./adminRoutes";
import clientRoutes from "./clientRoutes";
import expertRoutes from "./expertRoutes";
import infollionRoutes from "./infollionRoutes";
import superAdminRoutes from "./superAdmin";
import { unprotectedRoutesLayout } from "./unprotectedRoutes";

const getRoutes = () => {

  // if (isExpert()) {
  //   return expertRoutes;
  // }

  // if (isClient()) {
  //   return clientRoutes;
  // }

  // if (isInfollion()) {
  //   return infollionRoutes;
  // }

  // if (isAdmin()) {
  //   return adminRoutes;
  // }

  // if (isSuperAdmin()) {
  //   return superAdminRoutes;
  // }

  // // If role is not from the above, then only unprotectedRoutes are exposed
  // return unprotectedRoutesLayout;

  return superAdminRoutes;
}

const routes = getRoutes();

export default routes;
