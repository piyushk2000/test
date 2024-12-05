import { Grid, Typography } from "@mui/material";
import { useProfileSharedContext } from "./context";
import Loading from "../../atoms/loading";
import { AppRoutes } from "../../constants";
import { Link } from "react-router-dom";

export const TitleValueProject = ({
  title,
  value,
  link_value
}: {
  title: string;
  value: string | number;
  link_value?: string;
}) => {
  return (
    <Grid item container xs={12}>
      <Grid item xs={6}>
        <p>{title}</p>
      </Grid>
      <Grid item xs={6}>
        {
          link_value ?
            <Link
              to={link_value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography sx={{
                "&:hover,&:focus": {
                  textDecoration: "underline",
                  color: "rgb(236, 147, 36)"
                }, fontWeight: "500"
              }}>{value}</Typography>
            </Link> :
            <p>{value}</p>
        }
      </Grid>
    </Grid>
  );
};

const ProjectDetailsCard = ({ isOpen }: { isOpen: boolean }) => {
  const { projectId, projectDetails } = useProfileSharedContext();

  return (
    <>
      {projectDetails && isOpen ? (
        <Grid container padding={"1rem"} sx={{ "& p": { fontSize: "14px" } }}>
          <Grid item xs={12}>
            <Link
              to={`${AppRoutes.PROJECT_DETAILS}?id=${projectId}&page=1`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                sx={{
                  cursor: "pointer",
                  "&:hover,&:focus": {
                    textDecoration: "underline",
                    color: "rgb(236, 147, 36)"
                  },
                  textTransform: "capitalize"
                }}

                fontWeight="600"
              >
                {projectDetails?.external_topic}
              </Typography>
            </Link>
          </Grid>
          <TitleValueProject
            title="ID:"
            value={projectDetails?.id ? `#${projectDetails?.id}` : "-"}
            link_value={`${AppRoutes.PROJECT_DETAILS}?id=${projectId}&page=1`}
          />
          <TitleValueProject
            title="Calls Done:"
            value={projectDetails?.call_count || "-"}
            link_value={projectDetails?.call_count ? AppRoutes.CALLS + "?page=1&project_id=" + projectId : undefined}
          />
          <TitleValueProject
            title="Billable Amount:"
            value={projectDetails?.total_revenue ? `$${projectDetails.total_revenue}` : "-"}
          />
        </Grid >
      ) : (
        <Loading loading={!!projectDetails} />
      )}
    </>
  );
};

export default ProjectDetailsCard;
