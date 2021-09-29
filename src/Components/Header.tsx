import React from "react";

import { Flex, Heading, Text, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex textAlign="center" flexDir="column" p="5px">
      <Heading size="2xl" color="#427AA1">
        Welcoming Message idk
      </Heading>
      <Text>This app does this.</Text>
      <Text>
        Brought to you by: <Link href="./asopdk">Me :)</Link>
      </Text>
    </Flex>
  );
};

export default Header;
