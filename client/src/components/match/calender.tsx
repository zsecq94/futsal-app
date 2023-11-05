import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HrTag from "../shared/hrtag";
import DatePicker from "./datepicker";
import theme from "@/utils/theme";

const Calendar = ({ setSelectedDate, selectedDate }: any) => {
  const [dates, setDates] = useState<Moment[]>([]);
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 21; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>{selectedDate?.slice(5, 7)}월</Text>
      </View>
      <HrTag />
      <View style={styles.dateSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date, index) => (
            <DatePicker
              key={index}
              date={date}
              onSelectDate={setSelectedDate}
              selected={selectedDate}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.green700,
  },
  dateSection: {
    width: "100%",
    padding: 10,
  },
});
