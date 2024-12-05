import { useEffect, useState } from "react";
import GroupsHeader from "../../molecules/app-bars/group-page";
import { Filters, GroupListState } from "./types";
import { getRowsData } from "./helper";
import GroupListDetails from "./list-view";
import WarningDialog from "../../molecules/form-close-warning";
import BackdropComponent from "../../atoms/backdropComponent";
import DialogModal from "../../atoms/dialog";
import AddGroup from "./add-group";
import EditGroup from "./edit-group";
import FixedBox from "../../atoms/fixedBox";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

const GroupList = () => {
  const [openAddDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    isFilterChange: false
  })
  const [formChange, setFormChange] = useState(false);
  const [data, setData] = useState<GroupListState>({
    row: null,
  });
  const [backdrop, setBackdrop] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editValue, setEditValue] = useState({});
  const isMobile = useIsMobile();

  const handleAlertBoxClose = () => {
    setAlert(false);
  };



  const openEdit = (val: any) => {
    console.log("handle Click 2", val)
    setEditValue(val);
    setOpenEditDialog(true);
  }

  const handleAlertBoxYesClick = () => {
    setOpenDialog(false);
    setOpenEditDialog(false);
    setAlert(false);
    setFormChange(false);
  };


  const handleClose = () => {
    if (formChange === true) {
      setAlert(true);
    } else {
      setOpenDialog(false);
      setOpenEditDialog(false);
    }
  }

  const handleSubmitClose = (val: boolean) => {
    if (val === true) {
      setOpenDialog(false);
      setOpenEditDialog(false);
      setAlert(false);
      setFormChange(false);
      getRowsData(setData, setLoading, filters, setFilters);
    }
  }

  useEffect(() => {
    getRowsData(setData, setLoading, filters, setFilters);
  }, [])

  useEffect(() => {
    if (filters.isFilterChange) {
      getRowsData(setData, setLoading, filters, setFilters);
    }
  }, [filters.isFilterChange]);

  return (
    <>
      <FixedBox sx={{ pb: isMobile ? "0.25rem" : "0" }}>
        <GroupsHeader onNewGroupClick={() => setOpenDialog(true)} setFilters={setFilters} />
      </FixedBox>

      {(data.row && <GroupListDetails rows={data.row} loading={loading} openEdit={openEdit} />)}

      <DialogModal
        title={`Add Group`}
        isOpen={openAddDialog}
        handleClose={() => handleClose()}
      >
        <AddGroup
          handleClose={() => {
            handleClose()
          }}
          handleSubmitClose={(val: boolean) => {
            handleSubmitClose(val);
          }}
          setFormChange={() => {
            setFormChange(true);
          }}
          id={'45654'}
          setBackdrop={(bool: boolean) =>
            setBackdrop(bool)
          }
        />
      </DialogModal>

      <DialogModal
        title={`Edit Group`}
        isOpen={openEditDialog}
        handleClose={() => handleClose()}
      >
        <EditGroup
          handleClose={() => {
            handleClose()
          }}
          handleSubmitClose={(val: boolean) => {
            handleSubmitClose(val);
          }}
          setFormChange={() => {
            setFormChange(true);
          }}
          data={editValue}
          setBackdrop={(bool: boolean) =>
            setBackdrop(bool)
          }
        />
      </DialogModal>

      {/* Form Close Warning */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose()}
        handleYesClick={() =>
          handleAlertBoxYesClick()
        }
        open={alert}
      />

      {/* Backdrop */}
      <BackdropComponent isBackdrop={backdrop} />
    </>
  );
};

export default GroupList;
