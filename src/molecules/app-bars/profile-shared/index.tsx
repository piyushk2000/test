import { Link } from "react-router-dom";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { infoForClientAndSharedLink } from "../../../constants/infoHtml";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import AppBarCommon from "../../app-bar-common";
import { AppRoutes } from "../../../constants";

type Props = {
  isAdvanceFilter: boolean;
  searchFilter(text: string): void;
};

const ProfileSharedHeader = ({
  isAdvanceFilter,
  searchFilter
}: Props) => {
  // const {
  //   value: openFilter,
  //   setTrue: setFilerOpen,
  //   setFalse: setFilerClose,
  // } = useBoolean();
  const isLoggedIn = localStorage.getItem("authToken");
  const code = useGetParams("code");

  return (
    <>
      <AppBarCommon
        title="Profiles Shared"
        isSearch={false}
        // searchLabel="Search "
        // onSearch={(text) => {
        //   searchFilter(text);
        // }}
        // isFilter={true}
        // onFilterClick={setFilerOpen}
        isUserIcon={!!isLoggedIn}
        onAddIconClick={() => { }}
        isToggle={false}
        // toggleOptions={["card", "list"]}
        // selectedToggleOption="card"
        // onToggleOptionChange={() => {}}
        isIconDefine={false}
        isSidebar={!!isLoggedIn}
        hover_html={infoForClientAndSharedLink}
        hover_html_on_left={true}
        titleLeftComponent
        // leftComponent={
        //   <Link to={`${AppRoutes.CE_MAPPING_EXPERTS}${code ? "?code=" + code : ""}`}>
        //     <CustomBtnFilled styles={{textTransform: "none"}} label="Go to Custom Empanelments" variant="contained" />
        //   </Link>
        // }
      // isAdvanceFilter={isAdvanceFilter}
      />
    </>
  );
};

export default ProfileSharedHeader;
