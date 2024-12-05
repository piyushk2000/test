import { Link } from "react-router-dom";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { AppRoutes } from "../../../constants";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import AppBarCommon from "../../app-bar-common";

const CEMappingExpertHeader = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const code = useGetParams("code");

  return (
    <>
      <AppBarCommon
        title="Custom Empanelments"
        isUserIcon={isLoggedIn}
        isSearch={false}
        isSidebar={!!isLoggedIn}
        isIconDefine={false}
        titleLeftComponent
        // leftComponent={
        //   <Link to={`${AppRoutes.PROJECT_PE_MAPPING}${code ? "?code=" + code : ""}`}>
        //     <CustomBtnFilled  styles={{textTransform: "none"}} label="Go to Shared Profile" variant="contained" />
        //   </Link>
        // }
      />
    </>
  );
};

export default CEMappingExpertHeader;
