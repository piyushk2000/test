import Grid from "@mui/material/Grid";
import "./expert-profile-sidebar.scss";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import Attachment from "../../assets/images/expert/attachment.png";
import Timeline from "../../assets/images/expert/timeline.png";
import BankDetail from "../../assets/images/expert/bank-detail.png";
import { isExpert } from "../../utils/role";

const ExpertProfileSidebar = (props: any) => {
  const is_expert = isExpert();

  return (
    <Grid className="sidebar-btns" item xs={12} md={9} lg={8} xl={6}>
      <TooltipIcons
        icon={Attachment}
        isIcon={true}
        title="Attachment"
        handleClick={props.toggleAttachment}
      />
      {!is_expert &&
        <TooltipIcons
          icon={Timeline}
          isIcon={true}
          title="Timeline"
          handleClick={props.toggleTimeline}
        />
      }

      <TooltipIcons
        icon={BankDetail}
        isIcon={true}
        title="Bank Details"
        handleClick={props.toggleBankDetailsSection}
      />

      {/* <TooltipIcons
        icon={Timeline2}
        isIcon={true}
        title="Timeline"
        handleClick={props.toggleTimeline}
      /> */}
    </Grid>
  );
};
export default ExpertProfileSidebar;
