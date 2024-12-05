import { Button, CircularProgress } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import CustomBtnFilled from "../form-molecules/CustomBtnFilled";

type Props = {
  loading: boolean;
  controller?: any;
};

export default function Loading({ loading, controller }: Props) {
  function handleCancelClickHandler() {
    if (controller && controller.control && controller.for === "file-upload") {
      controller.control.abort();
      controller.setSelectedFile(null);
    }
  }
  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress sx={{color:"#EC9324"}} />
          {controller && controller.control && (
            <CustomBtnFilled
              label="Cancel"
              variant="contained"
              buttonType="button"
              onClick={handleCancelClickHandler}
            />
          )}
        </div>
      ) : null}
    </>
  );
}
