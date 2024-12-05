import NavbarCommon from '../../nav-bar-common';
import ExchangeRateNavbarItems from './navbarItems';

type Props = {
    isFilterApplied: boolean;
    resetFilters(): void;
}

const ExchangeRateNavbar = ({
    isFilterApplied,
    resetFilters}: Props) => {

    return (
        <>
            <NavbarCommon
                isSelectClicked={false}
                isSelectApplied={false}
                NavbarItems={<ExchangeRateNavbarItems />}
                resetFilters={resetFilters}
                isFilterApplied={isFilterApplied}
                selectActionSubmitBtnName='Choose Experts'
            />
        </>
    )
}

export default ExchangeRateNavbar