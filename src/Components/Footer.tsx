import React from "react";

import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" background="#FFFC31" color="#1C2826" fontFamily="FiraCode, sans, serif" mt="90px">
      <Flex
        fontWeight="bolder"
        justifyContent={["left", "space-around"]}
        alignItems={["center"]}
        padding={["10px", "0"]}
        height={["auto", "60px"]}
        textTransform="uppercase"
        flexDirection={["column", "row"]}
      >
        <Flex alignItems="center" p={["10px", "0"]}>
          <Link
            href="https://github.com/Jorgen-Jr/calculadora_de_dutos"
            alt="Link para perfil do github - 'Feito com amor por Jorge.'"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <Box className="github-link">
              <Text as="span" style={{ width: "15px" }}>
                {" "}
              </Text>{" "}
              <Text as="span">
                Made with{" "}
                <Text as="span" role="img" aria-label="heart emoji" color="red">
                  ❤️
                </Text>{" "}
                by Jorge © {new Date().getFullYear()}
              </Text>
            </Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
