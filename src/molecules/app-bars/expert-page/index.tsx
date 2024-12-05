import React, { useEffect, useState } from "react";
import AppBarCommon from "../../app-bar-common";
import DialogModal from "../../../atoms/dialog";
import AddExpertForm from "../../../organisms/add-expert";
import ExpertFilterDialog from "../../../organisms/expert-filter-dialog/expertFilterDialog";
import FormCloseWarningDialog from "../../form-close-warning";
import { AppbarToggleOptions } from "../../app-bar-common/types";
import { SetFilterPayload } from "../../../pages/Experts/types";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import { infoForAdmin, infoForClientAndSharedLink } from "../../../constants/infoHtml";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import AddExpertFormThroughLink from "../../../organisms/add-expert-through-link";




type Props = {
  handleListClick: any;
  mode: "card" | "list" | "kanban";
  handleMenuClick: any;
  setExpertLoading: any;
  setFilterPayload: SetFilterPayload;
  setExpertApiData: any;
  setToggle: (option: AppbarToggleOptions) => void;
  isAdvanceFilter: boolean;
  getProfileDetails: () => void;
  setFormResetFunction: any;
};

type dialogTypes = {
  addExpert: { state: boolean, isChange: boolean };
  filter: { state: boolean; isChange: boolean };
  addExpertThroughLink: { state: boolean; isChange: boolean };
};





export default function ExpertSearchAppBar({
  handleListClick,
  mode,
  handleMenuClick,
  setExpertLoading,
  setFilterPayload,
  setExpertApiData,
  setToggle,
  isAdvanceFilter,
  getProfileDetails,
  setFormResetFunction
}: Props) {
  const [openDialog, setOpenDialog] = useState<dialogTypes>({
    addExpert: { state: false, isChange: false },
    filter: { state: false, isChange: false },
    addExpertThroughLink: { state: false, isChange: false },
  });
  const [openAlertBox, setAlertBox] = useState(false);
  const hoverHtml = (isAdmin() || isSuperAdmin()) ? infoForAdmin : infoForClientAndSharedLink;
  const isMobile = useIsMobile();
  const [linkedinData, setLinkedinData] = useState(null);

  const handleClickAddExpertOpen = () => {
    setOpenDialog((prev: dialogTypes) => ({ ...prev, addExpert: { state: true, isChange: false } }));
  };

  const handleClickFiltersOpen = () => {
    setOpenDialog((prev: dialogTypes) => ({
      ...prev,
      filter: { state: true, isChange: false },
    }));
  };

  const handleClickAddExpertThroughLinkOpen = () => {
    setOpenDialog((prev: dialogTypes) => ({
      ...prev,
      addExpertThroughLink: { state: true, isChange: false },
    }));
  };

  const handleSubmitClose = () => {
    setOpenDialog(() => ({
      filter: { state: false, isChange: false },
      addExpert: { state: false, isChange: false },
      addExpertThroughLink: { state: false, isChange: false },
    }));
    setLinkedinData(null);
  };

  const handleSubmitCloseAddThroughLink = (data: any) => {
    setLinkedinData(data);
    setOpenDialog(() => ({
      filter: { state: false, isChange: false },
      addExpert: { state: true, isChange: false },
      addExpertThroughLink: { state: false, isChange: false },
    }));
  }

  const handleClose = () => {
    setAlertBox(true);
  };

  const handleAlertBoxClose = () => {
    setAlertBox(false);
  };

  const handleAlertBoxYesClick = () => {
    setAlertBox(() => false)
    handleSubmitClose();
  };
  return (
    <>
      {/* Add an Expert Dialog */}
      <DialogModal
        isOpen={openDialog.addExpert.state}
        handleClose={() =>
          openDialog.addExpert.isChange ? handleClose() : handleSubmitClose()
        }
        title="Add an Expert"
      >
        <AddExpertForm
          linkedinData = {linkedinData}
          handleClose={() =>
            openDialog.addExpert.isChange ? handleClose() : handleSubmitClose()
          }
          handleSubmitClose={() => {
            handleSubmitClose();
            getProfileDetails();
          }}
          setChange={() => {
            setOpenDialog((prev) => {
              if (!prev.addExpert.isChange) {
                prev.addExpert.isChange = true;
              }
              return prev;
            });
          }}
        />
      </DialogModal>

      {/* Add an Expert Dialog */}
      <DialogModal
        isOpen={openDialog.addExpertThroughLink.state}
        handleClose={() =>
          openDialog.addExpertThroughLink.isChange ? handleClose() : handleSubmitClose()
        }
        title="Add through Link"
      >
        <AddExpertFormThroughLink
          handleClose={() =>
            openDialog.addExpert.isChange ? handleClose() : handleSubmitClose()
          }
          handleSubmitClose={(linkedinData: any) => {
            handleSubmitCloseAddThroughLink(linkedinData);
          }}
          setChange={() => {
            setOpenDialog((prev) => {
              if (!prev.addExpert.isChange) {
                prev.addExpert.isChange = true;
              }
              return prev;
            });
          }}
        />
      </DialogModal>

      {/* Expert Filter Dialog */}
      <ExpertFilterDialog
        openDialog={openDialog.filter.state}
        handleClose={() =>
          openDialog.filter.isChange ? handleClose() : handleSubmitClose()
        }
        handleSubmitClose={handleSubmitClose}
        setExpertApiData={setExpertApiData}
        setExpertLoading={setExpertLoading}
        setFilterPayload={setFilterPayload}
        setFormResetFunction={setFormResetFunction}
        handleFormChange={() => {
          setOpenDialog((prev) => {

            if (!prev.filter.isChange) {
              prev.filter.isChange = true;
            }

            return prev
          });
        }}
      />

      <FormCloseWarningDialog
        handleClose={handleAlertBoxClose}
        handleYesClick={handleAlertBoxYesClick}
        open={openAlertBox}
        text="Are you sure you want to cancel?"
      />
      <AppBarCommon
        title="Experts"
        isSearch={true}
        searchLabel={isClient() ? "Search By Company" : "Search by relevancy or job description"}
        onSearch={(text) =>
          setFilterPayload((prev) => ({
            ...prev,
            searchFilter: text,
            isFilterChange: true,
          }))
        }
        isFilter
        onFilterClick={handleClickFiltersOpen}
        isUserIcon
        isAddIcon={!isClient()}
        isAddThroughIcon = {!isClient()}
        addIconLabel="Add Expert"
        addThroughIconLabel="Add Expert Through Link"
        onAddIconClick={handleClickAddExpertOpen}
        onAddThroughIconClick={handleClickAddExpertThroughLinkOpen}
        isToggle={true}
        toggleOptions={(isClient() || isMobile) ? ["card"] : ["card", "list"]}
        selectedToggleOption={mode}
        onToggleOptionChange={setToggle}
        isAdvanceFilter={isAdvanceFilter}
        isIconDefine={false}
        hover_html={hoverHtml}
      />
    </>
  );
}
