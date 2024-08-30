import { createTheme } from "@mui/material/styles";
import { PRIMARY_COLOR } from "./colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
  },
});
