import { useHookFormContext } from '../../utils/hooks/useHookFormContext';
import { isdValues } from '../../utils/isdCodes';
import { HookAutoComplete } from '../form-fields/SLFieldAutoComplete';

type Props = {
    registerStateName: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    label?: string;
}

const IsdAutoCompleteField = ({ registerStateName, isRequired = false, isDisabled = false, label = "ISD" }: Props) => {
    const { registerState } = useHookFormContext();
    return (
        <HookAutoComplete
            {...registerState(registerStateName)}
            textFieldProps={{
                label: label,
                size: "small",
            }}
            rules={{
                required: { value: !!isRequired, message: "This field is required" }
            }}
            autocompleteProps={{
                disabled: isDisabled,
                isOptionEqualToValue: (option, value) =>
                    option.value === value.value,
                multiple: false,
                options: isdValues.map((isd) => ({
                    value: isd.dial_code,
                    label: isd.dial_code,
                    name: `${isd.name.toLocaleLowerCase()} (${isd.dial_code})`,
                })),
                size: "small",
                style: { backgroundColor: "white" },
                renderOption: (props, option: any) => {
                    return (
                        <li {...props} key={option.name}>
                            {option?.name}
                        </li>
                    );
                },
                filterOptions: (options, { inputValue }) => {
                    const inputValueLowercased: string = inputValue.toLowerCase();
                    return options.filter((option) =>
                        option?.name.includes(inputValueLowercased)
                    );
                },
            }}
        />
    )
}

export default IsdAutoCompleteField