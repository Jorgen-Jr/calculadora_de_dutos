import { Box } from "@chakra-ui/layout";
import React, { useRef } from "react";

import dynamic from "next/dynamic";

const DownloadButton = dynamic(
  () => {
    return import("./DownloadButton");
  },
  {
    ssr: false,
  }
);

const PrintContainer = ({ children, title, ...props }) => {
  const componentRef = useRef();

  return (
    <Box {...props}>
      <Box ref={componentRef} pb="10px" pt="10px" pr={["15px", "0"]}>
        {children}
      </Box>

      <DownloadButton componentRef={componentRef} title={title} />
    </Box>
  );
};

export default PrintContainer;
