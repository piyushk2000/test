import { FC } from "react";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import BankDetailsIndia from "../bank-details-india";
import BankDetailsOthers from "../bank-details-others";

const FullDetailsForm = ({isEdit}: {isEdit: boolean}) => {
  const { watch } = useHookFormContext();

  const bank_country = watch("bank_country");

  return (
    <>{bank_country === "India" ? <BankDetailsIndia isEdit={isEdit} /> : <BankDetailsOthers country={bank_country} />} </>
  );
};

export default FullDetailsForm;
