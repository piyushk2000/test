import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { usePeMappingContext } from '../../../organisms/project/project-pe-mapping/helper';
import MultiTabFilters from '../../../atoms/tabs-selector/multi';
import { statusTabFilterOptions } from './helper';

const PEMappingNavbar = () => {

    const { setPeDialog, isDialog } = usePeMappingContext();
    return (
        <Box sx={{
            marginTop: "1rem",
            display: "flex",
            marginBottom: "0",
            borderBottom: "1px solid rgba(112, 112, 112, 0.21)",
            alignItems: "center",
            gap: "1rem",
            mt: 1
        }}>
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
        </Box>
    )
}

export default PEMappingNavbar