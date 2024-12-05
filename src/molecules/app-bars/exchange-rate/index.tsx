import { useExchangeRateContext } from "../../../pages/exchange-rate/context";
import AppBarCommon from "../../app-bar-common";

const ExchangeRateHeader = () => {

  const { setDialog } = useExchangeRateContext();

  return (
    <>
      <AppBarCommon
        title="Exchange Rates"
        isUserIcon
        isSearch={false}
        isIconDefine={false}
        isAddIcon
        addIconLabel="Add"
        onAddIconClick={() => {
          setDialog((prev) => ({
            ...prev,
            add: {
              state: true
            }
          }))
        }}
      />
    </>
  );
};

export default ExchangeRateHeader;
