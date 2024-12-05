import { Avatar, Chip } from "@mui/material";
import DetailsWithIcon from "../../../atoms/details-with-icon/DetailsWithIcon";
import Envelope from "../../../assets/images/expert/letter_expert.png";
import PhoneCall from "../../../assets/images/expert/call_expert.png";
import "./client-profile-info.scss";
import Edit from "../../../assets/images/expert/edit.png"
import Hierarchy from "../../../assets/images/client/hierarchy.png"
import { ClientHeaderIcons, ClientMenuIcons } from "../../client-profile-header";

const ClientContactProfileInfo = () => {
  return (
    <>
      <section className="client-profile-info-section">
        <div className="client-profile-section">
          <div className="client-profile-info">
            <Avatar
              src="https://i.pravatar.cc/300"
              alt="Profile name"
              sx={{ width: 110, height: 110, marginLeft: "20px" }}
            />
            <div className="profile-detail">
              <div className="profile-name">
                <h3>Mir Azhar</h3>
                <Chip className="chip expert-chip" label="Active" />
              </div>
              <p className="profile-description">
                UI/UX Designer at Infollioan research services salary
              </p>
              <div className="project-contact">
                <DetailsWithIcon
                  title="Email"
                  icon={Envelope}
                  classNames="email"
                  text="mir.azhar@gmail.com"
                />
                <DetailsWithIcon
                  title="Mobile Number"
                  icon={PhoneCall}
                  classNames="phone-call"
                  text="+91 1234567890"
                />
              </div>
            </div>
          </div>
          <div className="client-projects">
            <p className="project">Projects</p>
            <p className="project-no" >18</p>
          </div>
          <div className="client-revenue" >
            <p className="revenue">Revenue</p>
            <p className="total-revenue">$1233</p>
          </div>
          <div className="client-profile-edit" >
            <ClientMenuIcons isIcon={true} icon={Edit} title="Edit" />
            <ClientHeaderIcons isIcon={true} icon={Hierarchy} title="Hierarchy" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientContactProfileInfo;
