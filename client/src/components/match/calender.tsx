import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import HrTag from '../shared/hrtag'
import DatePicker from './datepicker'
import theme, { Box } from '@/utils/theme'

const Calendar = ({ setSelectedDate, selectedDate }: any) => {
  const [dates, setDates] = useState<Moment[]>([])
  const getDates = () => {
    const _dates = []
    for (let i = 0; i < 21; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }

  useEffect(() => {
    getDates()
  }, [])

  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      m="5"
      p="2"
      style={{
        gap: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text style={styles.title}>{selectedDate?.slice(5, 7)}월</Text>
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
    </Box>
  )
}

export default Calendar

const styles = StyleSheet.create({
  title: {
    padding: 5,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.white,
    backgroundColor: theme.colors.green600,
  },
})
