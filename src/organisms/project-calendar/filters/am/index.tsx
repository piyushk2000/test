import { useProjectCalenderFilterContext } from "../filterContext";
import AmFormFilter from "./form";

const AMFilter = () => {
  const { expanded } = useProjectCalenderFilterContext();
  return <>{expanded.am && <AmFormFilter />}</>;
};

export default AMFilter;
