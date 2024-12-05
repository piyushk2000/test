import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import { BoxStyle } from "./style";

type props = {
  Body: any;
  TableHeadings: any;
};

export default function TableListView({ Body, TableHeadings }: props) {
  return (
    <Box sx={BoxStyle} className="horizontal-scrollbar">
      <Table aria-label="simple table">
        <TableHead>
          <TableHeadings />
        </TableHead>
        <TableBody>
          <Body />
        </TableBody>
      </Table>
    </Box>
  );
}
