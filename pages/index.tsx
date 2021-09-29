/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/Components/Layout";
import PrintContainer from "../src/Components/PrintContainer";

const Home: NextPage = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [ducts_quantity, setDuctsQuantity] = useState(0);
  const [volume, setVolume] = useState(0);
  const [frequency, setFrequency] = useState(0);

  function dutoRetantular(width: number, height: number, pol: number): number {
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

  function fsDutoRedonto(
    volume: number,
    frequency: number,
    diameter: number,
    ducts_quantity: number
  ): { area: number; lv: number } {
    const area = Math.PI * (((diameter * ducts_quantity * 2.54) / 2) * ((diameter * 2.52) / 2));

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
    <Layout>
      {/* Might as well be a component. */}
      <Flex flexDir="column">
        <PrintContainer pb="50px" title="Dutos Retangulares">
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
              <StatNumber>{dutoRetantular(width, height, 20)}</StatNumber>
              {/* <StatHelpText>Quantidade</StatHelpText> */}
            </Stat>

            <Stat>
              <StatLabel>Duto de 3{'"'}</StatLabel>
              <StatNumber>{dutoRetantular(width, height, 45)}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Duto de 4{'"'}</StatLabel>
              <StatNumber>{dutoRetantular(width, height, 81)}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Área do Duto</StatLabel>
              <StatNumber>{height * width}cm²</StatNumber>
            </Stat>
          </StatGroup>
        </PrintContainer>

        <PrintContainer pb="50px" title="Duto Redondo Para Régua">
          <Heading p="0 10px">Duto Redondo Para Régua</Heading>
          <form action="">
            <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
              <InputGroup p="0 10px">
                <InputLeftAddon children="Diâmetro Real" />
                <Input
                  placeholder="Diâmetro Real em polegadas"
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
              <InputGroup m={"0 10px"}>
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
              <StatLabel>Área do Duto</StatLabel>
              <StatNumber>{dutoRedondoParaRegua(height, diameter, ducts_quantity).area}cm²</StatNumber>
              {/* <StatHelpText>Quantidade</StatHelpText> */}
            </Stat>

            <Stat>
              <StatLabel>Largura do Duto</StatLabel>
              <StatNumber>{dutoRedondoParaRegua(height, diameter, ducts_quantity).width}cm²</StatNumber>
            </Stat>
          </StatGroup>
        </PrintContainer>

        <PrintContainer pb="50px" title="FS Duto Redondo">
          <Heading p="0 10px">FS Duto Redondo</Heading>
          <form action="">
            <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
              <InputGroup p="0 10px">
                <InputLeftAddon children="Volume desejado" />
                <Input
                  placeholder="Volume desejado em litros"
                  value={volume}
                  onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                />
              </InputGroup>

              <InputGroup p={["5px 10px", "0 10px"]}>
                <InputLeftAddon children="Frequência de Ressonância" />
                <Input
                  placeholder="Frequência de Ressonância"
                  value={frequency}
                  onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
            </Flex>

            <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
              <InputGroup m={"0 10px"}>
                <InputLeftAddon children="Diâmetro do duto" />
                <Input
                  placeholder="Diametro"
                  value={diameter}
                  onChange={(event) => setDiameter(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
              <InputGroup m={"0 10px"}>
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
              <StatNumber>{fsDutoRedonto(volume, frequency, diameter, ducts_quantity).lv}cm</StatNumber>
              <StatHelpText>Profundidade do Duto</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Área do Duto</StatLabel>
              <StatNumber>{fsDutoRedonto(volume, frequency, diameter, ducts_quantity).area}cm²</StatNumber>
            </Stat>
          </StatGroup>
        </PrintContainer>

        <PrintContainer pb="50px" title="FS Duto Régua">
          <Heading p="0 10px">FS Duto Régua</Heading>
          <form action="">
            <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
              <InputGroup p="0 10px">
                <InputLeftAddon children="Volume desejado" />
                <Input
                  placeholder="Volume desejado em litros"
                  value={volume}
                  onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                />
              </InputGroup>

              <InputGroup p={["5px 10px", "0 10px"]}>
                <InputLeftAddon children="Frequência de Ressonância" />
                <Input
                  placeholder="Frequência de Ressonância"
                  value={frequency}
                  onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
            </Flex>

            <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
              <InputGroup m={"0 10px"}>
                <InputLeftAddon children="Altura" />
                <Input
                  placeholder="Altura"
                  value={height}
                  onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
              <InputGroup m={"0 10px"}>
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
              <StatLabel>Área do Duto</StatLabel>
              <StatNumber>{fsDutoRegua(volume, frequency, height, width).area}cm²</StatNumber>
            </Stat>
          </StatGroup>
        </PrintContainer>

        <PrintContainer pb="50px" title="FS Duto Triangular">
          <Heading p="0 10px">FS Duto Triangular</Heading>
          <form action="">
            <Flex justifyContent="space-evenly" flexDir={["column", "row"]}>
              <InputGroup p="0 10px">
                <InputLeftAddon children="Volume desejado" />
                <Input
                  placeholder="Volume desejado em litros"
                  value={volume}
                  onChange={(event) => setVolume(parseInt(event.target.value) || 0)}
                />
              </InputGroup>

              <InputGroup p={["5px 10px", "0 10px"]}>
                <InputLeftAddon children="Frequência de Ressonância" />
                <Input
                  placeholder="Frequência de Ressonância"
                  value={frequency}
                  onChange={(event) => setFrequency(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
            </Flex>

            <Flex justifyContent="space-evenly" mt={["0", "10px"]} flexDir={["column", "row"]}>
              <InputGroup m={"0 10px"}>
                <InputLeftAddon children="Comprimento Lado" />
                <Input
                  placeholder="Comprimento lado"
                  value={height}
                  onChange={(event) => setHeight(parseInt(event.target.value) || 0)}
                />
              </InputGroup>
              <InputGroup m={"0 10px"}>
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
              <StatLabel>Área do Duto</StatLabel>
              <StatNumber>{fsDutoTriangulo(volume, frequency, height, ducts_quantity).area}cm²</StatNumber>
            </Stat>
          </StatGroup>
        </PrintContainer>
      </Flex>
    </Layout>
  );
};

export default Home;
