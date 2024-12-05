import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import QuestionComponentCompliance from "./questionInput";
import { NumberQuestion, Props, NumberQuestions, Props2, Answers } from "./types";
import { isExpert } from "../../../utils/role";

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

const ExpertComplianceForm = ({ handleSubmit, questions }: Props2) => {
    const { enqueueSnackbar } = useSnackbar();
    const [keyValueQuestionsAnswers, setKeyValueQuestionsAnswers] = useState<NumberQuestions>({});
    const [questionNumArray, setQuestionNumArray] = useState<NumberQuestion[]>([]);

    const tellHighestAndSetKeyValue = () => {
        let keyValue: NumberQuestions = {};
        questions.forEach((val: NumberQuestion) => {
            val['answer'] = undefined;
            keyValue[val.qid.toString()] = val;
        })
        setKeyValueQuestionsAnswers({ ...keyValue });
        setTimeout(() => { setQuestionNumArray([...questions]); }, 100)
        console.log(questions, keyValue)
    }

    const setValue = (id: string | number, value: string | number, val: NumberQuestion) => {
        const keyValueQuestionsLocal = { ...keyValueQuestionsAnswers };

        if (val.auto_reject_on_these_answers && value != val.correct_answer && !isExpert()) {
            for (let auto_reject_key of val.auto_reject_on_these_answers) {
                if (auto_reject_key === +value) {
                    enqueueSnackbar("Wrong answer may cause auto-rejection", {
                        variant: "error"
                    })
                }
            }
        }
        keyValueQuestionsLocal[id].answer = value;
        setKeyValueQuestionsAnswers({ ...keyValueQuestionsLocal })
    }

    const resetAnswers = () => {
        // const keyValueQuestionsLocal = JSON.parse(JSON.stringify(keyValueQuestionsAnswers));
        const keyValueQuestionsLocal = { ...keyValueQuestionsAnswers };
        questionNumArray.forEach((val: NumberQuestion) => {
            if (!checkShowIf(val.qid)) {
                keyValueQuestionsLocal[val.qid].answer = undefined;
            }
        })
        setKeyValueQuestionsAnswers({ ...keyValueQuestionsLocal })
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

    const consoleLogs = () => {
        console.log(keyValueQuestionsAnswers);
        if (submitCheck()) {
            realSubmit();
        }
    }

    const checkShowIf = (id: string | number) => {
        if (keyValueQuestionsAnswers[id]?.show_if && keyValueQuestionsAnswers[id]?.show_if?.qid) {
            if (Array.isArray(keyValueQuestionsAnswers[id].show_if?.chosen_option_position)) {
                return keyValueQuestionsAnswers[id].show_if?.chosen_option_position.includes(Number(keyValueQuestionsAnswers[keyValueQuestionsAnswers[id].show_if?.qid || '']?.answer));
            } else {
                return keyValueQuestionsAnswers[keyValueQuestionsAnswers[id].show_if?.qid || '']?.answer == keyValueQuestionsAnswers[id].show_if?.chosen_option_position;
            }
        } else {
            return true;
        }
    }

    useEffect(() => { if (questions.length > 0) { tellHighestAndSetKeyValue(); } }, [questions]);

    const submitCheck = () => {
        for (let val of questionNumArray) {
            if (checkShowIf(val.qid)) {
                if (keyValueQuestionsAnswers[val.qid].mandatory == 1 && !keyValueQuestionsAnswers[val.qid].answer) {
                    enqueueSnackbar("Please fill all mandatory feilds", {
                        variant: "error",
                    })
                    return false;
                }
                if (keyValueQuestionsAnswers[val.qid].type == 'text') {
                    let minLength = keyValueQuestionsAnswers[val.qid].min_length;
                    let maxLength = keyValueQuestionsAnswers[val.qid].max_length;
                    let value = keyValueQuestionsAnswers[val.qid].answer;
                    let errorMessage = '';
                    if (typeof value === 'string') {
                        if (minLength !== undefined && value.length < minLength) {
                            errorMessage = `Minimum length allowed for Question ${val.qid} is ${minLength}. `;
                            enqueueSnackbar(errorMessage, {
                                variant: "error",
                            })
                            return false;
                        } else if (maxLength !== undefined && value.length > maxLength) {
                            errorMessage = `Maximum length allowed for Question ${val.qid} is ${maxLength}. `;
                            enqueueSnackbar(errorMessage, {
                                variant: "error",
                            })
                            return false;
                        }
                    }
                }

                if (keyValueQuestionsAnswers[val.qid].type == 'number') {
                    let minValue = keyValueQuestionsAnswers[val.qid].min_value;
                    let maxValue = keyValueQuestionsAnswers[val.qid].max_value;
                    let value = keyValueQuestionsAnswers[val.qid].answer;
                    let errorMessage = '';
                    const numericValue = Number(value);
                    if (!isNaN(numericValue)) {
                        if (minValue !== undefined && numericValue < minValue) {
                            errorMessage += `Minimum value allowed for Question ${val.qid} is ${minValue}. `;
                            enqueueSnackbar(errorMessage, {
                                variant: "error",
                            })
                            return false;
                        } else if (maxValue !== undefined && numericValue > maxValue) {
                            errorMessage += `Maximum value allowed for Question ${val.qid} is ${maxValue}. `;
                            enqueueSnackbar(errorMessage, {
                                variant: "error",
                            })
                            return false;
                        }
                    }
                }
            }
        }
        console.log('test failed')
        return true;
    }

    const realSubmit = async () => {
        let finalAnswers: Answers = {}
        for (let val of questionNumArray) {
            if (checkShowIf(val.qid)) {
                if (val.answer) {
                    if (val.type == 'enum') {
                        finalAnswers[val.qid] = val.answer && val.options?.length && val.options?.length > 0 ? val.options[Number(val.answer) - 1] : val.answer
                    } else {
                        finalAnswers[val.qid] = val.answer
                    }
                }
            }
        }
        handleSubmit(finalAnswers);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {questionNumArray.map((val: NumberQuestion) => {
                return checkShowIf(val.qid) &&
                    <React.Fragment key={val.qid}>
                        <div style={outerDivStyle}>
                            <h6 style={h2Style}>Question {keyValueQuestionsAnswers[val.qid]?.qid}: <span dangerouslySetInnerHTML={{__html: keyValueQuestionsAnswers[val.qid]?.question}} /> {keyValueQuestionsAnswers[val.qid]?.mandatory == 1 ? <RedStar /> : ''}</h6>
                            <div>
                                {keyValueQuestionsAnswers[val.qid].type == 'enum' && checkShowIf(val.qid) &&
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name={"radio-buttons-group" + val.qid}
                                        row
                                        value={keyValueQuestionsAnswers[val.qid]?.answer || ''}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setValue(val.qid, event.target.value, val);
                                            resetAnswers();
                                        }}
                                    >
                                        {keyValueQuestionsAnswers[val.qid].options?.map((val: string, index: number) => <FormControlLabel key={index + 1} value={index + 1} control={<Radio />} label={val} />)}
                                    </RadioGroup>
                                }
                                {keyValueQuestionsAnswers[val.qid].type == 'text' && checkShowIf(val.qid) && <QuestionComponentCompliance type={keyValueQuestionsAnswers[val.qid].type}
                                    value={keyValueQuestionsAnswers[val.qid]?.answer} minLength={keyValueQuestionsAnswers[val.qid]?.min_length} maxLength={keyValueQuestionsAnswers[val.qid]?.max_length}
                                    handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue(val.qid, event.target.value, val);
                                    }}
                                    multiline={keyValueQuestionsAnswers[val.qid]?.max_length && ((keyValueQuestionsAnswers[val.qid]?.max_length || 0) > 200) ? true : false}
                                />}
                                {keyValueQuestionsAnswers[val.qid].type == 'number' && checkShowIf(val.qid) && <QuestionComponentCompliance type={keyValueQuestionsAnswers[val.qid].type}
                                    value={keyValueQuestionsAnswers[val.qid]?.answer} minValue={keyValueQuestionsAnswers[val.qid]?.min_value} maxValue={keyValueQuestionsAnswers[val.qid]?.max_value}
                                    handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue(val.qid, event.target.value, val);
                                    }}
                                />}
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
            })}
            <div style={{ textAlign: 'center', padding: '8px' }}>
                <CustomBtnFilled onClick={consoleLogs} label={"Submit"} variant={""} />
            </div>
        </ThemeProvider>
    );
};

export default ExpertComplianceForm;
