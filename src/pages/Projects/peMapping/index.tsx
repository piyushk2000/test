import FullPageLoading from "../../../atoms/full-page-loading";
import ProjectPeMapping from "../../../organisms/project/project-pe-mapping";
import { useLocation } from "react-router-dom";

const PEExpertMapping = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project_id = queryParams.get("project_id");
  const expert_id = queryParams.get("expert_id");

  return (
    <>
      <FullPageLoading />
      {project_id && (
        <ProjectPeMapping project_id={project_id} expert_id={expert_id} />
      )}
    </>
  );
};

export default PEExpertMapping;
