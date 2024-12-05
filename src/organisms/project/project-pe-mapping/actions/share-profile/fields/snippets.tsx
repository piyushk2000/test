import Box from "@mui/material/Box";
import { snippetsStyle } from "../style";
import { useHookFormContext } from "../../../../../../utils/hooks/useHookFormContext";
import { HookRadioButton } from "../../../../../../atoms/form-fields/SLFieldRadioButton";
import RichTextDisplayer from "../../../../../../atoms/rich-text-editor/RichTextDisplayer";
import AddBoxIcon from "@mui/icons-material/Add";
import { Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomBtnFilled from "../../../../../../atoms/form-molecules/CustomBtnFilled";
import SearchBar from "../../../../../../molecules/app-bar-common/search-bar/searchOnChange";
import { useEffect, useState } from "react";

import { addButtonClickHandler, editButtonHandler, updateFields } from "../helper";
import { SnippetsWrapper, formattedSnippets, snippetAccordianStyle, snippetAccordianTitleStyle, snippetAddNSearchStyle, snippetRadioStyle } from "../type";
import EditIcon from '@mui/icons-material/Edit';
import SnippetFormDialog from "./snippetForm";

export type Snippet = {
  heading: string;
  description: string;
  id: string;
}


const Snippets = ({ expert_id, snippetsData }: { expert_id: number | null, snippetsData: formattedSnippets }) => {
  const { registerState } = useHookFormContext();


  const [searchValue, setSearchValue] = useState('');
  const [activeSnip, setActiveSnip] = useState<Snippet | null>(null);
  const [realSnippets, setRealSnippets] = useState<formattedSnippets>([]);
  const [searchedSnippets, setSearchSnippets] = useState<formattedSnippets>([]);

  const onSearch = (text: string) => {
    const searchText = text.toLocaleLowerCase();
    let searchData = realSnippets.filter((val) => val.heading.toLocaleLowerCase().includes(searchText) || val.description.toLocaleLowerCase().includes(searchText));
    setSearchSnippets([...searchData]);
    setSearchValue(text);
  }


  useEffect(() => {
    setRealSnippets(snippetsData);
    setSearchSnippets(snippetsData);
  }, []);

  return (
    <Box sx={snippetsStyle}>
      <Box sx={snippetAddNSearchStyle}>
        <CustomBtnFilled label={'Add Snippet'} variant="contained" onClick={() => addButtonClickHandler(setActiveSnip, realSnippets.length)}                >
          <AddBoxIcon sx={{ fontSize: "14px", mr: "5px" }} />
        </CustomBtnFilled>
        <SearchBar
          minWidth="300px"
          maxWidth="300px"
          placeholder={'Search Snippets'}
          onSearch={onSearch}
          searchValue={searchValue || ""}
        />
      </Box>
      {activeSnip ? (
        <SnippetFormDialog
          activeSnip={activeSnip}
          setActiveSnip={setActiveSnip}
          realSnippets={realSnippets}
          setRealSnippets={setRealSnippets}
          setSearchSnippets={setSearchSnippets}
          expert_id={expert_id}
        />
      ) : null}


      {realSnippets.length === 0 ?
        <p>There is <strong>no snippet in expert’s profile.</strong> Please <strong>
          Add Relevancy(ies)
        </strong> before sharing the profile with the client.</p>
        :
        <Box
          sx={SnippetsWrapper}
        >
          <HookRadioButton
            {...registerState("snippets")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}

            radioGroupProps={{
              sx: snippetRadioStyle,
            }}
            fields={searchedSnippets.map((snippet: any, index: number) => {
              return {
                label: (
                  <Accordion
                    key={snippet.heading + Math.random() + index}
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    sx={snippetAccordianStyle}>
                    <AccordionSummary
                      sx={{ width: '100%' }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"

                    >
                      <h2 style={snippetAccordianTitleStyle} className="snippet-heading">{snippet.heading}</h2>
                      <IconButton onClick={() => editButtonHandler(snippet, setActiveSnip)}>
                        <EditIcon style={{ width: "16px", height: "auto" }} />
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails onClick={(e) => {
                      e.preventDefault();
                    }}>
                      <RichTextDisplayer style={{ fontSize: "10px" }} text={snippet?.description} />
                    </AccordionDetails>
                  </Accordion>
                ),
                value: JSON.stringify(snippet),

              };
            })}
          />
        </Box>

      }

    </Box>
  );
};

export default Snippets;
