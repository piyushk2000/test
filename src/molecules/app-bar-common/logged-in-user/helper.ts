import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";

export const handleLogoutClickHandler = async (
  enqueueSnackbar: any,
  navigate: any,
  setloading?: (loading: boolean) => void
) => {
  const id = localStorage.getItem("id");

  setloading && setloading(true)
  const logoutResponse = await RequestServer(APIRoutes.logout + id, "post");
  setloading && setloading(false)
  if (logoutResponse.message === "Logout successful!") {
    localStorage.clear();
    navigate("/login");
    enqueueSnackbar("You have been Logout successful", {
      variant: "success",
    });
  }
};