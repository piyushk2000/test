import { Data } from '../list-view/types';
import PEExpertCard from '../../../../atoms/pe-expert-card';
import Grid from '@mui/material/Grid';
import CardsLoadingScreen from '../../../../atoms/cardsLoader';
import { selectAllowed, usePeMappingContext } from '../helper';
import { isSelected, toggleItemInArray } from '../../../../common/select';
import { SelectedCards } from '../type';

type Props = {
    rows: Data[];
    project_id: string;
    loading: boolean;
}

const PEExpertMappingCardView = ({ rows, project_id, loading }: Props) => {
    const { selectExpert, setSelectExpert, selectedAction } = usePeMappingContext();

    return (
        <Grid container spacing={2} mt={1}>
            {loading ? <CardsLoadingScreen height="158px" /> :
                rows.map((row) =>
                    <>
                        {/* 
                           If user clicks on the select option in navbar
                           we are showing only those cards who are allowed
                        */}
                        {(selectAllowed(selectedAction, row) || !selectExpert.isSelected) &&
                            <Grid key={row.pe_id} item xs={12} md={6} lg={4}>
                                <PEExpertCard
                                    row={row}
                                    project_id={project_id}
                                    isSelectAllowed={selectAllowed(selectedAction, row)}
                                    selected={isSelected<SelectedCards>(row.pe_id!!, selectExpert.selectedCards)}
                                    toggleSelected={() => {

                                        setSelectExpert((prev) => ({
                                            ...prev,
                                            selectedCards: toggleItemInArray<SelectedCards>(prev.selectedCards, {
                                                label: row.name,
                                                value: row.pe_id!!,
                                                company: row.curr_company,
                                                designation: row.curr_designation,
                                                pe_id: row.pe_id,
                                                expert_id: row.expert_id,
                                                expert_name: row.name,
                                                location: row.curr_company_location,
                                                is_agenda_respond: row.is_agenda_respond,
                                                snippet: row.meta.snippet || null,
                                                meta: row.meta,
                                                charges: row.meta.selling_price_currency && row.meta.selling_price ? `${row.meta.selling_price_currency} ${row.meta.selling_price}` : "",
                                                badge: row.badge
                                            }),
                                        }));
                                    }}
                                />
                            </Grid>
                        }
                    </>

                )
            }
        </Grid>
    )
}

export default PEExpertMappingCardView