import { useProjectCalenderFilterContext } from "../filterContext";
import ClientFormFilter from "./form";

const ClientFilter = () => {
  const { expanded } = useProjectCalenderFilterContext();
  return <>{expanded.client && <ClientFormFilter />}</>;
};

export default ClientFilter;
