import AppBarCommon from "../../app-bar-common";

const ModerateHeader = () => {
  return (
    <AppBarCommon
      title="Moderate"
      isSearch={true}
      searchLabel="Search By Name, Expertise, Status"
      onSearch={(text) => console.log(text)}
      isFilter
      isUserIcon
      isToggle={false}
      // toggleOptions={["card", "list"]}
      // selectedToggleOption={"card"}
      // onToggleOptionChange={() => {}}
      isIconDefine={false}
    />
  );
};

export default ModerateHeader;
