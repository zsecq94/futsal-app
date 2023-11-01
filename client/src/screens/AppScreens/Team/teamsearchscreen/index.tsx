import HrTag from "@/components/shared/hrtag";
import Filter from "@/components/team/filter";
import Input from "@/components/team/input";
import TeamCard from "@/components/team/team-card";
import { Socketcontext } from "@/context/SocketContext";
import { getAllTeam } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TeamSearchScreen = () => {
  const socket = useContext(Socketcontext);
  const { user, updateUser } = useUserGlobalStore();
  const data = ["점수순", "인원순", "실력순"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [allTeams, setAllTeams] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [focusCheck, setFocusCheck] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  socket.on(`${user?.id}-update`, (userData) => {
    updateUser(userData);
  });

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.blur();

      setFocusCheck(false);
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

  useEffect(() => {
    let sortedTeams = [...allTeams];
    if (selectedFilter === "점수순") {
      sortedTeams.sort((a: any, b: any) => b.score - a.score);
    } else if (selectedFilter === "인원순") {
      sortedTeams.sort((a: any, b: any) => b.count - a.count);
    } else if (selectedFilter === "실력순") {
      const skillOrder = ["하", "중하", "중", "중상", "상"];
      sortedTeams.sort(
        (a: any, b: any) =>
          skillOrder.indexOf(b.level) - skillOrder.indexOf(a.level)
      );
    } else {
      sortedTeams = defaultData;
    }
    setAllTeams(sortedTeams);
  }, [selectedFilter]);

  const goCreateTeam = () => {
    navigation.navigate("TeamCreate");
  };

  const resetSelectedFilter = () => {
    setFocusCheck(true);
    setSelectedFilter("");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setSelectedFilter("");
    setSearchTeam("");
    const getTeams = async () => {
      try {
        const res = await getAllTeam();
        if (res) {
          setDefaultData(res);
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
            {allTeams
              ?.filter((team: any) => team.name.includes(searchTeam))
              .map((team) => {
                return <TeamCard key={team?._id} team={team} />;
              })}
          </Box>
          <Box height={80} />
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default TeamSearchScreen;
