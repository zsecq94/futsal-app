import React from "react";
import SafeAreaWrapper from "./safe-area-wrapper";
import { Box } from "@/utils/theme";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <SafeAreaWrapper>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="transparent"
      >
        <ActivityIndicator />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Loader;
