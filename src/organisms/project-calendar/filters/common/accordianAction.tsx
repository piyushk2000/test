import AccordionActions from '@mui/material/AccordionActions';
import Button from "@mui/material/Button";

type Props = {
  clearAllAction(): void;
  selectAllAction(): void;
  checkedLength: number;
  handleSubmit?: () => void;
  hideApplyBtn?: boolean;
}

const AccordionActionsButtons = ({ checkedLength, clearAllAction, selectAllAction, handleSubmit, hideApplyBtn }: Props) => {
  return (
    <AccordionActions>
      {checkedLength ?
        <Button sx={{ fontWeight: "600" }} onClick={clearAllAction}><p>Clear All</p></Button> :
        <Button sx={{ fontWeight: "600" }} onClick={selectAllAction}>Select All</Button>
      }
      {hideApplyBtn ? <></> :
        <Button sx={{ fontWeight: "600" }} type={handleSubmit ? 'button' : 'submit'} onClick={() => handleSubmit && handleSubmit()} >Apply</Button>
      }
    </AccordionActions>
  )
}

export default AccordionActionsButtons