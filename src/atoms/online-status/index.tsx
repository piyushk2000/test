import { useEffect, useState } from "react";

import {
  SnackbarProvider,
  enqueueSnackbar,
  closeSnackbar,
  SnackbarKey,
} from "notistack";
import { useOnlineStatus } from "../../utils/hooks/useOnlineStatus";

function OnlineStatus() {
  const onlineStatus = useOnlineStatus();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey>()

  useEffect(() => {
    if (!onlineStatus) {
      const id = enqueueSnackbar("No connection", {
        variant: "error",
        persist: true,
      });
      setSnackbarId(id)
    } else {
      if (snackbarId) {
        closeSnackbar(snackbarId);
        enqueueSnackbar("Back online", {
          variant: "success",
        });
        setSnackbarId(undefined)
      }
    }
  }, [onlineStatus]);

  return <SnackbarProvider preventDuplicate />;
}

export default OnlineStatus;
