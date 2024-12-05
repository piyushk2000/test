import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../../../assets/images/AppBar/search.png";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { FormEvent, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";

type Props = {
  placeholder: string;
  onSearch: (text: string) => void;
  searchValue: string;
  minWidth?: string,
  showToolTip?: boolean,
  maxWidth?: string;
  m?: {
    xs: string;
    sm: string;
  },
  p?: string;
  showSearchIcon?: boolean
  type?: string;
};

export default function SearchBar({ placeholder, onSearch, searchValue, minWidth, maxWidth, m, p, showSearchIcon = true, showToolTip = false , type}: Props) {
  const [search, setSearch] = useState(searchValue);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    onSearch(search);
  }

  const getToolTip = () => {
    if(showToolTip && search.length > 2 ){
      return search
    }
    return null
  }

  return (
    <Tooltip title={getToolTip()} leaveTouchDelay={7000} enterTouchDelay={0} arrow placement="top" followCursor>
      <Paper
        component="form"
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
        onSubmit={onSubmit}
      >
        {
          showSearchIcon && <Box>
            <img
              alt="search icon"
              src={SearchIcon}
              width={"14px"}
              style={{ opacity: "0.5" }}
            />
          </Box>
        }

        <InputBase
          value={search}
          type={type || "text"}
          onChange={(event) => {
            setSearch(event.target.value);
            if(event.target.value === "") {
              onSearch("");
            }
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
        {search && (
          <IconButton
            sx={{
              padding: "2px",
            }}
            onClick={() => {
              setSearch("");
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
        <IconButton
          sx={{
            padding: "5px",
          }}
          type="submit"
        >
          <SendIcon
            sx={{
              fontSize: "18px",
              color: "rgba(0,0,0,0.5)",
            }}
          />
        </IconButton>
      </Paper>
    </Tooltip>
  );
}
