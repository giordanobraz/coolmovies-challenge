import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { css } from "@emotion/react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div css={styles.root}>{children}</div>
    </>
  );
};

const styles = {
  root: css({
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};

export default Layout;
