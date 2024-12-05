import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import {
  AllClientContext,
} from "../../../organisms/client/all-clients/helper";
import { useContext } from "react";
import {
  setApiDataState,
} from "../../../organisms/client/all-clients/types";
import { isSuperAdmin } from "../../../utils/role";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { useClientPageContext } from "../../../pages/Client/helper";

type Props = {
  title: string;
  openAddClientDialog?: () => void | null;
  toggleOptions?:
  | ["card"]
  | ["list"]
  | ["kanban"]
  | ["card", "list"]
  | ["card", "kanban"]
  | ["list", "kanban"]
  | ["card", "list", "kanban"]
  | [];

  selectedToggleOption?: "card" | "list" | "kanban";
  fromClientDetailPage?: boolean;
  id?: string;
  refetch?: () => Promise<void>;
  name?: string | null;
  isSearch?: boolean
};
export default function ClientHeader({
  title,
  openAddClientDialog,
  toggleOptions = [],
  selectedToggleOption = "card",
  fromClientDetailPage,
  id,
  refetch,
  name,
  isSearch = true
}: Props) {
  const context = useContext(AllClientContext);
  const { setClientPageDialogs } = useClientPageContext();
  let setData: setApiDataState;
  const isMobile = useIsMobile();

  if (context) {
    setData = context.setData;
  }
  const superAdmin = isSuperAdmin();

  const openDialog = () => {
    setClientPageDialogs && id && refetch && name &&
      setClientPageDialogs((prev) => ({
        ...prev,
        addOffice: { ...prev.addOffice, state: true, id, refetch, name: name },
      }))
  }

  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title={title}
        isSearch={isSearch}
        isToggle={false}
        // isToggle={toggleOptions.length > 0}
        // toggleOptions={toggleOptions}
        // selectedToggleOption={selectedToggleOption}
        // onToggleOptionChange={() => { }}
        searchLabel="Search by client name"
        onSearch={(text: string) =>
          setData((prev) => {
            if (text === prev.filter.search) {
              return prev;
            }

            return {
              ...prev,
              filter: {
                ...prev.filter,
                search: encodeURIComponent(text),
                isFilterChange: true,
              },
            };
          })
        }
        isAddIcon={superAdmin ? Boolean(openAddClientDialog) ? true : fromClientDetailPage ? true : false : false}
        isUserIcon
        addIconLabel={fromClientDetailPage ? "Add Office" : "Add Client"}
        onAddIconClick={fromClientDetailPage ? openDialog : openAddClientDialog}
        isIconDefine={false}
      />
    </Box>
  );
}
