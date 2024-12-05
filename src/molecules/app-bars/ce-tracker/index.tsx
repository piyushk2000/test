import AppBarCommon from "../../app-bar-common";

const CETrackerHeader = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      <AppBarCommon
        title="CE Tracker"
        isUserIcon={isLoggedIn}
        isSearch={false}
        isIconDefine={false}
      />
    </>
  );
};

export default CETrackerHeader;
