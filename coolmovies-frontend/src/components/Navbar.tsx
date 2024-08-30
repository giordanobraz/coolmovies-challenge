import { css } from "@emotion/react";
import { Paper, Typography, useTheme } from "@mui/material";
import { PRIMARY_COLOR } from "../styles/colors";

const Navbar = () => {
  return (
    <Paper elevation={3} css={styles.navBar}>
      <Typography>{"EcoPortal"}</Typography>
    </Paper>
  );
};

const styles = {
  navBar: css({
    backgroundColor: PRIMARY_COLOR,
    height: 50,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    padding: 16,
    borderRadius: 0,
    p: {
      color: "white",
    },
  }),
};

export default Navbar;
