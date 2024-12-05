import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../../../assets/images/AppBar/search.png";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = {
  placeholder: string;
  onSearch: (text: string) => void;
  searchValue: string;
  minWidth?: string,
  maxWidth?: string;
  m?: {
    xs: string;
    sm: string;
  },
  p?: string;
};

export default function SearchBar({ placeholder, onSearch, searchValue, minWidth, maxWidth, m, p }: Props) {

  return (
    <Paper
      sx={{
        m: m || {
          xs: "0.75rem 0",
          sm: "0 1rem",
        },
        p: p || "5px 12px",
        paddingRight: "2px",
        display: "flex",
        alignItems: "center",
        borderRadius: "25px",
        backgroundColor: "rgba(111, 105, 105, 0.07)",
        boxShadow: "none",
        maxWidth: maxWidth || "500px",
        minWidth: minWidth || {
          xs: "200px",
          sm: "200px",
          md: "250px",
          lg: "400px",
        },
        height: "32px",
      }}
    >
      <Box>
        <img
          alt="search icon"
          src={SearchIcon}
          width={"14px"}
          style={{ opacity: "0.5" }}
        />
      </Box>
      <InputBase
        value={searchValue}
        type="text"
        onChange={(event) => {
          onSearch(event.target.value);
        }}
        sx={{
          ml: 0,
          flex: 1,
          fontSize: "12px",
          fontWeight: "500",
          pl: "10px",
          "&::-webkit-search-clear-button": {
            display: "none",
          },
          "&::-webkit-search-cancel-button": {
            display: "none",
          },
        }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "Search bar" }}
      />
      {searchValue && (
        <IconButton
          onClick={() => {
            onSearch("");
          }}
        >
          <CloseIcon
            sx={{
              fontSize: "18px",
            }}
          />
        </IconButton>
      )}
    </Paper>
  );
}
