import { HookAutoComplete } from "../../atoms/form-fields/SLFieldAutoComplete";
import { useGetCountries } from "../../utils/hooks/useGetCountries";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";


type Props = {
    id: string,
    label: String
}

const CountriesAutocomplete = ({label, id}: Props) => {
    const { registerState } =
    useHookFormContext();

  const { data: Countries, loading: countriesLoading } = useGetCountries();
  return (
    <HookAutoComplete
      {...registerState(id)}
      textFieldProps={{
        label,
        size: "small",
      }}
      rules={{
        required: { value: true, message: "This field is required" },
      }}
      autocompleteProps={{
        size: "small",
        options: Countries,
        style: { backgroundColor: "white" },
        loading: countriesLoading,
      }}
    />
  )
}

export default CountriesAutocomplete