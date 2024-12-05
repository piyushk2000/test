import { SelectedCards, shortlistExpertTypes } from "../../type";
import MultipleExperts from "../multipleExperts";
import ExpertDetails from "./expertDetails";
import ShortlistForm from "./form";

type Props = {
  expertDetails: shortlistExpertTypes;
  handleClose: () => void;
  handleSubmitClose: () => void;
  pe_id: number | null;
  setBackdrop: (b: boolean) => void;
  selectedCards: SelectedCards[];
  isMultiple: boolean;
};

const ShortlistExpert = ({
  expertDetails,
  handleClose,
  handleSubmitClose,
  pe_id,
  setBackdrop,
  selectedCards,
  isMultiple
}: Props) => {
  return (
    <>
      {isMultiple ?
        <MultipleExperts selectedCards={selectedCards} />
        : <ExpertDetails expertDetails={expertDetails} />
      }
      {(isMultiple && selectedCards.length === 0) ? <></> :
        <ShortlistForm
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
          pe_id={pe_id}
          setBackdrop={setBackdrop}
          selectedCards={selectedCards}
          isMultiple={isMultiple}
        />
      }
    </>
  );
};

export default ShortlistExpert;
