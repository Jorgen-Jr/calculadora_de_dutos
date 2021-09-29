import { Button } from "@chakra-ui/button";
import { DownloadIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import React from "react";

import { exportComponentAsJPEG } from "react-component-export-image";

const DownloadButton = ({ componentRef, title, ...props }) => {
  return (
    <Stack direction="row" justifyContent="end" m="0 10px" spacing={4} {...props}>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={() => exportComponentAsJPEG(componentRef, { fileName: title })}
      >
        Baixar
      </Button>
    </Stack>
  );
};

export default DownloadButton;
