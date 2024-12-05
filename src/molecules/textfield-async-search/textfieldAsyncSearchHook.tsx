import { useContext, useEffect, useMemo, useState } from "react";
import { HookAutoComplete } from "../../atoms/form-fields/SLFieldAutoComplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { LoadingContext } from "../../atoms/loading/context";
import { addCompanies } from "../../pages/Experts/helper";

const filter = createFilterOptions();

type CompaniesProps =
  | {
    enableFreeText: true;
    onFreeTextClick: () => void;
  }
  | {
    enableFreeText?: false;
  };

type propsType = {
  options: any;
  setOptions: any;
  searchFunction: any;
  label: string;
  registerStatename: string;
  renderOption?: any;
  multi?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  lengthMax?: { value: number; message: string } | null;
  disablePortal?: boolean;
  isValueNeeded?: boolean;
  getValue?: (input: any) => void;
  disableCloseOnSelect?: boolean;
  inputLength?: number;
} & CompaniesProps;

const TextfieldAsyncSearchHook = ({
  options,
  setOptions,
  searchFunction,
  label,
  registerStatename,
  renderOption = (props: any, option: any) => {
    return (
      <li {...props} key={option.value}>
        {option?.label}
      </li>
    );
  },
  multi = false,
  isRequired = true,
  enableFreeText,
  disabled,
  lengthMax = null,
  disablePortal = true,
  isValueNeeded = false,
  getValue = () => { },
  disableCloseOnSelect = false,
  inputLength = 2,
  ...props
}: propsType) => {
  const [inputValue, setInputValue] = useState("");
  const [optionsLoading, setOptionsLoading] = useState(false);
  const { setValue, registerState } = useHookFormContext();
  const { loading, setLoading } = useContext(LoadingContext);

  const fetch = useMemo(
    () =>
      debounce(
        (callback: () => void) => {
          callback();
        },
        enableFreeText ? 200 : 500
      ),
    []
  );

  useEffect(() => {
    let active = true;

    function getOption() {

      if(registerStatename === 'company' && inputValue.startsWith('Add ')){
        return;
      }

      if (inputValue.length < inputLength) {
        setOptionsLoading(false);
        !disableCloseOnSelect && setOptions([]);
        fetch(() => { });
      } else {
        fetch(async () => {
          setOptionsLoading(true);
          if (active) {
            try {
              setOptions([]);
              const allResponse = await searchFunction(inputValue);
              if (inputValue) {
                setOptions(allResponse);
              }
              setOptionsLoading(false);
            } catch (err) {
              console.log(err);
              setOptionsLoading(false);
            }
          }
        });
      }
    }

    getOption();

    return () => {
      active = false;
    };
    // eslint-disable-next-line
  }, [inputValue, fetch]);

  return (
    <HookAutoComplete
      {...registerState(registerStatename)}
      textFieldProps={{
        label,
        size: "small",
        InputProps: {
          endAdornment: (
            <>{optionsLoading ? <CircularProgress size={16} /> : null}</>
          ),
        },
        disabled: disabled,
      }}
      rules={{
        required: isRequired
          ? { value: true, message: "This field is required" }
          : false,
        ...(lengthMax && { maxLength: lengthMax }),
      }}
      autocompleteProps={{
        isOptionEqualToValue: (option: any, value: any) =>
          option.value === value.value,
        size: "small",
        disablePortal: disablePortal,
        noOptionsText: inputValue
          ? "No Options"
          : "Type first few characters of name or ID",
        options: options,
        multiple: multi,
        style: { backgroundColor: "white" },
        includeInputInList: true,
        disableCloseOnSelect: disableCloseOnSelect,
        filterSelectedOptions: true,
        onInputChange: (event: any, newInputValue) => {
          event && setInputValue(newInputValue);
        },
        loading: optionsLoading,
        renderOption,
        disabled: disabled,
        // freeSolo: enableFreeText,
        filterOptions: enableFreeText
          ? (options: any, params) => {
            let filtered = filter(options, params);
            if(registerStatename === 'company'){
              filtered = options
            }
            const { inputValue } = params;
            let isExisting = false;

            for (let option of options) {
              if (option?.label?.trim().toLowerCase() === params?.inputValue?.trim().toLowerCase()) {
                isExisting = true;
                break; // Optionally break the loop if you only need to find one match
              }
            }

            if (inputValue !== "" && !isExisting && !optionsLoading) {
              filtered.push({
                value: null,
                label: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }
          : (x) => x,
        onChange: async (event, newValue: any) => {
          // Add Company
          if (enableFreeText) {
            if (newValue && !newValue.value) {
              let label: string = newValue.label;
              label = label.substring(
                label.indexOf('"') + 1,
                label.lastIndexOf('"')
              );
              setLoading(true);
              try {
                const data = await addCompanies(label);
                setValue(registerStatename, data);
                setOptions((option: any) => [data, ...option]);
                setLoading(false);
              } catch {
                setLoading(false);
              }
            }
          }

          // If Value is Needed
          if (isValueNeeded) {
            getValue(newValue);
          }
        },
      }}
    />
  );
};

export default TextfieldAsyncSearchHook;
