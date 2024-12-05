import { FC } from "react";

export const TitleValueTable: FC<{
  text: string;
  title: string;
  isCapital?: boolean;
}> = ({ text, title, isCapital = false }) => {
  return (
    <div className="detail-container-flex">
      <p className="detail-title">{title}</p>
      <p className={`detail-text ${isCapital && "captial-text"}`}>{text}</p>
    </div>
  );
};
