import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type CommonProps = {
  title: string;
};

type SearchProps = {
  isSearch: true;
  searchLabel: string;
  onSearch: (query: string) => void;
  searchValue?: string;
};

type NoSearchProps = {
  isSearch: false;
};

type NoIconDefination = {
  isIconDefine: false;
  onIcondefineClick?(): void;
};

type IconDefination = {
  isIconDefine: true;
  onIcondefineClick(): void;
};

type ActionIcons = {
  isInfo?: boolean;
  onInfoClick?: () => void;
  isFilter?: boolean;
  onFilterClick?: () => void;
  isSetting?: boolean;
  onSettingClick?: () => void;
  isUserIcon?: boolean;
  isAddIcon?: boolean;
  isAddThroughIcon?: boolean;
  AddIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  AddThroughIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  addIconLabel?: string;
  onAddIconClick?: () => void;
  addThroughIconLabel?: string;
  onAddThroughIconClick?: () => void;
  isAdvanceFilter?: boolean;
  titleLeftComponent?: boolean;
};

type Extra = {
  isExtraComponent?: boolean;
  component?: JSX.Element;
  isExtraLeftComponent?: boolean;
  leftComponent?: JSX.Element;
  isSidebar?: boolean;
  hover_html?:any
  hover_html_on_left?:boolean
  downloadBtnClickHandler?: () => void;
};

export type AppbarToggleOptions = "card" | "list" | "kanban";

type ToggleButtonProps = {
  isToggle: true;
  toggleOptions: AppbarToggleOptions[];
  selectedToggleOption: AppbarToggleOptions;
  onToggleOptionChange: (option: AppbarToggleOptions) => void;
};
type NoToggleButtonProps = {
  isToggle?: false;
};

export type AppBarProps = CommonProps &
  ActionIcons &
  (SearchProps | NoSearchProps) &
  (ToggleButtonProps | NoToggleButtonProps) &
  (IconDefination | NoIconDefination) & 
  Extra;
