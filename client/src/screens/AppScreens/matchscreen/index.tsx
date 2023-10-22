import Button from "@/components/shared/button";
import DatePicker from "@/components/shared/datepicker";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

const MatchScreen = () => {
  const [checkDataPicker, setCheckDataPicker] = useState(false);
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0]
  );

  const navigate = useNavigation();

  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    console.log("change");
  }, [selected]);

  return (
    <Box>
      {checkDataPicker && (
        <DatePicker
          setCheckDataPicker={setCheckDataPicker}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <Box
        mt="5"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        style={{ gap: 20 }}
      >
        <Box
          p="2"
          style={{
            backgroundColor: theme.colors.white,
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
          <Pressable
            onPress={() => {
              setCheckDataPicker(!checkDataPicker);
            }}
          >
            <Text variant="text2Xl" fontWeight="700">
              {selected}
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchScreen;
