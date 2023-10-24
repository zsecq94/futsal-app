import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/locale/ko";
import theme from "@/utils/theme";

const DatePicker = ({ date, onSelectDate, selected }: any) => {
  moment.locale("ko");

  const formattedDate = moment(date).format("YYYY-MM-DD");

  const isToday = moment().isSame(date, "day");
  const dayOfWeek = moment(date).format("dddd"); // 요일 이름 가져오기

  let textColor = "black"; // 기본 텍스트 색상

  if (dayOfWeek === "토요일") {
    textColor = theme.colors.blue600; // 토요일일 경우 파란색
  } else if (dayOfWeek === "일요일") {
    textColor = theme.colors.rose500;
  }

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(formattedDate)}
      style={[
        styles.card,
        selected === formattedDate && {
          backgroundColor: theme.colors.green700,
        },
      ]}
    >
      <Text
        style={[
          styles.big,
          {
            color: textColor, // 요일에 따라 텍스트 색상 설정
          },
          selected === formattedDate && { color: "#fff" },
        ]}
      >
        {isToday ? "오늘" : moment(date).format("ddd")}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === formattedDate && {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 24,
          },
        ]}
      >
        {moment(date).format("D")}
      </Text>
    </TouchableOpacity>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  card: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    shadowRadius: 2,
    backgroundColor: "#eee",
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 10,
    alignItems: "center",
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: "bold",
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
  },
});
