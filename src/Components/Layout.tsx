import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { Flex, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Layout = ({ children }) => {
  return (
    <Box backgroundColor={useColorModeValue("#FFFDFD", "#1C2826")}>
      <Header />
      <Flex pt="70px" justifyContent="center">
        {children}
      </Flex>
      <Footer />
    </Box>
  );
};
export default Layout;
