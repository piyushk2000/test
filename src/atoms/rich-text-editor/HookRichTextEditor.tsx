import * as React from "react";
import {
  Controller,
  FieldValues,
  FormState,
  UseControllerProps,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.scss";

import { FormHelperText, Grid, GridProps } from "@mui/material";
import { callAll } from "../form-fields/util";

export interface HookRichTextFieldProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  quillProps?: ReactQuillProps;
  formState: FormState<T>;
  gridProps?: GridProps;
  setValue?: UseFormSetValue<T>;
  trigger?: UseFormTrigger<T>;
  config?: {
    /**
     * trimWhitespaceOnBlur - Trim Whitespace on blur - default: true
     * triggerErrorOnBlur - Trigger Error on blur - default: true
     */
    trimWhitespaceOnBlur?: boolean;
    triggerErrorOnBlur?: boolean;
  };
}

// ====================================================

/**
 *
 * @description A text input field that uses react-hook-form to manage the form state.
 *
 * @param {HookRichTextFieldProps}
 * if grid props are passed in we wrap the text field in a grid
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================
export const HookRichTextField = <T extends FieldValues>({
  gridProps,
  ...props
}: HookRichTextFieldProps<T>): React.ReactElement => {
  /**
   * if grid props are passed in we wrap the text field in a grid
   */
  if (gridProps) {
    return (
      <Grid item {...gridProps}>
        <Component {...props} />
      </Grid>
    );
  }

  return <Component {...props} />;
};

/**
 *
 * @description The actual component that is returned from the HookTextField component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <T extends FieldValues>({
  quillProps = {},
  setValue,
  trigger,
  config = {},
  formState: { errors: _e },
  gridProps,
  ...restC
}: HookRichTextFieldProps<T>) => {
  const { onChange, onBlur, ...rest } = quillProps;

  const { trimWhitespaceOnBlur = false, triggerErrorOnBlur = false } = config;

  /**
   * we don't want to pass onChange & onBlur to the TextField
   * we want to use the hook-form onChange
   * But we also want to keep the onChange passed in the textFieldProps
   * So we use callAll to merge the two
   */
  const onChangeRef = React.useRef(onChange);
  const onBlurRef = React.useRef(onBlur);
  /**
   * we update the ref on every render
   */
  onChangeRef.current = onChange;
  onBlurRef.current = onBlur;

  const { error } = restC.control?.getFieldState(restC.name) ?? {};

  return (
    <Controller
      {...restC}
      render={({ field: { onChange: onChangeI, value = "", ref } }) => (
        <>
          <ReactQuill
            {...rest}
            ref={ref}
            theme="snow"
            value={value}
            onChange={callAll(onChangeI, onChangeRef.current)}
          />
          {error ? (
            <FormHelperText
              sx={{
                color: "#d32f2f",
                margin: "4px 14px 0 14px",
                fontSize: "0.6428571428571428rem",
              }}
            >
              {error?.message}
            </FormHelperText>
          ) : null}
        </>
      )}
    />
  );
};

