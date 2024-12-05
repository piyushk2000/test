import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect, SetStateAction } from "react";
import OfficeAddress from "../../../atoms/client/client-page/officeAddress";
import ConditionallyRender from "../../../atoms/conditional-render";
import { ClientHeaderIcons, ClientMenuIcons } from "../../client-profile-header";
import MenuListIcon from "../../../assets/images/client/list.png";
import MenuListIconWhite from "../../../assets/images/client/list_white.png";
import MenuIcon from "../../../assets/images/client/menu.png";
import MenuIconBlack from "../../../assets/images/client/menu_black.png";
import { allClientNavbarContainer } from "../client-navbar/style";
import { ClientOfficeData } from "../../../organisms/client/client-page/types";
import TableViewCommon from "../../table-view-common";
import { headCells } from "./helper";
import { TableCell } from "@mui/material";
import EditDeleteMenu from "../../../atoms/client/client-page/editDeleteMenu";
import { useClientPageContext } from "../../../pages/Client/helper";

const listBtnStyle = {
  backgroundColor: "#EC9324",
};
const menuBtnStyle = {
  backgroundColor: "#ffffff",
};

type Props = {
  officeAddresses: ClientOfficeData[] | null;
  id: string;
  refetch: () => Promise<void>;
  name: string | null;

};

const OfficeAddresses = ({ officeAddresses, id, refetch, name }: Props) => {
  const [isCardView, setIsCardView] = useState(true);
  const [selectedToggleOption, setSelectedToggleOption] = useState('card');
const { setClientPageDialogs } = useClientPageContext();
  const onToggleOptionChange = (option: string) => {
    setIsCardView(option === "card");
    setSelectedToggleOption(option);
  };
  const renderToggleButtons = () => (
    <div style={{ display: "flex", paddingBottom: "3px", backgroundColor: 'white', borderRadius: '29px', paddingTop: '3px', paddingRight: '4px', alignItems: 'center' }}>
      <ConditionallyRender render={true}>
        <ClientHeaderIcons
          isIcon
          title="Card View"
          icon={selectedToggleOption === "card" ? MenuIcon : MenuIconBlack}
          width="80%"
          height="80%"
          style={selectedToggleOption === "card" ? null : menuBtnStyle}
          handleClick={() => onToggleOptionChange("card")}
        />
      </ConditionallyRender>
      <ConditionallyRender render={true}>
        <ClientMenuIcons
          isIcon
          title="Table View"
          icon={selectedToggleOption === "list" ? MenuListIconWhite : MenuListIcon}
          width="80%"
          height="80%"
          style={selectedToggleOption === "list" ? listBtnStyle : null}
          handleClick={() => onToggleOptionChange("list")}
        />
      </ConditionallyRender>
    </div>
  );

const handleEditClick = (address: ClientOfficeData) => {
  setClientPageDialogs((prev) => ({
    ...prev,
    editOffice: {
      client_id: address.client_id.toString(),
      office_id: address.id.toString(),
      isChange: false,
      state: true,
      name: address.name || "",
      refetch,
      defaultValues: {
        ...address,
        country: { label: address.country, value: address.country }
      }
    }
  }))
};

  const renderContent = () => {
    if (isCardView) {
      return (
        <Grid container mt={"1rem"} spacing={2}>
          {officeAddresses?.map((office) => (
            <Grid key={office.id} item xs={12} md={6} lg={4}>
              <OfficeAddress key={office.id} office={office} client_name={name} refetch={refetch} />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <>
        <Box sx={allClientNavbarContainer} mt={"24px"}>
        </Box>
        <TableViewCommon
          rows={officeAddresses || []}
          totalSelected={0}
          title="Addresses Table"
          headCells={headCells}
          isSelected={false}
          selectAllowed={() => false}
          handleTableRowClick={() => {}}
          tableCells={(row) => (
            <>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.entityName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>
                <EditDeleteMenu
                  editBtnClick={() => handleEditClick(row)}
                />
              </TableCell>
            </>
          )}
          containerSx={{ maxHeight: "60vh" }}
          paperSx={{ marginBottom: "0" }}
          outerBoxSx={{ mt: "0" }}
          isItemSelected={() => false}
          handleSelectAllClick={() => { }}
        />
      </>
    );
  };

  return (
    <>
      {renderToggleButtons()}
      {renderContent()}
    </>
  );
};
export default OfficeAddresses;

  {/* return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"1rem"}
        ml={"1rem"}
        pt={"1rem"}
      >
        <Typography sx={{ fontWeight: "500" }}>Office Addresses</Typography>
        <IconButton
          sx={addOfficeBtn}
          onClick={() =>
            setClientPageDialogs &&
            setClientPageDialogs((prev) => ({
              ...prev,
              addOffice: { ...prev.addOffice, state: true, id, refetch, name: name },
            }))
          }
        >
          <AddIcon sx={addIconStyle} />
        </IconButton>
      </Stack> */}


{/* <Grid container mt={"1rem"} spacing={2}>
         {officeAddresses?.map((office) => (
           <Grid key={office.id} item xs={12} md={6} lg={4}>
            <OfficeAddress key={office.id} office={office} client_name={name} refetch={refetch} />
          </Grid>
         ))}
       </Grid>
     </> */}