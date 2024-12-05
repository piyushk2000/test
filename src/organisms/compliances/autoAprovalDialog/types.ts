export interface QuestionProps {
    type: "enum" | "number" | "text";
    value: string|number|undefined;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    multiline?: boolean;
    rows?: number;
    placeholder?:string;
};

export type Props = {
    handleClose?: () => void;
    setFormChange?: () => void;
    handleSubmitClose?: () => void;
    setBackdrop?: (b: boolean) => void;
    id?: string | null;
    questions?:NumberQuestion[];
};



export type Answers={
    [qid:string]:string|number
}


export type Props2 = {
    handleSubmit: (answers:Answers) => void;
    questions:NumberQuestion[];
};

export type questionOptions = "enum" | "number" | "text";


export type NumberQuestion = {
    qid: string | number;
    question: string;
    type: questionOptions;
    mandatory?: number;
    max_length?: number;
    min_length?: number;
    min_value?: number;
    max_value?: number;
    correct_answer?: number;
    options?: string[];
    respondant_answer?:string;
    answer?: string | number | undefined;
    auto_reject_on_incorrect_answer?:number;
    auto_reject_on_these_answers?: number[];
    show_if?: {
        qid: string | number,
        chosen_option_position: number[]|any
    }
}

export type NumberQuestions = {
    [qid: string]: NumberQuestion;
}