import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import Filter from "@/components/team/filter";
import Input from "@/components/team/input";
import TeamCard from "@/components/team/team-card";
import { SocketContext } from "@/context/SocketContext";
import { getAllTeam } from "@/services/api";
import { fetcher } from "@/services/config";
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
import useSWR from "swr";

const TeamScreen = () => {
  const socket = useContext(SocketContext);
  const { user, updateUser } = useUserGlobalStore();
  const data = ["점수순", "인원순", "실력순"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [focusCheck, setFocusCheck] = useState(false);
  const [defaultData, setDefaultData] = useState([]);
  const navigation = useNavigation<any>();
  const inputRef = useRef<TextInput>(null);
  const [sortedTeams, setSortedTeams] = useState([]);

  const {
    data: allTeams,
    isLoading,
    mutate: allTeamsMutate,
  } = useSWR("teams/get-all-team", fetcher);
  useEffect(() => {
    if (socket) {
      socket.on(`${user?.id}-update`, (userData: IAuthUser) => {
        updateUser(userData);
      });

      socket.on("team-list-update", async () => {
        await allTeamsMutate();
      });
    }
    return () => {
      if (socket) {
        socket.off(`${user?.id}-update`);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (allTeams) {
      let teams: any = [...allTeams];
      if (selectedFilter === "점수순") {
        teams.sort((a: any, b: any) => b.score - a.score);
      } else if (selectedFilter === "인원순") {
        teams.sort((a: any, b: any) => b.count - a.count);
      } else if (selectedFilter === "실력순") {
        const skillOrder = ["하", "중하", "중", "중상", "상"];
        teams.sort(
          (a: any, b: any) =>
            skillOrder.indexOf(b.level) - skillOrder.indexOf(a.level)
        );
      } else {
        teams = allTeams;
      }
      setSortedTeams(teams);
    }
  }, [selectedFilter, allTeams]);

  const goNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

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

  const resetSelectedFilter = () => {
    setFocusCheck(true);
    setSelectedFilter("");
  };

  if (isLoading) {
    return <Loader />;
  }

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
          <TouchableOpacity
            disabled={user?.team === null}
            onPress={() => goNavigation("TeamInfo")}
          >
            <Text
              variant="textBase"
              fontWeight="700"
              p="1"
              style={{
                borderRadius: 10,
                backgroundColor:
                  user?.team === null
                    ? theme.colors.gray200
                    : theme.colors.green700,
                color: "white",
              }}
            >
              내 팀보기
            </Text>
          </TouchableOpacity>
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
        {user?.team === null && (
          <TouchableOpacity
            onPress={() => goNavigation("TeamCreate")}
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
        )}

        <ScrollView>
          <Box
            style={{
              alignItems: "center",
              gap: 10,
            }}
          >
            {sortedTeams
              ?.filter((team: any) => team.name.includes(searchTeam))
              .map((team: any) => {
                return <TeamCard key={team?._id} team={team} />;
              })}
          </Box>
          <Box height={80} />
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default TeamScreen;
