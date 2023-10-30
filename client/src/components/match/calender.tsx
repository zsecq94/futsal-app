import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HrTag from "../shared/hrtag";
import DatePicker from "./datepicker";

const Calendar = ({ onSelectDate, selected }: any) => {
  const [dates, setDates] = useState<Moment[]>([]);
  // get the dates from today to 10 days from now, format them as strings and store them in state
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
        <Text style={styles.title}>{selected?.slice(5, 7)}월</Text>
      </View>
      <HrTag />
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date, index) => (
              <DatePicker
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  dateSection: {
    width: "100%",
    padding: 10,
  },
  scroll: {
    height: 90,
  },
});
