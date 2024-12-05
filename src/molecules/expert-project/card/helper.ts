import { s } from "@fullcalendar/core/internal-common";

export const invitationChipStyle = (
  expert_invitation: "Invited" | "Accepted" | "Declined"
) => {
  const sx = {
    color: "#808080",
    fontWeight: "600",
    backgroundColor: "#80808030",
    opacity: "0.8",
  };

  switch (expert_invitation) {
    case "Invited": {
      sx.color = "#808080";
      break;
    }
    case "Accepted": {
      sx.color = "#16A848";
      sx.backgroundColor = "#16A84830";
      break;
    }
    case "Declined": {
      sx.color = "#ff0000";
      sx.backgroundColor = "#ff000030";
      break;
    }
    default: {
      console.log("default grey color is applied to the chip");
    }
  }

  return sx;
};
