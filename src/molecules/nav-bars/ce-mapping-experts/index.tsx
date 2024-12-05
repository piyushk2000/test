import NavbarCommon from '../../nav-bar-common';
import CEMappingExpertsNavbarItems from './navbarItems';

type Props = {
    isFilterApplied: boolean;
    resetFilters(): void;
}

const CEMappingExpertsNavbar = ({
    isFilterApplied,
    resetFilters}: Props) => {

    return (
        <>
            <NavbarCommon
                isSelectClicked={false}
                isSelectApplied={false}
                NavbarItems={<CEMappingExpertsNavbarItems />}
                resetFilters={resetFilters}
                isFilterApplied={isFilterApplied}
                selectActionSubmitBtnName='Choose Experts'
            />
        </>
    )
}

export default CEMappingExpertsNavbar