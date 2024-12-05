import PageLayout from "../../atoms/page-layout";
import CallCalenderHeader from "../../molecules/app-bars/call-calendar";
import CallCalendarDisplayer from "../../organisms/call-calendar";

// CallCalendar IS NOT USED ANYWHERE AS OF NOW, DATED: 3 MAY 2024
// TODO: check if anything in these files are used somewhere or not. If not delete the whole call calendar Component
export default function CallCalendar() {
  return (
    <PageLayout>
      <CallCalenderHeader />
      <CallCalendarDisplayer />
    </PageLayout>
  );
}
