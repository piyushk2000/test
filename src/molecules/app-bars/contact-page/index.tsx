import AppBarCommon from "../../app-bar-common";

type contactsHeader = {
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
  openAddContactDialog?: () => void;
  isFilter?: boolean;
  isAddIcon?: boolean;
  selectedToggleOption?: "card" | "list" | "kanban";
};

const ContactsHeader = ({
  title,
  openAddContactDialog,
  openFiltersDialog,
  toggleOptions = [],
  isFilter = false,
  isAddIcon = false,
  selectedToggleOption = "card",
}: contactsHeader) => {
  return (
    <>
      <AppBarCommon
        title={title}
        isSearch={false}
        // searchLabel="Search By Project Name, Client Name 2"
        // onSearch={(text) => console.log(text)}
        isFilter={isFilter}
        onFilterClick={openFiltersDialog}
        isUserIcon
        isAddIcon={isAddIcon}
        addIconLabel="New Contact"
        onAddIconClick={openAddContactDialog}
        isToggle={false}
        // toggleOptions={toggleOptions}
        // selectedToggleOption={selectedToggleOption}
        // onToggleOptionChange={() => {}}
        isAdvanceFilter={false}
        isIconDefine={false}
      />
    </>
  );
};

export default ContactsHeader;
