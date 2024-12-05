import {
  Box,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";
import "./agenda.scss";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { editBtnClickHandler, handleClickSeperator } from "./helper";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import {
  agendaQuestionsListStyle,
  dividerStyle,
  questionContainerStyle,
} from "./styles";
import { getAgenda } from "../../../organisms/project-detail/project-navbar/helper";
import { isClient } from "../../../utils/role";
import { useProjectDetailsContext } from "../../../atoms/project-details/projectContext";
import DialogModal from "../../../atoms/dialog";
import BackdropComponent from "../../../atoms/backdropComponent";

type Props = {
  isOpen: boolean,
  handleClose: () => void,
  handleSubmitClose: () => void,
  handleSubmit: any,
  id: any,
  agenda_id: any,
  getprojectDetails: any,
  isFormChange: () => void,
  getAgenda: any,
  isProjectOpen: boolean
}

const AgendaDialog = ({
  isOpen,
  handleClose,
  handleSubmitClose,
  handleSubmit,
  id,
  agenda_id,
  getprojectDetails,
  isFormChange,
  isProjectOpen
}: Props) => {
  const { isAdminAllowed } = useProjectDetailsContext();
  const defaultPreviewValue = (isClient() || !isAdminAllowed || !isProjectOpen) ? true : Boolean(agenda_id)
  const [text, setText] = useState<string>("--> ");
  const [isPreviewOn, setPreviewOn] = useState<boolean>(defaultPreviewValue);
  const [isBackdrop, setBackdrop] = useState<boolean>(false);
  const [quesArr, setQuesArr] = useState<any>(null);
  const textRef = useRef(null);

  const previewBtnClickHandler = () => {
    setPreviewOn(true);
    const QuestionsArray = text
      .split("--> ")
      .map((ques) => ques.trim())
      .filter((ques) => ques !== "");

      console.log({QuestionsArray})
    setQuesArr(QuestionsArray);
  };

  useEffect(() => {
    if (isOpen) {
      id && getAgenda(setQuesArr, agenda_id);
    } else {
      setQuesArr(null);
    }

    if (!isOpen && Boolean(agenda_id)) {
      setPreviewOn(true);
    }
    //eslint-disable-next-line
  }, [isOpen, agenda_id]);

  return (
    <>
      <DialogModal
        isOpen={isOpen}
        handleClose={handleClose}
        title={isPreviewOn ? "Agenda" : "Add Agenda"}
      >
        {isPreviewOn ? (
          quesArr ? (
            <Grid container sx={agendaQuestionsListStyle} >
              <>
                {quesArr.length ? <>
                  {quesArr.map((ques: any, index: number) => (
                    <React.Fragment key={ques + index}>
                      <Grid item sx={questionContainerStyle} xs={12}>
                        <p className="ques">Q{index + 1}.</p>
                        <p className="ques-content" style={{ whiteSpace: 'pre-wrap' }}>{ques}</p>
                      </Grid>
                      {index !== quesArr.length - 1 && (
                        <Box sx={dividerStyle(false)}></Box>
                      )}
                    </React.Fragment>
                  ))}
                </> : <p style={{
                  color: "#252B3B",
                  fontSize: "14px",
                }}>No Agenda Found for this Project</p>}
              </>
            </Grid>
          ) : (
            <Grid container sx={agendaQuestionsListStyle}>
              {[1, 2, 3, 4, 5].map((value) =>
                <Grid item xs={12} height={50}>
                  <Skeleton height={50} />
                  {value !== 5 && <Box sx={dividerStyle(true)}></Box>}
                </Grid>
              )}
            </Grid>
          )
        ) : (
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isFormChange();
            }}
            className="text-field-agenda"
            style={{ marginTop: "10px", whiteSpace: 'pre-wrap' }}
          ></textarea>
        )}

        <Grid container>
          <Grid item xs={isPreviewOn ? 3 : 6}>
            {isPreviewOn ? (
              !isClient() && isAdminAllowed && isProjectOpen ?
                <Button
                  onClick={() =>
                    editBtnClickHandler(setPreviewOn, quesArr, setText)
                  }
                  className="next-btn"
                  variant="outlined"
                >
                  Edit
                </Button>
                : <div></div>
            ) : (
              <Button
                onClick={() => handleClickSeperator("\n--> ", textRef, setText)}
                className="next-btn"
                variant="outlined"
              >
                Insert Question Separator
              </Button>
            )}
          </Grid>
          <Grid item xs={isPreviewOn ? 9 : 6} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: '1rem'
          }}>
            {isPreviewOn ? (
              <>
                <CustomBtnFilled
                  label="cancel"
                  variant="outlined"
                  onClick={handleClose}
                />
                {!isClient() && isAdminAllowed && isProjectOpen &&
                  <CustomBtnFilled
                    label="submit"
                    variant="contained"
                    buttonType="button"
                    onClick={() =>
                      handleSubmit(
                        quesArr,
                        id,
                        handleSubmitClose,
                        agenda_id,
                        getprojectDetails,
                        setBackdrop
                      )
                    }
                  />
                }
              </>
            ) : (
              <CustomBtnFilled
                label="Preview"
                variant="contained"
                buttonType="button"
                onClick={previewBtnClickHandler}
              />
            )}
          </Grid>

        </Grid>
      </DialogModal>

      <BackdropComponent
        isBackdrop={isBackdrop}
      />
    </>
  );
};

export default AgendaDialog;
