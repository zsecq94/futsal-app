import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const ApplyCard = ({ user, onPress }: any) => {
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      px="3"
      style={{
        gap: 10,
        width: "80%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: user.user.thumb }}
        width={30}
        height={30}
        style={{ borderRadius: 30 }}
      />
      <Text fontWeight="700">{user.user.name}</Text>
      <Box flexDirection="row" style={{ gap: 10 }}>
        <TouchableOpacity
          onPress={() => onPress({ state: true, id: user.user.id })}
          style={{
            backgroundColor: theme.colors.green700,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text fontWeight="700" style={{ color: "white" }}>
            수락
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress({ state: false, id: user.user.id })}
          style={{
            backgroundColor: "red",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text fontWeight="700" style={{ color: "white" }}>
            거절
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ApplyCard;
