import HrTag from "@/components/shared/hrtag";
import Filter from "@/components/team/filter";
import Input from "@/components/team/input";
import TeamCard from "@/components/team/team-card";
import { getAllTeam } from "@/services/api";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TeamSearchScreen = () => {
  const data = ["점수순", "인원순", "실력순"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [allTeams, setAllTeams] = useState([]);
  const [focusCheck, setFocusCheck] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
    setSelectedFilter("");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await getAllTeam();
        if (res) {
          setAllTeams(res);
        }
      } catch (error) {
        console.log("error in getAllTeam");
        throw error;
      }
    };
    getTeams();
  }, [refresh]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Box flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mx="5"
          mt="4"
        >
          <Text
            variant="text2Xl"
            fontWeight="700"
            style={{
              color: theme.colors.green700,
            }}
          >
            팀 찾기
          </Text>
        </Box>
        <HrTag />
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
            zIndex: 9,
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
        <ScrollView>
          <Box
            style={{
              alignItems: "center",
              gap: 10,
            }}
          >
            {allTeams?.map((team) => {
              return <TeamCard key={team?._id} team={team} />;
            })}
          </Box>
          <Box height={20} />
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default TeamSearchScreen;
