import { enqueueSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";

export const handleYesBtnClickHandler = async (
  id: any,
  setBackdrop: any,
  setExpertCards: any,
  handleSubmitClose: any
) => {
  const payload = {
    id,
    action: "UndoRevert",
  };

  try {
    setBackdrop(true);
    const response = await RequestServer(
      APIRoutes.undoRefuseExpert,
      "PATCH",
      payload
    );

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      await setExpertCards();
      handleSubmitClose();
    } else {
    }
  } catch (err) {
    console.log(err);
  } finally {
    setBackdrop(false);
  }
};
