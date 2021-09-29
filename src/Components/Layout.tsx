import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Flex pt="70px" justifyContent="center">
        {children}
      </Flex>
      <Footer />
    </div>
  );
};
export default Layout;
