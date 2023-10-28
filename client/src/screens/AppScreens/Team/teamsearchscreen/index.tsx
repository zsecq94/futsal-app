import HrTag from "@/components/shared/hrtag";
import Filter from "@/components/team/filter";
import Input from "@/components/team/input";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TeamSearchScreen = () => {
  const data = ["점수순", "인원순", "실력순"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [focusCheck, setFocusCheck] = useState(false);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const filterOnpress = (name: any) => {
    setSearchTeam("");
    if (name === selectedFilter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(name);
    }
  };

  const goCreateTeam = () => {
    navigation.navigate("TeamCreate");
  };

  const resetSelectedFilter = () => {
    setFocusCheck(true);
    setSelectedFilter("");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Box flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            flexDirection="row"
            p="2"
            ml="3"
            style={{
              gap: 10,
            }}
          >
            {data.map((name, index) => {
              return (
                <Filter
                  key={index}
                  name={name}
                  onPress={filterOnpress}
                  selectedFilter={selectedFilter}
                />
              );
            })}
          </Box>
          <Input
            focusCheck={focusCheck}
            setSearchTeam={setSearchTeam}
            resetSelectedFilter={resetSelectedFilter}
            inputRef={inputRef}
            searchTeam={searchTeam}
          />
        </Box>
        <HrTag />
        <TouchableOpacity
          onPress={goCreateTeam}
          style={{
            position: "absolute",
            right: 15,
            bottom: 15,
            backgroundColor: theme.colors.green700,
            borderRadius: 25, // this will make it round
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="add-sharp" size={30} color={"white"} />
        </TouchableOpacity>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default TeamSearchScreen;
