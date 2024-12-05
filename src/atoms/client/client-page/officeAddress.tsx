import { containerCommonStyles } from "../../../organisms/client/client-page/style";
import { ClientOfficeData } from "../../../organisms/client/client-page/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditDeleteMenu from "./editDeleteMenu";
import { useClientPageContext } from "../../../pages/Client/helper";

type Props = {
  office: ClientOfficeData;
  client_name: string | null;
  refetch: () => Promise<void>;
};

const contentStyles = { fontSize: "12px !important" };

const OfficeAddress = ({ office, client_name, refetch }: Props) => {
  const { setClientPageDialogs } = useClientPageContext();
  return (
    <Box sx={{ ...containerCommonStyles }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontWeight={"500"}>{office.name}</Typography>
          <Typography mb={"0.25rem"} sx={contentStyles}>
            {office.entityName}
          </Typography>
        </Box>

        <Box>
          <EditDeleteMenu editBtnClick={() => {
            setClientPageDialogs((prev) => ({
              ...prev,
              editOffice: {
                client_id: office.client_id.toString(),
                office_id: office.id.toString(),
                isChange: false,
                state: true,
                name: client_name || "",
                refetch,
                defaultValues: {
                  ...office,
                  country: { label: office.country, value: office.country }
                }
              }
            }))
          }} />
        </Box>
      </Stack>

      <Stack>
        <Typography sx={contentStyles}>{office.city}</Typography>
        <Typography sx={contentStyles}>{office.address}</Typography>
        <Typography sx={contentStyles}>{office.country}</Typography>
      </Stack>
    </Box>
  );
};

export default OfficeAddress;
