const mutex = new Mutex();

export const createMatch = async (req: Request, res: Response) => {
  const release = await mutex.acquire();
  const socket = getSocketIo();
  try {
    const { team, place, date, time, level, todayTime, state } = req.body;

    const matchData = await MatchData.findOne({ id: date });

    const fillGapsInTimes = (dates: any) => {
      let filledDates: number[][] = [];
      for (let i = 0; i < dates.length - 1; i += 2) {
        let start = dates[i][0];
        let end = dates[i + 1][1];

        for (let j = start; j < end; j += 0.5) {
          if (state) {
            filledDates.push([j, j + 0.5, true]);
          } else {
            filledDates.push([j, j + 0.5, false]);
          }
        }
      }

      return filledDates;
    };
    const newDateList = fillGapsInTimes(time);

    if (state) {
      const findMatch = await Match.find({ date, place, state: false });
      const start = time[0][0];
      const end = time[1][1];

      const overlaps = findMatch.filter((match) => {
        const matchStart = Math.min(...match.time[0]);
        const matchEnd = Math.max(...match.time[1]);

        return start <= matchEnd && matchStart <= end;
      });

      if (overlaps) {
        for (let match of overlaps) {
          const newTime = fillGapsInTimes(match.time);

          matchData[place].times = matchData[place].times.filter((time) => {
            return !newTime.some((newTimeItem) => newTimeItem[0] === time[0]);
          });
          match.state = true;
          await match.save();
          await matchData.save();
          // 실시간 알림 필요!!
        }
      }
    }

    // 배열 비교 함수
    const arrayEquals = (a: any, b: any) => {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    };

    // time의 원소가 matchData[place].times에 존재하는지 확인
    if (
      matchData &&
      newDateList.some((newTime) =>
        matchData[place].times.some((time: any) => arrayEquals(time, newTime))
      )
    ) {
      release();

      return res.send({
        message: "해당 시간대는 이미 신청되었습니다.",
        state: false,
        type: "error",
      });
    } else {
      await MatchData.findOneAndUpdate(
        { id: date },
        {
          $push: { [`${place}.times`]: { $each: newDateList } },
          $inc: { [`${place}.count`]: 1 },
        },
        { upsert: true, new: true }
      );
      release();
    }

    await Match.create({
      team1: team,
      place,
      level,
      date,
      time,
      state,
    });

    socket.emit("update-match");

    return res.send({ message: "신청 완료", state: true, type: "success" });
  } catch (error) {
    console.log("error in createMatch", error);
    throw error;
  }
};
