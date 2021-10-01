import React from "react";

import { Flex, Heading, Text, Button, useColorMode, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex textAlign="center" flexDir="column" p="5px">
      <Heading size="2xl" color="#7785AC">
        Conversor de Duto
      </Heading>
      <Text>Uma calculadora de formatos de dutos e calcular frequencia de ressonância.</Text>

      {/* Hidden feature? :) */}
      <Button maxW="200px" m="auto" onClick={toggleColorMode} display="none">
        <Box p="0 5px">Usar Tema {colorMode === "light" ? "Escuro" : "Claro"}</Box>
        <Box p="0 5px">{colorMode === "light" ? <SunIcon /> : <MoonIcon />}</Box>
      </Button>
    </Flex>
  );
};

export default Header;
