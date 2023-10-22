// import useScrollCheckGlobalStore from "@/store/useScrollGlobalStore";
import Button from "@/components/shared/button";
import { HomeStackParamList } from "@/navigation/types";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = () => {
  const navigate = useNavigation<HomeStackParamList>();
  const { updateUser } = useUserGlobalStore();
  return (
    <Box
      flexDirection="row"
      height={60}
      px="7"
      justifyContent="space-between"
      alignItems="center"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <Pressable
        onPress={() => {
          navigate.navigate("Home");
        }}
      >
        <Text
          variant="textXl"
          fontWeight="700"
          style={{
            color: theme.colors.green700,
          }}
        >
          빛가람 풋살장
        </Text>
      </Pressable>
      {/* <Pressable
        onPress={() => {
          updateUser(null);
        }}
      >
        <Button label="logout" />
      </Pressable> */}
      <Icon name="person-outline" size={25} />
    </Box>
  );
};

export default Header;
