type Props = {
  priority: "High" | "Medium" | "Low" | "Closed";
  styles?: React.CSSProperties;
};

const colorMap = {
  High: "#E26262",
  Medium: "#EFA24A",
  Low: "#15B867",
  Closed: "white"
};

const PriorityChip = ({ priority, styles }: Props) => {
  return (
    <div style={{ background: colorMap[priority], border: "2px solid" + colorMap[priority], ...styles }} className="priority-chip">
      {priority}
    </div>
  );
};

export default PriorityChip;
