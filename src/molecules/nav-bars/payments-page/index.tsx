import { usePaymentsContext } from "../../../pages/payments/context"
import { defaultFilterValues } from "../../../pages/payments/helper";
import NavbarCommon from "../../nav-bar-common"
import PaymentsNavbarItems from "./navbarItems";


const PaymentsNavbar = () => {
    const { filters, setFilters } = usePaymentsContext();

    return (
        <NavbarCommon
            NavbarItems={<PaymentsNavbarItems />}
            resetFilters={() => {
                setFilters((prev) => ({
                    ...defaultFilterValues,
                    isFilterChange: true
                }))
            }}
            isFilterApplied={filters.isFilterApplied}
            isSelectApplied={false}
        />
    )
}

export default PaymentsNavbar