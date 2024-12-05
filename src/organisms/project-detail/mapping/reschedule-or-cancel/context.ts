import { createContext, useContext } from "react";
import { ScheduleCallsArr } from "./helper";

type contextTypes = {
  scheduleCalls: ScheduleCallsArr;
  handleClose: () => void;
};

export const RescheduleCancelContext = createContext<contextTypes | null>(null);

export const useRescheduleCancelContext = () => {
  const context = useContext(RescheduleCancelContext);

  if (!context) {
    throw new Error(
      "RecheduleCancelContext must be used within Context Provider"
    );
  }

  return context;
};
