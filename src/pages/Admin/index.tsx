import { Outlet, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import DialogModal from "../../atoms/dialog";
import {
  alertBoxTypes,
  dialogOpenTypes,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleSubmitClose,
} from "./helper";
import { useState } from "react";
import FormCloseWarningDialog from "../../molecules/form-close-warning/index";
import AddAdminForm from "../../organisms/admin/actions/add-admin";
import AdminHeader from "../../molecules/app-bars/admin-page";
import EditAdminForm from "../../organisms/admin/actions/edit-admin";
import { AdminContext } from "./context";
import ChangeAdminPass from "../../organisms/admin/actions/change-password";
import WarningDialog from "../../molecules/form-close-warning/index";
import { deactivateAdmin } from "../../organisms/admin/actions/deactivate";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import FullPageLoading from "../../atoms/full-page-loading";
import { activateAdmin } from "../../organisms/admin/actions/activate";
import AdminDashboard from "../../organisms/admin/actions/dashboard-form/index";

const Admin = () => {
  const [dialogOpen, setDialogOpen] = useState<dialogOpenTypes>({
    add: false,
    edit: { state: false, defaultValues: null, refetchAdmin: null },
    changePass: { state: false, admin_id: null, admin_name: null },
    changeDashboard: { state: false, admin_id: null, dashboards: null , refetchAdmin: null},
    deactivate: { state: false, admin_id: null, admin_name: null },
    activate: { state: false, admin_id: null, admin_name: null },
  });
  const [openAlertBox, setAlertBox] = useState<alertBoxTypes>({
    state: false,
    isChange: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  function onNewClientClick() {
    setDialogOpen((prev: dialogOpenTypes) => ({ ...prev, add: true }));
  }

  return (
    <AdminContext.Provider
      value={{
        setDialogOpen,
      }}
    >
      <FullPageLoading />
      <Box sx={{ px: "24px" }}>
        {/* Project Header */}
        <AdminHeader
          onFilterClick={() => { }}
          onNewClientClick={onNewClientClick}
          onSearch={(text: string) => {
            if (text) {
              setSearchParams({ query: text })
            }
            else {
              setSearchParams((params) => {
                params.delete('query');
                return params;
              });
            }
          }}
        />

        <Outlet />

        {/* Add Employee Dialog */}
        {dialogOpen.add &&
          <DialogModal
            isOpen={dialogOpen.add}
            handleClose={() =>
              handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)
            }
            title={"Add Employee"}
            children={
              <AddAdminForm
                handleClose={() =>
                  handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)
                }
                handleSubmitClose={() =>
                  handleAlertBoxYesClick(setAlertBox, setDialogOpen)
                }
                isChange={setAlertBox}
              />
            }
          />
        }

        {/* Edit Employee Dialog */}
        {dialogOpen.edit.state &&
          <DialogModal
            isOpen={dialogOpen.edit.state}
            title="Edit Employee"
            handleClose={() => handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)}
          >
            <EditAdminForm
              handleClose={() =>
                handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)
              }
              handleSubmitClose={() =>
                handleSubmitClose(setDialogOpen)
              }
              defaultValues={dialogOpen.edit.defaultValues}
              isChange={setAlertBox}
              refetch={dialogOpen.edit.refetchAdmin}
            />
          </DialogModal>
        }

        {/* Change Password Admin */}
        {dialogOpen.changePass.state &&
          <DialogModal
            isOpen={dialogOpen.changePass.state}
            title={dialogOpen.changePass.admin_name ? `${dialogOpen.changePass.admin_name}: Change Password` : "Change Password"}
            handleClose={() => handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)}
          >
            <ChangeAdminPass
              handleClose={() =>
                handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)
              }
              handleSubmitClose={() =>
                handleSubmitClose(setDialogOpen)
              }
              isChange={setAlertBox}
              admin_id={dialogOpen.changePass.admin_id}
            />
          </DialogModal>
        }
        
        {/* Edit DashBoard */}
        {dialogOpen.changeDashboard.state &&
          <DialogModal
            isOpen={dialogOpen.changeDashboard.state}
            title={"Manage Dashboard"}
            handleClose={() => handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)}
          >
            <AdminDashboard
              handleClose={() =>
                handleClose(setAlertBox, openAlertBox.isChange, setDialogOpen)
              }
              refetchAdmin={dialogOpen.changeDashboard.refetchAdmin}
              admin_id={dialogOpen.changeDashboard.admin_id}
              handleSubmitClose={() =>
                handleSubmitClose(setDialogOpen)
              }
              dashboards={dialogOpen?.changeDashboard?.dashboards || ""}
              isChange={setAlertBox}
            />
          </DialogModal>
        }

        {/* Form Close Warning Dialog */}
        <FormCloseWarningDialog
          handleClose={() => handleAlertBoxClose(setAlertBox)}
          handleYesClick={() =>
            handleAlertBoxYesClick(setAlertBox, setDialogOpen)
          }
          open={openAlertBox.state}
        />

        {/* Deactivate warning */}
        {
          dialogOpen.deactivate.state &&
          <WarningDialog
            open={dialogOpen.deactivate.state}
            handleClose={() => handleSubmitClose(setDialogOpen)}
            handleYesClick={async () => {
              dialogOpen.deactivate.admin_id && dialogOpen.deactivate.admin_name &&
                await deactivateAdmin(
                  dialogOpen.deactivate.admin_id,
                  dialogOpen.deactivate.admin_name,
                  enqueueSnackbar,
                  () => handleSubmitClose(setDialogOpen),
                  setLoading
                )
            }}
            text={`Are you sure you want to deactivate the Admin ${dialogOpen.deactivate.admin_name || ""}?`}
          />
        }
        {/* activate warning */}
        {
          dialogOpen.activate.state &&
          <WarningDialog
            open={dialogOpen.activate.state}
            handleClose={() => handleSubmitClose(setDialogOpen)}
            handleYesClick={async () => {
              dialogOpen.activate.admin_id && dialogOpen.activate.admin_name &&
                await activateAdmin(
                  dialogOpen.activate.admin_id,
                  dialogOpen.activate.admin_name,
                  enqueueSnackbar,
                  () => handleSubmitClose(setDialogOpen),
                  setLoading
                )
            }}
            text={`Are you sure you want to activate the Admin ${dialogOpen.activate.admin_name || ""}?`}
          />
        }
      </Box>
    </AdminContext.Provider>
  );
};

export default Admin;
