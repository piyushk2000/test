import { useContext } from "react";
import styles from "./style.module.scss";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import calenderIcon from "../../assets/images/expert/calendar_expert.png";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import EditIcon from "../../assets/images/client/edit_client.png";
import settingIcon from "../../assets/images/client/setting_black.png";
import multiUser from "../../assets/images/client/multi_user.png";
import addUser from "../../assets/images/client/add-user.png";
import addLocation from "../../assets/images/client/add-location.png";
import {
  dialogState,
  getClientsData,
} from "../../organisms/client/all-clients/types";
import { AllClientContext } from "../../organisms/client/all-clients/helper";
import { ProjectStats, TitleValueTable } from "./helper";
import { AppRoutes } from "../../constants";
import { ClientPageContext } from "../../pages/Client/helper";
import { LocalDayjs } from "../../utils/timezoneService";

type Props = getClientsData;

export default function ClientCard({
  id,
  name,
  contract_valid_till,
  type,
  fk_cem_value,
  projectsCount,
  servicedProjectsCount,
  client_specific_compliance_requirement,
  callsDone,
  compliance_start_after,
  compliance_end_before,
  compliance_description,
  compliance_email_format
}: Props) {
  const navigate = useNavigate();
  const context = useContext(AllClientContext);
  const clientPageContext = useContext(ClientPageContext);
  const setDialog = context?.setDialog;
  const setClientPageDialogs = clientPageContext?.setClientPageDialogs;
  const clientDetails = "&client_id=" + id + "&client_name=" + name;
  return (
    <div style={{ background: "white" }} className={styles.card}>
      <div className={styles.profileDetailsContainer}>
        <div className={styles.profileHeader}>
          <h3
            className={styles.projectNameHeading}
            onClick={() => {
              navigate(`/layout/clients/client-profile?id=${id}&name=${name}${fk_cem_value?.id ? `&fk_cem=${fk_cem_value.id}` : ""}`);
            }}
          >
            #{id} {name}
          </h3>
        </div>
        <div className={styles.moreDetails}>
          <TitleValueTable title="CEM" text={fk_cem_value?.name || "-"} />
          <TitleValueTable title="Type" text={type} />
          <TitleValueTable
            tooltipTitle="Contract Valid Till"
            title={
              <img
                src={calenderIcon}
                width={"15px"}
                style={{ marginBottom: "5px" }}
                alt="Calender Icon"
              />
            }
            text={contract_valid_till ? LocalDayjs(contract_valid_till).format("DD MMMM YYYY") : "-"}
            tooltipText="Contract Valid Till"
          />
        </div>
      </div>
      <div>
        <Stack justifyContent={"space-between"} direction="row">
          <ProjectStats title="Projects" text={projectsCount} link={AppRoutes.PROJECTS + "/all?page=1" + clientDetails} />
          <ProjectStats title="Calls Done" text={callsDone} link={AppRoutes.CALLS + "?page=1" + clientDetails} />
          <ProjectStats title="Serviced Projects" text={servicedProjectsCount} link={AppRoutes.PROJECTS + "/all?page=1&serviced=1&" + clientDetails} />
        </Stack>
      </div>
      <div className={styles.profileCardFooter}>
        <TooltipIcons icon={EditIcon} isIcon={true} title="Edit"
          handleClick={() =>
            setDialog &&
            setDialog((prev: dialogState) => ({
              ...prev,
              addClient:
              {
                state: true,
                isEdit: true,
                isChange: false,
                id: String(id),
                clientData:
                {
                  name,
                  type: { label: type, value: type },
                  contract_valid_till: contract_valid_till ? LocalDayjs(contract_valid_till) : null,
                  CEM: fk_cem_value ? { label: fk_cem_value.name, value: fk_cem_value.id } : null,
                  compliance_start_after: compliance_start_after ? {label: compliance_start_after, value: compliance_start_after} : null,
                  compliance_end_before: compliance_end_before ? { label: compliance_end_before, value: compliance_end_before } : null,
                  compliance_email_format: compliance_email_format || null,
                  compliance_description: compliance_description || null
                }
              },
            }))
          }
        />
        <TooltipIcons
          icon={addUser}
          isIcon={true}
          handleClick={() =>
            setDialog &&
            setDialog((prev: dialogState) => ({
              ...prev,
              addContact: { state: true, id: String(id), isChange: false },
            }))
          }
          title="Add Client Contact"
        />
        <TooltipIcons
          icon={multiUser}
          isIcon={true}
          title="View Client Contacts"
          handleClick={() =>
            navigate(`/layout/clients/client-profile?id=${id}&name=${name}&open_poc=1`)
          }
        />
        <TooltipIcons icon={settingIcon} isIcon={true} title="Settings" />
        <TooltipIcons
          icon={addLocation}
          isIcon={true}
          title="Add Billing Office"
          handleClick={() =>
            setClientPageDialogs &&
            setClientPageDialogs((prev) => ({
              ...prev,
              addOffice: {
                state: true,
                id: String(id),
                isChange: false,
                refetch: null,
                name: name
              },
            }))
          }
        />
      </div>
    </div>
  );
}
