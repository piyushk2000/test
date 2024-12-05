import { useMyCalenderContext } from "../../../pages/my-calendar/context"
import NavbarCommon from "../../nav-bar-common"
import MyCalenderNavbarItems from "./navbarItems"


const MyCalenderNavbar = () => {
    const { filters, resetFilters } = useMyCalenderContext();
    return (
        <NavbarCommon
            NavbarItems={<MyCalenderNavbarItems />}
            resetFilters={resetFilters}
            isFilterApplied={filters.isFilterApplied}
            isSelectApplied={false}
        />
    )
}

export default MyCalenderNavbar