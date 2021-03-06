/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/Components/Layout";
import PrintContainer from "../src/Components/PrintContainer";
import Head from "next/head";

const Home: NextPage = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [ducts_quantity, setDuctsQuantity] = useState(0);
  const [volume, setVolume] = useState(0);
  const [frequency, setFrequency] = useState(0);

  function dutoRetangular(width: number, height: number, pol: number): number {
    const result = (width * height) / pol;

    return Math.round(result);
  }

  function dutoRedondoParaRegua(
    height: number,
    diameter: number,
    ducts_quantity: number
  ): { area: number; width: number } {
    const area = ducts_quantity * (Math.PI * (((diameter * 2.54) / 2) * ((diameter * 2.54) / 2)));

    const width = area / height;

    return { area: parseFloat(area.toFixed(2)), width: parseFloat(width.toFixed(2)) || 0 };
  }

  function fsDutoRedondo(
    volume: number,
    frequency: number,
    diameter: number,
    ducts_quantity: number
  ): { area: number; lv: number } {
    const area = Math.PI * (((diameter * ducts_quantity * 2.54) / 2) * ((diameter * 2.54) / 2));

    const lva = lv(area, volume, frequency);

    return { area: parseFloat(area.toFixed(2)), lv: parseFloat(lva.toFixed(2)) || 0 };
  }

  function fsDutoRegua(volume: number, frequency: number, height: number, width: number): { area: number; lv: number } {
    const area = height * width;

    const lva = lv(area, volume, frequency);

    return { area: parseFloat(area.toFixed(2)), lv: parseFloat(lva.toFixed(2)) || 0 };
  }

  function fsDutoTriangulo(
    volume: number,
    frequency: number,
    height: number,
    ducts_quantity: number
  ): { area: number; lv: number } {
    const area = ((height * height) / 2) * ducts_quantity;

    const lva = lv(area, volume, frequency);

    return { area: parseFloat(area.toFixed(2)), lv: parseFloat(lva.toFixed(2)) || 0 };
  }

  function lv(area: number, volume: number, frequency: number): number {
    const result =
      ((29000 + (volume - 45) * 30) * ((area / (Math.sqrt(area) - 1)) * (area / (Math.sqrt(area) - 1)))) /
        (volume * (frequency * frequency)) -
      0.74 * (area / (Math.sqrt(area) - 1));

    return result;
  }

  return (
    <>
      <Head>
        <title>Calculadora de Duto</title>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <meta data-react-helmet="true" name="twitter:card" content="summary"></meta>
        <meta
          data-react-helmet="true"
          name="twitter:description"
          content="Uma calculadora de formatos de dutos e calcular frequencia de resson??ncia."
        ></meta>
        <meta data-react-helmet="true" name="twitter:creator" content="Jorge Ant??nio Junior"></meta>
        <meta data-react-helmet="true" property="og:title" content="Conversor de Duto"></meta>
        <meta
          data-react-helmet="true"
          property="og:description"
          content="Uma calculadora de formatos de dutos e calcular frequencia de resson??ncia."
        />
        <meta data-react-helmet="true" property="og:type" content="article"></meta>
      </Head>
      <Layout>
        {/* Might as well be a component. */}
        <Flex flexDir="column">
          <PrintContainer pb={["5px", "50px"]} title="Dutos Retangulares">
            <Heading p="0 10px">Dutos Retangulares</Heading>
            <form action="">
              <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
                <InputGroup p={["5px 10px", "0 10px"]}>
                  <InputLeftAddon children="Altura" />
                  <Input
                    placeholder="Altura"
                    value={height}
                    onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
                <InputGroup p="0 10px">
                  <InputLeftAddon children="Largura" />
                  <Input
                    placeholder="Largura"
                    value={width}
                    onChange={(event) => setWidth(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>
            </form>

            <StatGroup
              m="5px 10px"
              p="15px 15px"
              border="1px solid #427AA1"
              borderRadius="15px"
              flexDir={["column", "row"]}
            >
              <Stat>
                <StatLabel>Duto de 2{'"'}</StatLabel>
                <StatNumber>
                  {dutoRetangular(width, height, 20)}
                  <Text as="span" fontSize="large">
                    un
                  </Text>
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Duto de 3{'"'}</StatLabel>
                <StatNumber>
                  {dutoRetangular(width, height, 45)}
                  <Text as="span" fontSize="large">
                    un
                  </Text>
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Duto de 4{'"'}</StatLabel>
                <StatNumber>
                  {dutoRetangular(width, height, 81)}
                  <Text as="span" fontSize="large">
                    un
                  </Text>
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel>??rea do Duto</StatLabel>
                <StatNumber>{height * width}cm??</StatNumber>
              </Stat>
            </StatGroup>
          </PrintContainer>

          <PrintContainer pb={["5px", "50px"]} title="Duto Redondo Para R??gua">
            <Heading p="0 10px">Duto Redondo Para R??gua</Heading>
            <form action="">
              <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
                <InputGroup p="0 10px">
                  <InputLeftAddon children="Di??metro Real (pol)" />
                  <Input
                    placeholder="Di??metro Real em polegadas"
                    value={diameter}
                    onChange={(event) => setDiameter(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>

                <InputGroup p={["5px 10px", "0 10px"]}>
                  <InputLeftAddon children="Quantidade de Dutos" />
                  <Input
                    placeholder="Quantidade de Dutos"
                    value={ducts_quantity}
                    onChange={(event) => setDuctsQuantity(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>

              <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Altura" />
                  <Input
                    placeholder="Altura"
                    value={height}
                    onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>
            </form>

            <StatGroup
              m="5px 10px"
              p="15px 15px"
              border="1px solid #427AA1"
              borderRadius="15px"
              flexDir={["column", "row"]}
            >
              <Stat>
                <StatLabel>Largura do Duto</StatLabel>
                <StatNumber>{dutoRedondoParaRegua(height, diameter, ducts_quantity).width}cm</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>??rea do Duto</StatLabel>
                <StatNumber>{dutoRedondoParaRegua(height, diameter, ducts_quantity).area}cm??</StatNumber>
                {/* <StatHelpText>Quantidade</StatHelpText> */}
              </Stat>
            </StatGroup>
          </PrintContainer>

          <PrintContainer pb={["5px", "50px"]} title="FS Duto Redondo">
            <Heading p="0 10px">FS Duto Redondo</Heading>
            <form action="">
              <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
                <InputGroup p="0 10px">
                  <InputLeftAddon children="Volume desejado (L??tros)" />
                  <Input
                    placeholder="Volume desejado em litros"
                    value={volume}
                    onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>

                <InputGroup p={["5px 10px", "0 10px"]}>
                  <InputLeftAddon children="Frequ??ncia de Resson??ncia" />
                  <Input
                    placeholder="Frequ??ncia de Resson??ncia"
                    value={frequency}
                    onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>

              <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Di??metro do Duto (pol)" />
                  <Input
                    placeholder="Di??metro"
                    value={diameter}
                    onChange={(event) => setDiameter(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Quantidade" />
                  <Input
                    placeholder="Quantidade de Dutos"
                    value={ducts_quantity}
                    onChange={(event) => setDuctsQuantity(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>
            </form>

            <StatGroup
              m="5px 10px"
              p="15px 15px"
              border="1px solid #427AA1"
              borderRadius="15px"
              flexDir={["column", "row"]}
            >
              <Stat>
                <StatLabel>LV</StatLabel>
                <StatNumber>{fsDutoRedondo(volume, frequency, diameter, ducts_quantity).lv}cm</StatNumber>
                <StatHelpText>Profundidade do Duto</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>??rea do Duto</StatLabel>
                <StatNumber>{fsDutoRedondo(volume, frequency, diameter, ducts_quantity).area}cm??</StatNumber>
              </Stat>
            </StatGroup>
          </PrintContainer>

          <PrintContainer pb={["5px", "50px"]} title="FS Duto R??gua">
            <Heading p="0 10px">FS Duto R??gua</Heading>
            <form action="">
              <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
                <InputGroup p="0 10px">
                  <InputLeftAddon children="Volume desejado (L??tros)" />
                  <Input
                    placeholder="Volume desejado em litros"
                    value={volume}
                    onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>

                <InputGroup p={["5px 10px", "0 10px"]}>
                  <InputLeftAddon children="Frequ??ncia de Resson??ncia" />
                  <Input
                    placeholder="Frequ??ncia de Resson??ncia"
                    value={frequency}
                    onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>

              <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Altura" />
                  <Input
                    placeholder="Altura"
                    value={height}
                    onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Largura" />
                  <Input
                    placeholder="Largura"
                    value={width}
                    onChange={(event) => setWidth(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>
            </form>

            <StatGroup
              m="5px 10px"
              p="15px 15px"
              border="1px solid #427AA1"
              borderRadius="15px"
              flexDir={["column", "row"]}
            >
              <Stat>
                <StatLabel>LV</StatLabel>
                <StatNumber>{fsDutoRegua(volume, frequency, height, width).lv}cm</StatNumber>
                <StatHelpText>Profundidade do Duto</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>??rea do Duto</StatLabel>
                <StatNumber>{fsDutoRegua(volume, frequency, height, width).area}cm??</StatNumber>
              </Stat>
            </StatGroup>
          </PrintContainer>

          <PrintContainer pb={["5px", "50px"]} title="FS Duto Triangular">
            <Heading p="0 10px">FS Duto Triangular</Heading>
            <form action="">
              <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
                <InputGroup p="0 10px">
                  <InputLeftAddon children="Volume desejado (L??tros)" />
                  <Input
                    placeholder="Volume desejado em litros"
                    value={volume}
                    onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>

                <InputGroup p={["5px 10px", "0 10px"]}>
                  <InputLeftAddon children="Frequ??ncia de Resson??ncia" />
                  <Input
                    placeholder="Frequ??ncia de Resson??ncia"
                    value={frequency}
                    onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>

              <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Comprimento Lado" />
                  <Input
                    placeholder="Comprimento lado"
                    value={height}
                    onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
                <InputGroup p={"0 10px"}>
                  <InputLeftAddon children="Quantidade de Dutos" />
                  <Input
                    placeholder="Quantidade de Dutos"
                    value={ducts_quantity}
                    onChange={(event) => setDuctsQuantity(parseInt(event.target.value) || 0)}
                  />
                </InputGroup>
              </Flex>
            </form>

            <StatGroup
              m="5px 10px"
              p="15px 15px"
              border="1px solid #427AA1"
              borderRadius="15px"
              flexDir={["column", "row"]}
            >
              <Stat>
                <StatLabel>LV</StatLabel>
                <StatNumber>{fsDutoTriangulo(volume, frequency, height, ducts_quantity).lv}cm</StatNumber>
                <StatHelpText>Profundidade do Duto</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>??rea do Duto</StatLabel>
                <StatNumber>{fsDutoTriangulo(volume, frequency, height, ducts_quantity).area}cm??</StatNumber>
              </Stat>
            </StatGroup>
          </PrintContainer>
        </Flex>
      </Layout>
    </>
  );
};

export default Home;
