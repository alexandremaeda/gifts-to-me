import React from "react";

import Typography from "@mui/material/Typography";

export default function Header({ title }) {
  return (
    <header>
      <Typography variant="h3" component="div" gutterBottom>
        Gifts to Me | {title}
      </Typography>
    </header>
  );
}
