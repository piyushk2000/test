import "react-quill/dist/quill.snow.css";

type Props = {
  text: string;
  style?: React.CSSProperties;
};

export default function RichTextDisplayer({ text, style = {} }: Props) {
  return (
    <div className="ql-snow">
      <div
        className="view ql-editor"
        style={{ fontSize: "14px", marginTop: "2px", color: "#3C3F48", padding: 0, ...style }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
}
