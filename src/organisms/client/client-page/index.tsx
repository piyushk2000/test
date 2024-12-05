import ClientHeader from "../../../molecules/app-bars/client-page";
import BcgOverview from "./bcg";
import OfficeAddresses from "../../../molecules/client/client-page/officeAddresses";
import BackToPageBtn from "../../../atoms/backToPageBtn";
import { AppRoutes } from "../../../constants";
import { useEffect, useState } from "react";
import { BCGData, ClientProfileData } from "./types";
import { getAllClientOffice, getBCGData } from "./helper";
import { tabStyle } from "../../../molecules/calender-picker-dialog/helper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { useClientPageContext } from "../../../pages/Client/helper";
import AllContacts from "../../contacts/allContacts";
import AllCompliances from "../../compliances/allCompliances";
import { UsageTab } from "./usage/usage";
import { useSearchParams } from "react-router-dom";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const ClientPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const open_poc = useGetParams("open_poc");
  const id = useGetParams("id");
  const name = useGetParams("name");
  const fk_cem = useGetParams("fk_cem");
  const loggedInUserId = localStorage.getItem("id");
  const is_cem = (loggedInUserId && fk_cem) ? loggedInUserId === fk_cem : false;

  const initialTab = searchParams.get('tab') ? parseInt(searchParams.get('tab')!, 10) : (open_poc ? 2 : 0);
  const [valueTab, setValueTab] = useState<number>(initialTab);
  const clientId = id;
  const clientName = name;
  const [data, setData] = useState<ClientProfileData>({
    office_addresses: null,
  });
  const [dataTable, setDataTable] = useState<BCGData>(null);
  const { setLoading } = useFullPageLoading();
  const { filterPayload, setFilterPayload } = useClientPageContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), tab: newValue.toString() }, { replace: true });
  };

  useEffect(() => {
    id && getAllClientOffice(id, setData);
  }, [id]);

  useEffect(() => {
    setFilterPayload((prev) => ({
      ...prev,
      bcgTab: 6,
      isFilterChange: false
    }))
    getBCGData(clientId, setDataTable, setLoading, 6);
    // setFilterPayload((prev) => ({
    //   ...prev,
    //   isFilterChange: false
    // }))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  return (
    <>
      {id && (
        <ClientHeader
          title="Client Profile"
          fromClientDetailPage={true}
          id={id}
          refetch={async () => {
            await getAllClientOffice(id, setData);
          }}
          name={name}
          isSearch={false}
        />)}
      <BackToPageBtn
        title="Back to Clients"
        navigateTo={AppRoutes.CLIENTS + "/all"}
      />
      <Grid container mt="1px">
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={valueTab}
              onChange={handleChange}
              aria-label="Client Yab"
            >
              <Tab label="Client Details" {...a11yProps(0)} sx={{ ...tabStyle, fontSize: '14px' }} />
              <Tab label="Client Compliance" {...a11yProps(1)} sx={{ ...tabStyle, fontSize: '14px' }} />
              <Tab label="POCs" {...a11yProps(2)} sx={{ ...tabStyle, fontSize: '14px' }} />
              <Tab label="Usage" {...a11yProps(3)} sx={{ ...tabStyle, fontSize: '14px' }} />
              <Tab label="Addresses" {...a11yProps(4)} sx={{ ...tabStyle, fontSize: '14px' }} />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <CustomTabPanel value={valueTab} index={0}>
              {clientId && clientName && <BcgOverview clientId={clientId} clientName={clientName} data={dataTable} setData={setDataTable} />}
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>
              <AllCompliances contained={true} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={2}>
              <AllContacts contained={true} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={3}>
              <UsageTab is_cem={is_cem} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={4}>
              {id && (
                <OfficeAddresses
                  officeAddresses={data.office_addresses}
                  id={id}
                  refetch={async () => {
                    await getAllClientOffice(id, setData);
                  }}
                  name={name}
                />
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientPage;


