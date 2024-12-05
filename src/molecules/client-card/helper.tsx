import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

export const TitleValueTable: FC<{
  text: string | number;
  title: React.ReactNode;
  tooltipTitle?: React.ReactNode;
  tooltipText?: React.ReactNode;
}> = ({ text, title, tooltipTitle, tooltipText }) => {
  return (
    <>
      <p>
        <Tooltip title={tooltipTitle} arrow>
          <span>{title}</span>
        </Tooltip>{" "}
        :
      </p>

      <p className={styles.detailText}>
        <Tooltip title={tooltipText} arrow>
          <span>{text}</span>
        </Tooltip>
      </p>
    </>
  );
};

export const ProjectStats: FC<{ text: string | number; title: string; link?: string }> = ({
  text,
  title,
  link
}) => {
  return (
    <>
      {link ?
        <Link to={link || ""} rel="noreferrer noopener" target="_blank">
          <div className={styles.projectStatsContainer}>
            <p className={styles.projectStatsText}>{text}</p>
            <p className={styles.projectStatsTitle}>{title}</p>
          </div>
        </Link> :
        <div className={styles.projectStatsContainer}>
          <p className={styles.projectStatsText}>{text}</p>
          <p className={styles.projectStatsTitle}>{title}</p>
        </div>
      }
    </>
  );
};
