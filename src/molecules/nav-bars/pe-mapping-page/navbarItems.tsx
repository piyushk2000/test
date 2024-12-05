import Stack from '@mui/material/Stack';
import { usePeMappingContext } from '../../../organisms/project/project-pe-mapping/helper';
import MultiTabFilters from '../../../atoms/tabs-selector/multi';
import { statusTabFilterOptions } from './helper';

const PEMappingNavbarItems = () => {

    const { setPeDialog, isDialog } = usePeMappingContext();
    return (
        <>
            <Stack direction={"row"} alignItems={"center"}>
                <MultiTabFilters
                    setFormats={(s: string[]) => {
                        setPeDialog((prev) => ({
                            ...prev,
                            filter: {
                                ...prev.filter,
                                status: s,
                                isChange: true,
                                isFiltersApplied: true
                            }
                        }))
                    }}
                    formats={isDialog.filter.status}
                    options={statusTabFilterOptions}
                />
            </Stack>
        </>
    )
}

export default PEMappingNavbarItems