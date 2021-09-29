import React from "react";

import { Flex, Heading, Text, Link, Button, useColorMode, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex textAlign="center" flexDir="column" p="5px">
      <head>
        <title>Calculadora de Duto</title>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <meta data-react-helmet="true" name="twitter:card" content="summary"></meta>
        <meta
          data-react-helmet="true"
          name="twitter:description"
          content="Uma calculadora de formatos de dutos e calcular frequencia de ressonância."
        ></meta>
        <meta data-react-helmet="true" name="twitter:creator" content="Jorge Antônio da Silva Nascimento Junior"></meta>
        <meta data-react-helmet="true" property="og:title" content="Conversor de Duto"></meta>
        <meta
          data-react-helmet="true"
          property="og:description"
          content="Uma calculadora de formatos de dutos e calcular frequencia de ressonância."
        />
        <meta data-react-helmet="true" property="og:type" content="article"></meta>
      </head>

      <Heading size="2xl" color="#7785AC">
        Conversor de Duto
      </Heading>
      <Text>Uma calculadora de formatos de dutos e calcular frequencia de ressonância.</Text>
      <Text>
        Desenvolvido por:{" "}
        <Link href="https://jorgen-jr.github.io/" target="_blank">
          Jorge Jr :)
        </Link>
      </Text>

      {/* Hidden feature? :) */}
      <Button maxW="200px" m="auto" onClick={toggleColorMode} display="none">
        <Box p="0 5px">Usar Tema {colorMode === "light" ? "Escuro" : "Claro"}</Box>
        <Box p="0 5px">{colorMode === "light" ? <SunIcon /> : <MoonIcon />}</Box>
      </Button>
    </Flex>
  );
};

export default Header;
