import React, { useEffect, useRef } from "react";
import { apiDataState, ClientControllerRef, dialogState } from "./types";
import WarningDialog from "../../../molecules/form-close-warning";
import {
  AllClientContext,
  getAllClients,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleSubmitClose,
  openAddClientDialog,
  setFormChange,
} from "./helper";
import ClientHeader from "../../../molecules/app-bars/client-page";
import DialogModal from "../../../atoms/dialog";
import AddClientForm from "../../add-client";
import ClientCards from "./client-cards";
import AllClientsNavbar from "../../../molecules/client/client-navbar/allClientNavbar";
import AddContactForm from "./add-contact-form";
import BackdropComponent from "../../../atoms/backdropComponent";
import FixedBox from "../../../atoms/fixedBox";

const AllClients = () => {
  const [isDialog, setDialog] = React.useState<dialogState>({
    addClient: { state: false, isChange: false, isEdit: false },
    addContact: { state: false, isChange: false, id: null },
  });
  const [data, setData] = React.useState<apiDataState>({
    apiData: null,
    filter: {
      type: "all",
      calender: null,
      sort_by: "desc___updated_at",
      search: null,
      isFilterChange: false,
    },
  });
  const [openAlertBox, setAlertBox] = React.useState(false);
  const [isBackdrop, setBackdrop] = React.useState<boolean>(false);
  const controllerRef = useRef<ClientControllerRef>({
    controller:null,
    clearTimeout: null
  });
  const clientDialogTitle = isDialog.addClient.isEdit ? isDialog.addClient.clientData?.name + ": Edit Client" : "Add New Client"

  useEffect(() => {
    if (data.filter.isFilterChange) {
      getAllClients(setData, data.filter, controllerRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.filter.isFilterChange]);

  useEffect(() => {
    getAllClients(setData, data.filter, controllerRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AllClientContext.Provider value={{ setDialog, setData }}>
        <FixedBox>
          <ClientHeader
            title="Clients"
            openAddClientDialog={() => openAddClientDialog(setDialog)}
            toggleOptions={["card", "list"]}
            selectedToggleOption="card"
          />
          <AllClientsNavbar filters={data.filter} setData={setData} />
        </FixedBox>


        <ClientCards apiData={data.apiData} />
      </AllClientContext.Provider>

      {/* Add Client Dialog */}

      <DialogModal
        title={clientDialogTitle}
        isOpen={isDialog.addClient.state}
        handleClose={() =>
          handleClose(setAlertBox, setDialog, isDialog.addClient.isChange)
        }
      >
        <AddClientForm
          handleClose={() =>
            handleClose(setAlertBox, setDialog, isDialog.addClient.isChange)
          }
          handleSubmitClose={() => handleSubmitClose(setDialog)}
          setFormChange={() => setFormChange(setDialog, "addClient")}
          setBackdrop={setBackdrop}
          refetchClientsData={async () => {
            await getAllClients(setData, data.filter, controllerRef);
          }}
          isEdit={isDialog.addClient?.isEdit}
          clientData={isDialog.addClient?.clientData}
          id={isDialog.addClient?.id}
        />
      </DialogModal>

      {/* Add Contact Dialog */}
      <DialogModal
        isOpen={isDialog.addContact.state}
        handleClose={() =>
          handleClose(setAlertBox, setDialog, isDialog.addContact.isChange)
        }
        title={"Add Client Contact"}
      >
        <AddContactForm
          handleClose={() => {
            handleClose(setAlertBox, setDialog, isDialog.addContact.isChange);
          }}
          handleSubmitClose={() => {
            handleSubmitClose(setDialog);
          }}
          setBackdrop={setBackdrop}
          setFormChange={() => setFormChange(setDialog, "addContact")}
          id={isDialog.addContact.id}
        />
      </DialogModal>

      {/* Form Close Warning */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertBox)}
        handleYesClick={() => handleAlertBoxYesClick(setAlertBox, setDialog)}
        open={openAlertBox}
      />

      {/* Backdrop */}
      <BackdropComponent isBackdrop={isBackdrop} />
    </>
  );
};

export default AllClients;
