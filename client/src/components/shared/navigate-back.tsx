import { Box, Theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable } from "react-native";

const NavigateBack = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={navigateBack}>
      <Box
        bg="gray100"
        p="2"
        borderRadius="rounded-7xl"
        style={{
          backgroundColor: theme.colors.green700,
        }}
      >
        <Ionicons name="chevron-back" size={20} color="white" />
      </Box>
    </Pressable>
  );
};

export default NavigateBack;
