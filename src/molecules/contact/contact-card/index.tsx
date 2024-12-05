import Avatar from "@mui/material/Avatar";
import defaultImage from "../../../assets/images/expert/default_profle_image.png";
import Box from "@mui/material/Box";
import {
  contactCardContainer,
  contactCardContent,
  contactCardHeader,
} from "./style";
import Chip from "@mui/material/Chip";
import ContactCardMenu from "./menu";
import callIcon from "../../../assets/images/expert/call_expert.png";
import letterIcon from "../../../assets/images/expert/letter_expert.png";
import { contactData } from "../../../organisms/contacts/allContacts/types";
import { useLocation } from "react-router-dom";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { ProjectStats } from "../../client-card/helper";
import Stack from "@mui/material/Stack";
import { AppRoutes } from "../../../constants";

type Props = {
  data: contactData;
  openEditContact: (id: number) => void;
};

const ContactCard = ({ data , openEditContact}: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("name");
  return (
    <Box sx={contactCardContainer}>
      <Box sx={contactCardHeader}>
        <Box>
          <Avatar className="img" src={defaultImage} />
          <BoxFlex sx={{ flexDirection: "column", gap: "0.25rem !important", justifyContent: "flex-start !important", alignItems: "flex-start !important" }}>
            <Chip label="Active" />
            {data.is_compliance_officer &&
              <Chip sx={{ fontWeight: "500", fontSize: "12px", backgroundColor: "var(--primary-color)" }} label="Compliance Officer" />
            }
          </BoxFlex>

        </Box>
        <ContactCardMenu contact_email={data.email} openEditContact={() => openEditContact(data.id)} />
      </Box>
      <Box sx={contactCardContent}>
        <BoxFlex sx={{ flexDirection: "column", alignItems: "flex-start",gap: "0.25rem", mb: '1rem' }}>
          <p className="name">{data.name}</p>
          <p className="small">{data.designation}</p>
          <p className="small">{company || ""}</p>
          <div className="iconContainer">
            <img src={letterIcon} className="icon" alt="letter icon" />{" "}
            <p className="small">{data.email}</p>
          </div>
          <div className="iconContainer">
            <img src={callIcon} className="icon rotate" alt="call icon" />{" "}
            <p className="small ">{data.mobile}</p>
          </div>
        </BoxFlex>
        <Stack justifyContent={"space-between"} direction="row">
          <ProjectStats
            title={"Total Projects"}
            text={data.total_projects ? data.total_projects.split(",").length : "0"}
            link={data.total_projects ? `${AppRoutes.PROJECTS}/all?page=1&client_projects=${data.total_projects}` : undefined}
          />
          <ProjectStats
            title={"Serviced Projects"}
            text={data.serviced_projects ? data.serviced_projects.split(",").length : "0"}
            link={data.serviced_projects ? `${AppRoutes.PROJECTS}/all?page=1&client_projects=${data.serviced_projects}` : undefined}
          />
          <ProjectStats
            title={"Calls Taken"}
            text={data.calls_taken ? data.calls_taken.split(",").length :  "0"}
            link={data.calls_taken ? `${AppRoutes.CALLS}?call_ids=${data.calls_taken}` : undefined}
          />
          <ProjectStats
            title={"Revenue Done"}
            text={data.revenue_done == '0' ? "0" : `$ ${data.revenue_done}`}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactCard;
