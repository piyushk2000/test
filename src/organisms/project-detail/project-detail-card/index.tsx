import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./project-detail-cards.scss";
import { Box, Stack, Typography } from "@mui/material";
import { useProjectDetailsContext } from "../../../atoms/project-details/projectContext";
import { formatData, formatDate, getDomainString } from "./helper";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomChip } from "../../../atoms/chips/CustomChip";
import {
  projectApiDataItem,
  setDialogTypes,
} from "../../../pages/Projects/types";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import DialogModal from "../../../atoms/dialog";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { useProjectPageContext } from "../../../pages/Projects/helper";
import { LocalDayjs } from "../../../utils/timezoneService";

type props = {
  id: string | null;
  openAddAgenda: () => void;
  isAgenda: number | null;
  groupList: any;

}

const ProjectDetailCard = ({
  id,
  openAddAgenda,
  isAgenda,
  groupList,
}: props) => {
  const { defaultValues } = useProjectDetailsContext();
  const projectDefault: projectApiDataItem | null =
    defaultValues.projectDetails;

  const { value: descriptionModalOpen, setValue: setDescriptionModalOpen } =
    useBoolean();

  const { setDialog }: { setDialog: setDialogTypes } = useProjectPageContext();


  const USER_ID = localStorage.getItem("id");
  const project_status = useGetParams("project_status");
  const is_admin = isSuperAdmin() || isAdmin()

  const isUserAdminOfGroup =
    projectDefault?.fk_group && groupList
      ? groupList
        .find((item: any) => item.id === projectDefault?.fk_group)
        ?.sublabel?.split(",")
        .includes(USER_ID)
      : false;

  const isAccountManager = isAdmin()
    ? (projectDefault?.account_manager_value?.id?.toString() || "") === USER_ID
      ? true
      : false
    : false;

  const navigate = useNavigate();
  return (
    <section className="project-details-section">
      <Typography
        variant="h3"
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          textTransform: "capitalize",
        }}
      >
        {isClient() ? projectDefault?.external_topic : `#${id || ""}: ${projectDefault?.topic}`}
      </Typography>
      <Typography
        sx={{
          mb: "0.5rem",
          fontSize: "14px",
        }}
      >
        {!isClient() && (
          <>{`External Topic: ${projectDefault?.external_topic}`}</>
        )}
      </Typography>

      {(isSuperAdmin() ||
        isUserAdminOfGroup ||
        isAccountManager ||
        isClient()) && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ gap: "12px", flexWrap: "wrap" }}
            marginBottom={isClient() ? 2 : 4}
          >
            <CustomChip
              label={"Calls Done: " + projectDefault?.call_count}
              color="rgba(107, 87, 115, 1)"
              bg="rgba(107, 87, 115, 0.1)"
              onClick={() =>
                navigate(
                  AppRoutes.CALLS +
                  "?page=1" +
                  "&project_id=" +
                  projectDefault?.id
                )
              }
            />

            <CustomChip
              label={"Profiles Shared: " + projectDefault?.profile_shared}
              color="rgba(77, 98, 124, 1)"
              bg="rgba(77, 98, 124, 0.1)"
              onClick={() =>
                navigate(
                  AppRoutes.PROJECT_PE_MAPPING + "?project_id=" + projectDefault?.id + "&project_title=" + projectDefault?.topic + "&status=" + project_status
                )
              }
            />

            <CustomChip
              label={
                isClient()
                  ? "Billed: $" + projectDefault?.total_revenue
                  : "Revenue: $" + projectDefault?.total_revenue
              }
              color="rgba(24, 168, 72, 1)"
              bg="rgba(24, 168, 72, 0.1)"
            />
          </Stack>
        )}

      <Box>
        <Grid container spacing={1} rowSpacing={"12px"}>
          <Grid item container xs={12}>
            {isClient() ? (
              <>
                <KeyValue label="Agenda:">
                  <VisibilityIcon
                    sx={{
                      color: "#EC9324",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      margin: "0",
                    }}
                    onClick={openAddAgenda}
                  />
                </KeyValue>
                {projectDefault?.case_code && <KeyValue
                  label="Case Codes:"
                  value={projectDefault?.case_code?.join(", ")}
                />}
              </>
            ) : (
              <KeyValue
                label="Created On:"
                value={formatDate(projectDefault?.created_at)}
              />
            )}

            {projectDefault?.type &&
              <KeyValue
                label="Type:"
                value={projectDefault?.type}
              />
            }


            {!isClient() && (
              <>
                <KeyValue label="Agenda:">
                  {isAgenda ? (
                    <VisibilityIcon
                      sx={{
                        color: "#EC9324",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        margin: "0",
                      }}
                      onClick={openAddAgenda}
                    />
                  ) : (
                    <AddIcon onClick={openAddAgenda} />
                  )}
                </KeyValue>
                {/* <KeyValue
                  label="Closed On:"
                  value={formatDate(projectDefault?.closed_on)}
                /> */}
              </>
            )}

          </Grid>
          <Grid item container xs={12}>
            <KeyValue
              label="Received On:"
              value={LocalDayjs(projectDefault?.receiving_date).format("DD/MM/YYYY hh:mm A")}
            />
            <KeyValue
              label="Account Manager:"
              value={projectDefault?.account_manager_value?.name || ""}
            />
            {isClient() && (
              <KeyValue
                label="Project Status:"
                value={defaultValues.projectDetails?.status || "-"}
              />
            )}
            {!isClient() && (
              projectDefault?.description ? (
                <KeyValue label="External Description:">
                  <VisibilityIcon
                    sx={{
                      color: "#EC9324",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setDescriptionModalOpen(true)}
                  />
                </KeyValue>
              ) : (
                <KeyValue label="External Description:">
                  <AddIcon
                    onClick={() => setDialog((prev) => ({
                      ...prev,
                      editProject: {
                        state: true,
                        id: id ? id.toString() : '',
                        isChange: false,
                        apiData: projectDefault,
                      },
                    }))}
                  />
                </KeyValue>
              ))}

          </Grid>
          <Grid item container xs={12}>
            <KeyValue
              label="Billing Office:"
              value={`${projectDefault?.client_name
                ? projectDefault?.client_name + ", "
                : ""
                }${projectDefault?.billing_office_value?.name
                  ? projectDefault?.billing_office_value?.name
                  : ""
                }`}
            />
            <KeyValue
              label="Expert Geography:"
              value={projectDefault?.expert_geographies_value
                ?.map((e) => e.name)
                ?.join(", ")}
              // valueSize={[6, 9, 7]}
            />
            {is_admin &&
              <KeyValue label="Parent Project:">
                <Typography sx={projectDefault?.meta?.parent_id ? {textDecoration: 'underline',color: '#EC9324', cursor:'pointer'} : {}} onClick={() => {
                  if (projectDefault?.meta?.parent_id && projectDefault?.meta?.parent_id!=id ) {
                   navigate(`/layout/projects/projectdetails?id=${projectDefault?.meta?.parent_id}&page=1`) 
                }}}>
                  {projectDefault?.meta?.parent_id || "N/A"}
                </Typography>
              </KeyValue>
            }
          </Grid>

          {!isClient() &&
            <Grid item container xs={12}>
              {projectDefault?.target_companies && (
                <KeyValue
                  label="Target Companies:"
                  value={projectDefault?.target_companies}
                // valueSize={[6, 9, 7]}
                />
              )}
              <KeyValue
                label="Group Name:"
                value={
                  projectDefault?.fk_group && groupList
                    ? groupList.find(
                      (item: any) => item.id === projectDefault?.fk_group
                    )?.label
                    : "N/A"
                }
              />
            </Grid>
          }



          {projectDefault?.client_contacts_value &&
            projectDefault?.client_contacts_value?.length > 0 && (
              <Grid item container xs={12}>
                <KeyValue
                  label="Client Contacts:"
                  value={formatData(projectDefault?.client_contacts_value)}
                  valueSize={[6, 9, 10.4]}
                />
              </Grid>
            )}


          {!isClient() && (
            <Grid item container xs={12}>
              <KeyValue
                label="Domains:"
                value={getDomainString(projectDefault)}
                valueSize={[6, 9, 10.4]}
              />
            </Grid>
          )}



          {!isClient() && projectDefault?.case_code && (
            <Grid item container xs={12}>
              <KeyValue
                label="Case Codes:"
                value={projectDefault?.case_code?.join(", ")}
                valueSize={[6, 9, 10.4]}
              />
            </Grid>
          )}

          {!isClient() && (
            <Grid item container xs={12}>
              <KeyValue
                label="Research Analysts:"
                value={
                  projectDefault?.research_analysts
                    ? formatData(projectDefault?.research_analysts_value)
                    : ""
                }
                valueSize={[6, 9, 10.4]}
              />
            </Grid>
          )}

          {projectDefault?.offlimit_topics &&
            <Grid item container xs={12}>
              <KeyValue
                label="Off Limit Topics:"
                value={
                  projectDefault?.offlimit_topics
                }
                valueSize={[6, 9, 10.4]}
              />
            </Grid>
          }

          {projectDefault?.offlimit_companies &&
            <Grid item container xs={12}>
              <KeyValue
                label="Off Limit Companies:"
                value={
                  projectDefault?.offlimit_companies
                }
                labelSize={[6, 3, 1.6]}
                valueSize={[6, 9, 10.4]}
              />
            </Grid>
          }
        </Grid>
      </Box>
      {
        projectDefault?.description ? (
          <DialogModal
            isOpen={descriptionModalOpen}
            handleClose={() => setDescriptionModalOpen(false)}
            title="Description"
          >
            <Box pt={2} px={1.5}>
              <RichTextDisplayer text={projectDefault.description} />
            </Box>
          </DialogModal>
        ) : null
      }
    </section >
  );
};
export default ProjectDetailCard;

function KeyValue({
  label,
  value,
  children,
  labelSize,
  valueSize,
}: {
  label: string;
  value?: string;
  children?: JSX.Element;
  labelSize?: [number, number, number];
  valueSize?: [number, number, number];
}) {
  return (
    <>
      <Grid
        item
        xs={labelSize ? labelSize[0] : 6}
        sm={labelSize ? labelSize[1] : 3}
        marginBottom={{ xs: "10px", md: "0" }}
        md={labelSize ? labelSize[2] : 1.6}
      >
        <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
          {label}
        </Typography>
      </Grid>
      <Grid
        item
        xs={valueSize ? valueSize[0] : 6}
        sm={valueSize ? valueSize[1] : 9}
        md={valueSize ? valueSize[2] : 2.2}
        alignItems={"center"}
      >
        {value ? (
          <Typography sx={{ fontSize: "14px" }}>{value}</Typography>
        ) : (
          <div style={{ height: "20px" }}>{children}</div>
        )}
      </Grid>
    </>
  );
}

function AddIcon({ onClick }: { onClick: () => void }) {
  return (
    <Box sx={{ height: "21px" }}>
      <AddCircleIcon
        onClick={onClick}
        sx={{
          color: "#EC9324",
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      />
    </Box>
  );
}
