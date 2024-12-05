import { Box } from "@mui/material";
import { Select, getAdminUsers } from "../../project-cards/helper";
import { noExpertsSelectedStyle } from "../../experts/map-multiple-experts-to-project/helper";
import SelectedProjects from "./selectedProjects";
import ChooseAccountManagerForm from "./form";
import { useEffect, useState } from "react";

type Props = {
  select: Select;
  setBackdrop: any;
  handleClose: () => void;
  refetch: () => void
};

const PickNewAccManagerForm = ({ select, handleClose, setBackdrop, refetch }: Props) => {
  const [allAccManagers, setAllAccManagers] = useState<any>([]);

  useEffect(() => {
    getAdminUsers(setAllAccManagers);
  }, []);

  return (
    <>
      {select.selectedCards.length === 0 ? (
        <Box sx={noExpertsSelectedStyle}>
          <p>Please choose projects before assigning a new Account Manager</p>
        </Box>
      ) : (
        <Box>
          <SelectedProjects selectedProject={select.selectedCards} />
          <ChooseAccountManagerForm
            handleClose={handleClose}
            allAccManagers={allAccManagers}
            selectedProjects={select.selectedCards}
            setBackdrop={setBackdrop}
            refetch={refetch}
          />
        </Box>
      )}
    </>
  );
};

export default PickNewAccManagerForm;
