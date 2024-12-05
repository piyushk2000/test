import { ThemeProvider } from "@emotion/react";
import { createTheme, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NumberQuestion, Props, NumberQuestions } from "./types";

const outerDivStyle = {
    padding: '10px',
    marginBottom: '0px'
}

const h2Style = {
    fontWeight: 'bold',
    fontSize: '13px'
}

const RedStar = () => {
    return (<>
        <span style={{ paddingBottom: "10px", color: 'red' }}>*</span>
    </>)
}

const ShowAnswersForm = ({
    questions,
    isInfo = true
}: { questions: NumberQuestion[] | null, isInfo?: boolean }) => {
    const [keyValueQuestionsAnswers, setKeyValueQuestionsAnswers] = useState<NumberQuestions>({});
    const [questionNumArray, setQuestionNumArray] = useState<NumberQuestion[]>([]);

    const tellHighestAndSetKeyValue = () => {
        let keyValue: NumberQuestions = {};
        questions?.forEach((val: NumberQuestion) => {
            val['answer'] = undefined;
            keyValue[val.qid.toString()] = val;
        })

        setTimeout(() => {
            setQuestionNumArray([...questions || []]);
            setKeyValueQuestionsAnswers({ ...keyValue });
        }, 100)
        console.log(questions, keyValue)
    }



    const defaultTheme = createTheme({
        typography: {
            fontFamily: ["Montserrat", "san-serif"].join(","),
            fontSize: 12,
        },
        palette: {
            primary: {
                main: "#EC9324",
            },
        },
    });


    const checkShowIf = (id: string | number) => {
        if (!keyValueQuestionsAnswers[id]?.respondant_answer) {
            if (keyValueQuestionsAnswers[id].show_if) {
                return false
            } else {
                return true
            }
        } else {
            return true;
        }
    }

    useEffect(() => { if (questions && questions?.length > 0) { tellHighestAndSetKeyValue() } }, [questions]);



    return (
        <ThemeProvider theme={defaultTheme}>
            {questionNumArray.map((val: NumberQuestion) => {
                return checkShowIf(val.qid) && <React.Fragment key={val.qid}>
                    <div style={outerDivStyle}>
                        <h6 style={h2Style}>Question {keyValueQuestionsAnswers[val.qid]?.qid}: <span dangerouslySetInnerHTML={{ __html: keyValueQuestionsAnswers[val.qid]?.question }} /> {keyValueQuestionsAnswers[val.qid]?.mandatory == 1 ? <RedStar /> : ''}</h6>
                        <div>
                            {keyValueQuestionsAnswers[val.qid]?.type == 'enum' &&
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name={"radio-buttons-group" + val.qid}
                                    row
                                    value={keyValueQuestionsAnswers[val.qid]?.respondant_answer || ''}
                                >
                                    {keyValueQuestionsAnswers[val.qid].options?.map((val: string, index: number) => <FormControlLabel key={index + 1} value={val} control={<Radio />} label={val} />)}
                                </RadioGroup>
                            }
                            {keyValueQuestionsAnswers[val.qid]?.type == 'text' && <TextField sx={{ marginTop: '0.5rem', fontSize: '12px' }}
                                type={'text'}
                                variant="outlined"
                                value={keyValueQuestionsAnswers[val.qid]?.respondant_answer || ''}
                                fullWidth
                                size="small"
                            />}
                            {keyValueQuestionsAnswers[val.qid]?.type == 'number' && <TextField sx={{ marginTop: '0.5rem', fontSize: '12px' }}
                                type={'text'}
                                variant="outlined"
                                value={keyValueQuestionsAnswers[val.qid]?.respondant_answer || ''}
                                fullWidth
                                size="small"
                            />}


                        </div>
                    </div>


                    {!!val.correct_answer && isInfo &&
                        <div style={{ marginLeft: '1em', fontSize: '13px' }}>
                            Auto Approve Answer: <span style={{ color: 'green' }}>{val.options ? val.options[val.correct_answer - 1] : ''}</span>
                        </div>
                    }
                    {val.auto_reject_on_these_answers && isInfo &&
                        <div style={{ marginLeft: "1em", fontSize: "13px" }}>
                            Auto Reject on these Options:  <span style={{ color: 'green' }}>
                                {val.auto_reject_on_these_answers.map((auto, index) =>
                                    <>
                                        {val.options ? val.options[auto - 1] : ''}
                                        {val.auto_reject_on_these_answers && val.auto_reject_on_these_answers.length - 1 === index ? "" : ", "}
                                    </>
                                )}

                            </span>
                        </div>
                    }
                    <hr />
                </React.Fragment>
            })}
        </ThemeProvider>
    );
};

export default ShowAnswersForm;
