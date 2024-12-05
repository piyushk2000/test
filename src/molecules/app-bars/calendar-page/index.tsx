import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../../utils/role";

type Props = {
  projectDetails: any;
  component: JSX.Element
};

export default function CalenderHeader({ projectDetails, component }: Props) {
  const isMobile = useIsMobile()

  function getTitle() {
    let projectTitle = ""
    let projectId = ""

    if (projectDetails) {
      if (isSuperAdmin() || isAdmin()) {
        projectTitle = projectDetails[0].topic
      } else {
        projectTitle = projectDetails[0].external_topic
      }
      projectId = projectDetails[0].id;
    }

    if (isMobile) {
      if (isSuperAdmin() || isAdmin()) {
        return ""
      } else {
        return "Calendar"
      }
    } else {
      if (isClient()) {
        return "Calendar " + (projectDetails
          ? `for #${projectId}: ${projectTitle}`
          : "")
      } else if (isExpert()) {
        return "Calendar " +
          (projectDetails
            ? `for #${projectId}: ${projectTitle}`
            : "")
      } else {
        return "Calendar " +
          (projectDetails
            ? `for #${projectId}: ${projectTitle} (${projectDetails[0].client_name})`
            : "")
      }
    }
  }
  return (
    <Box sx={{ pb: "24px" }}>
      <AppBarCommon
        title={getTitle()}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
        component={component}
        isExtraComponent
      />
    </Box>
  );
}
