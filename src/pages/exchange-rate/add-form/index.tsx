import { useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import AddExchangeRateForm from "./form";
import { DateOptions } from "../types";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { LocalDayjs } from "../../../utils/timezoneService";
import { CircularProgress } from "@mui/material";
import NoResultFoundFilters from "../../../atoms/noResultsFilters";

type Props = {
    isOpen: boolean;
    handleClose(): void;
}

export default function AddExchangeRateDialog({ isOpen, handleClose }: Props) {
    const [dateOptions, setDateOptions] = useState<DateOptions>(null);

    useEffect(() => {
        if (isOpen) {
            (async () => {
                const response = await RequestServer(APIRoutes.EXCHANGE_RATE + "/date", "GET");

                if (response.success) {
                    const data: string[] = response.data;

                    const formattedData = data.map(d => {
                        return {
                            label: LocalDayjs(d).format("DD MMMM YYYY"),
                            value: d
                        }
                    })

                    setDateOptions(formattedData);
                } else {
                    setDateOptions([]);
                }
            })()
        }
    }, [isOpen])

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={`Add Exchange Rates Data`}
        >
            {dateOptions ?
            <>
            {dateOptions.length === 0 ? <NoResultFoundFilters text={"Data is already updated"} /> : <AddExchangeRateForm
                    handleClose={handleClose}
                    dateOptions={dateOptions}
                />}
            </>
                
                : <CircularProgress sx={{ marginTop: "10px" }} />
            }
        </DialogModal>
    )
}