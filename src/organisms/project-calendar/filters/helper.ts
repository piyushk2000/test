import { removeDuplicatesObjects } from "../../../utils/utils";
import { formatLabelValue } from "../../project-detail/helper";
import { SetFormOptions } from "./type";

export function getAmOptions(rawCallData: any, setFormOptions: SetFormOptions) {
  const options: any[] = [];
  rawCallData &&
    Object.values(rawCallData)?.forEach((item: any) => {
      for (let call of item) {
        if (call.account_manager_value) {
          options.push(formatLabelValue(call.account_manager_value));
        }
      }
    });

  const uniqueOptions = removeDuplicatesObjects(options);

  setFormOptions((prev) => ({ ...prev, am: uniqueOptions }));
}
