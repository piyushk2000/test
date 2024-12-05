import { Tooltip } from "@mui/material";
import { FC } from "react";
import { projectApiDataItem } from "../../pages/Projects/types";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants";

export function caseCodeText(caseCode: string[]): [string, string] {
  if (!Array.isArray(caseCode)) return ["", ""];

  if (caseCode?.length === 0) {
    return ["", ""];
  }

  let caseCodeStr = caseCode[0];
  let caseCodeRem = "";

  caseCode?.forEach((c: string, i: number) => {
    const length = c.length + caseCodeStr.length;
    if (i !== 0) {
      if (length < 25) {
        caseCodeStr = caseCodeStr + ", " + c;
      } else {
        caseCodeRem = caseCodeRem ? caseCodeRem + ", " + c : caseCodeRem + c;
      }
    }
  });

  return [caseCodeStr, caseCodeRem];
}

export const TitleValueTable: FC<{
  text: JSX.Element | string;
  title: string;
  caseCodeRem?: string | null;
  isCapital?: boolean;
  isTextNotString?: boolean;
  textStyle?: React.CSSProperties;
  textOnClick?: React.MouseEventHandler<HTMLParagraphElement>
}> = ({ text, title, caseCodeRem, isCapital = false, isTextNotString = false, textStyle, textOnClick }) => {
  return (
    <div className="detail-container-flex">
      <p className="detail-title">{title}</p>
      {isTextNotString ? text :
        <p className={`detail-text ${isCapital && "captial-text"}`} style={textStyle} onClick={textOnClick}>
          {text}
          {caseCodeRem && (
            <>
              {", "}
              <Tooltip enterTouchDelay={100} title={caseCodeRem} arrow>
                <span className="span-case-rem">more</span>
              </Tooltip>
            </>
          )}
        </p>
      }

    </div>
  );
};

export const ProjectStats: FC<{ text: string | number; title: string, onClick?: React.MouseEventHandler<HTMLDivElement> }> = ({
  text,
  title,
  onClick
}) => {
  return (
    <div style={{ cursor: onClick ? "pointer" : "initial" }} onClick={onClick} className="project-stats-container">
      <p className="project-stats-text">{text}</p>
      <p className="project-stats-title">{title}</p>
    </div>
  );
};

// IS RESEARCH ANALYST OR ACCOUNT MANAGER
export function isRAorAM(project: projectApiDataItem | null) {
  const userId = localStorage.getItem("id");
  if (!userId) return false;
  if (!project || !project?.research_analysts || project?.account_manager) return false;
  return project.research_analysts.includes(userId) || String(project.account_manager) === userId;
}

export const ClientCalls = ({ Done, Scheduled }: { Done: string | null, Scheduled: string | null }) => {
  return (
    <p className={`detail-text`}>
      <ClickLinkEl
        link={`${AppRoutes.CALLS}`}
        value={Done}
        text="Done"
      />
      {" "}|{" "}
      <ClickLinkEl
        link={`${AppRoutes.CALLS}`}
        value={Scheduled}
        text="Scheduled"
      />
    </p>
  )
}

export const ClientProfiles = ({ shared, shortlist, pending, encoded_title, id }: { shared: string | null, shortlist: string | null, pending: string | null, encoded_title: string | null, id: number | null }) => {
  return (
    <p className="detail-text">
      <ClickLinkEl
        link={AppRoutes.PROJECT_PE_MAPPING + "?project_id=" + id + "&exclude_added=true&project_title=" + encoded_title}
        value={shared}
        text="Shared"
      />{" "}|{" "}
      <ClickLinkEl
        link={`#`}
        value={shortlist}
        text="Shortlisted"
      />{" "}|{" "}
      <ClickLinkEl
        link={`#`}
        value={pending}
        text="Pending Review"
      />
    </p>
  )
}

export const ClickLinkEl = ({ link, value, text }: {
  link: string,
  value: string | null,
  text: string
}) => {
  return (
    <Link to={link} rel="noopener noreferrer" target="_blank"><span style={underlineTextLinkText}>{value || "-"}</span> {text}</Link>
  )
}

export const underlineTextLinkText = { textDecoration: "underline", color: "#ec9324" }