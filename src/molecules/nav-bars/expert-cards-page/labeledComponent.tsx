import { Stack, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  component: React.ReactNode;
  typographySx?: SxProps<Theme>;
};

export default function LabeledComponent({ label, component, typographySx = {} }: Props) {
  return (
    <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
      {!!label &&
        <Typography variant="h6" sx={typographySx}>{label}</Typography>
      }
      {component}
    </Stack>
  );
}
