import React from "react";
import ContactsHeader from "../../../molecules/app-bars/contact-page";
import { apiDataState, AppbarToggleOptions } from "./types";
import { dialogState, setFormChange, getAllContacts, handleClose, handleAlertBoxClose, handleAlertBoxYesClick, defaultDialogState, editContactDefaultValues } from "./helper";
import ContactCards from "./card-view";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import AllContactsNavbar from "../../../molecules/contact/navbar";
import FullPageLoading from "../../../atoms/full-page-loading";
import BackdropComponent from "../../../atoms/backdropComponent";
import DialogModal from "../../../atoms/dialog";
import WarningDialog from "../../../molecules/form-close-warning";
import AddContactForm from "../../client/all-clients/add-contact-form";
import ContactTable from "./table-view";

type Props = {
  contained?: boolean
}


const AllContacts = ({ contained }: Props) => {
  const [data, setData] = React.useState<apiDataState>({
    api: null,
    isFilter: false,
    filter: {
      calender: null,
      sort_by: "desc___updated_at",
      search: null,
      id: null,
      name: null,
      email: null,
      isFilterChange: false,
    },
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fkClient = queryParams.get("fkClient") || queryParams.get("id");
  const headerText = queryParams.get("name");
  const contact_ids = queryParams.get("contact_ids");

  // new code begins

  const [isBackdrop, setBackdrop] = React.useState<boolean>(false);
  const [openAlertBox, setAlertBox] = React.useState(false);
  const [toggleOption, setToggleOption] = React.useState<AppbarToggleOptions>('card')
  const [isDialog, setDialog] = React.useState<dialogState>(defaultDialogState);

  const openDialog = () => {
    setDialog &&
      setDialog((prev: dialogState) => ({
        ...prev,
        addContact: { state: true, id: fkClient, isChange: false },
      }))
  }

  const openEditContact = (id: number) => {
    setDialog &&
      setDialog((prev: dialogState) => ({
        ...prev,
        editContact: { state: true, id: fkClient, isChange: false, contact_id: id },
      }))
  }

  const handleSubmitClose = () => {
    setDialog((prev: dialogState) => (defaultDialogState));
    getAllContacts(setData, data.filter, fkClient, contact_ids);
  };

  // new code ends

  React.useEffect(() => {
    getAllContacts(setData, data.filter, fkClient, contact_ids);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fkClient]);

  React.useEffect(() => {
    if (fkClient && data.filter.isFilterChange) {
      getAllContacts(setData, data.filter, fkClient);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.filter.isFilterChange]);

  return (
    <>
      <FullPageLoading />
      {contained ? '' : <ContactsHeader
        title={headerText ? `POCs in ${headerText}` : "Contacts"}
        toggleOptions={["card", "list"]}
        selectedToggleOption="card"
        isFilter={false}
        isAddIcon
        openAddContactDialog={openDialog}
      />}

      <AllContactsNavbar selectedToggleOption={toggleOption} onToggleOptionChange={setToggleOption} filters={data.filter} setData={setData} contained={contained} openAddContactDialog={openDialog} />

      <Box sx={{ marginTop: toggleOption == 'card' ? "3rem" : "1em" }}>
        {toggleOption == 'card' && <ContactCards isFilter={data.isFilter} apiData={data.api} openEditContact={openEditContact} />}
        {toggleOption == 'list' && <ContactTable isFilter={data.isFilter} apiData={data.api} openEditContact={openEditContact} />}
      </Box>

      {/* Add Contact Dialog */}
      <DialogModal
        isOpen={isDialog.addContact.state}
        handleClose={() =>
          handleClose(setAlertBox, isDialog.addContact.isChange, handleSubmitClose)
        }
        title={"Add Client Contact"}
      >
        <AddContactForm
          handleClose={() => {
            handleClose(setAlertBox, isDialog.addContact.isChange, handleSubmitClose);
          }}
          handleSubmitClose={() => {
            handleSubmitClose();
          }}
          setBackdrop={setBackdrop}
          setFormChange={() => setFormChange(setDialog, "addContact")}
          id={isDialog.addContact.id}
        />
      </DialogModal>

      {/* Edit Contact Dialog */}
      <DialogModal
        isOpen={isDialog.editContact.state}
        handleClose={() =>
          handleClose(setAlertBox, isDialog.editContact.isChange, handleSubmitClose)
        }
        title={"Edit Client Contact" + (data.api?.data.find(d => d.id === isDialog.editContact.contact_id)?.name ? `: ${data.api?.data.find(d => d.id === isDialog.editContact.contact_id)?.name}` : "")}
      >
        <AddContactForm
          handleClose={() => {
            handleClose(setAlertBox, isDialog.editContact.isChange, handleSubmitClose);
          }}
          handleSubmitClose={() => {
            handleSubmitClose();
          }}
          setBackdrop={setBackdrop}
          setFormChange={() => setFormChange(setDialog, "editContact")}
          id={isDialog.editContact.id}
          isEdit
          contact_id={isDialog.editContact.contact_id}
          formDefaultValues={editContactDefaultValues(data,isDialog.editContact.contact_id)}
        />
      </DialogModal>

      {/* Form Close Warning */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertBox)}
        handleYesClick={() => handleAlertBoxYesClick(setAlertBox, handleSubmitClose)}
        open={openAlertBox}
      />
      {/* Backdrop */}
      <BackdropComponent isBackdrop={isBackdrop} />
    </>
  );
};

export default AllContacts;
