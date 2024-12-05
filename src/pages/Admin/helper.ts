import { Dispatch, SetStateAction } from "react";
import { FormInputProps } from "../../organisms/admin/actions/add-admin/helper";

export type dialogOpenTypes = {
  add: boolean;
  edit: {
    state: boolean;
    defaultValues: FormInputProps | null;
    refetchAdmin: (() => Promise<void>) | null;
  };
  changePass: {
    state: boolean;
    admin_id: string | null;
    admin_name: string | null;
  };
  changeDashboard: {
    state: boolean;
    admin_id: string | null;
    dashboards: any;
    refetchAdmin: (() => Promise<void>) | null;
  };
  deactivate: {
    state: boolean;
    admin_id: string | null;
    admin_name: string | null;
  };
  activate: {
    state: boolean;
    admin_id: string | null;
    admin_name: string | null;
  };
};

export type SetDialogOpenTypes = Dispatch<SetStateAction<dialogOpenTypes>>;

export type alertBoxTypes = { state: boolean; isChange: boolean };

export type SetAlertBoxTypes = Dispatch<SetStateAction<alertBoxTypes>>;

export const handleClose = (
  setAlertBox: any,
  isChange: any,
  setDialogOpen: any
) => {
  if (isChange) {
    setAlertBox({ isChange: true, state: true });
  } else {
    handleSubmitClose(setDialogOpen);
  }
};

export const handleAlertBoxClose = (setAlertBox: any) => {
  setAlertBox((prev: alertBoxTypes) => ({ ...prev, state: false }));
};

export const handleSubmitClose = (setDialogOpen: SetDialogOpenTypes) => {
  setDialogOpen(() => ({
    add: false,
    edit: {
      state: false,
      defaultValues: null,
      refetchAdmin: null,
    },
    changePass: {
      state: false,
      admin_id: null,
      admin_name: null,
    },
    changeDashboard: {
      state: false,
      admin_id: null,
      admin_name: null,
      dashboards: null,
      refetchAdmin: null,
    },
    deactivate: {
      state: false,
      admin_id: null,
      admin_name: null,
    },
    activate: {
      state: false,
      admin_id: null,
      admin_name: null,
    },
  }));
};

export const handleAlertBoxYesClick = (
  setAlertBox: any,
  setDialogOpen: any
) => {
  setAlertBox({ state: false, isChange: false });
  handleSubmitClose(setDialogOpen);
};
