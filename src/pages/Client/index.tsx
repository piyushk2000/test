import React from "react";
import { Outlet } from "react-router-dom";
import { AlertNBackdrop, ClientPageDialogStates, FilterPayload } from "./types";
import DialogModal from "../../atoms/dialog";
import AddBillingOffice from "../../organisms/client/all-clients/add-billing-office";
import WarningDialog from "../../molecules/form-close-warning";
import BackdropComponent from "../../atoms/backdropComponent";
import {
  ClientPageContext,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleSubmitClose,
  setFormChange,
} from "./helper";
import EditBillingOffice from "../../organisms/client/all-clients/edit-billing-office";
import PageLayout from "../../atoms/page-layout";
import FullPageLoading from "../../atoms/full-page-loading";

export default function ClientSearch() {
  const [clientDialogOpen, setClientPageDialogs] =
    React.useState<ClientPageDialogStates>({
      addOffice: { state: false, isChange: false, id: null, refetch: null, name: null },
      editOffice: { state: false, isChange: false, client_id: null, refetch: null, name: null, defaultValues: null, office_id: null },
    });
  const [alertNBackdrop, setAlertNBackdrop] = React.useState<AlertNBackdrop>({
    alert: false,
    backdrop: false,
  });
  const [filterPayload, setFilterPayload] = React.useState<FilterPayload>({
    bcgTab: 6, // default value of last 6 months,
    isFilterChange: false
  })

  return (
    <>
      <ClientPageContext.Provider value={{ setClientPageDialogs, filterPayload, setFilterPayload }}>
        <PageLayout>
          <FullPageLoading />
          <Outlet />
        </PageLayout>
      </ClientPageContext.Provider>

      {/* Add Billing Office */}

      {clientDialogOpen.addOffice.state &&
        <DialogModal
          title={`${clientDialogOpen.addOffice.name}: Add Billing Office`}
          isOpen={clientDialogOpen.addOffice.state}
          handleClose={() =>
            handleClose(
              clientDialogOpen.addOffice.isChange,
              setAlertNBackdrop,
              setClientPageDialogs
            )
          }
        >
          <AddBillingOffice
            handleClose={() => {
              handleClose(
                clientDialogOpen.addOffice.isChange,
                setAlertNBackdrop,
                setClientPageDialogs
              );
            }}
            setFormChange={() => {
              setFormChange(setClientPageDialogs, "addOffice");
            }}
            handleSubmitClose={() => {
              handleSubmitClose(setClientPageDialogs);
            }}
            id={clientDialogOpen.addOffice.id}
            setBackdrop={(bool: boolean) =>
              setAlertNBackdrop((prev) => ({ ...prev, backdrop: bool }))
            }
            refetch={clientDialogOpen.addOffice.refetch}
          />
        </DialogModal>
      }


      {/* Edit Billing Form */}

      {clientDialogOpen.editOffice.state &&
        <EditBillingOffice
          isOpen={clientDialogOpen.editOffice.state}
          handleClose={() => handleClose(
            clientDialogOpen.editOffice.isChange,
            setAlertNBackdrop,
            setClientPageDialogs
          )}
          setFormChange={() => {
            setFormChange(setClientPageDialogs, "editOffice");
          }}
          handleSubmitClose={() => {
            handleSubmitClose(setClientPageDialogs);
          }}
          clientName={clientDialogOpen.editOffice.name || ""}
          setBackdrop={(bool: boolean) =>
            setAlertNBackdrop((prev) => ({ ...prev, backdrop: bool }))
          }
          refetch={clientDialogOpen.editOffice.refetch}
          defaultValues={clientDialogOpen.editOffice.defaultValues}
          client_id={clientDialogOpen.editOffice.client_id}
          office_id={clientDialogOpen.editOffice.office_id}
        />
      }

      {/* Form Close Warning */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertNBackdrop)}
        handleYesClick={() =>
          handleAlertBoxYesClick(setAlertNBackdrop, setClientPageDialogs)
        }
        open={alertNBackdrop.alert}
      />

      {/* Backdrop */}
      <BackdropComponent isBackdrop={alertNBackdrop.backdrop} />
    </>
  );
}
