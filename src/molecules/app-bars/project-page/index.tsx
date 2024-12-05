import AppBarCommon from "../../app-bar-common";
import { useProjectPageContext } from "../../../pages/Projects/helper";
import { filterPayload, setFilterPayload } from "../../../pages/Projects/types";
import { useNavigate } from "react-router-dom";
import { getUserId, isClient, isSuperAdmin } from "../../../utils/role";
import { SpecialAccessToProjects } from "../../../utils/specialAccess";

type projectHeader = {
  title: string;
  toggleOptions?:
  | ["card"]
  | ["list"]
  | ["kanban"]
  | ["card", "list"]
  | ["card", "kanban"]
  | ["list", "kanban"]
  | ["card", "list", "kanban"]
  | [];
  openFiltersDialog?: () => void;
  openAddProjectDialog?: () => void;
  isFilter?: boolean;
  isAddIcon?: boolean;
  selectedToggleOption?: "card" | "list" | "kanban";
};

const ProjectHeader = ({
  title,
  openAddProjectDialog,
  openFiltersDialog,
  toggleOptions = [],
  isFilter = false,
  isAddIcon = false,
  selectedToggleOption = "card",
}: projectHeader) => {
  const {
    filterPayload,
    setFilterPayload,
  }: { filterPayload: filterPayload; setFilterPayload: setFilterPayload } =
    useProjectPageContext();
  const navigate = useNavigate();
  const superAdmin = isSuperAdmin();
  const userId = getUserId() || "0"


  return (
    <>
      <AppBarCommon
        title={title}
        isSearch={isClient() ? false : true}
        searchLabel="Search by project title"
        onSearch={(text) => {
          title === "Project Details" && navigate("/layout/projects/all?page=1");
          setFilterPayload((prev) => {
            if (prev.search === text) {
              return prev;
            }

            return {
              ...prev,
              search: text,
              isFilterChange: true,
            };
          })
        }
        }
        isFilter={isClient()?false:isFilter}
        onFilterClick={openFiltersDialog}
        isUserIcon
        isAddIcon={(superAdmin || SpecialAccessToProjects((parseInt(userId)))) ? isAddIcon : false}
        addIconLabel="New Project"
        onAddIconClick={openAddProjectDialog}
        isToggle={false}
        // toggleOptions={toggleOptions}
        // selectedToggleOption={selectedToggleOption}
        // onToggleOptionChange={() => { }}
        isAdvanceFilter={isClient()?false:Boolean(filterPayload.advanceFilter)}
        isIconDefine={false}
        searchValue={filterPayload.search || ""}
      />
    </>
  );
};

export default ProjectHeader;
