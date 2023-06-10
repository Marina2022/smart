import s from './Clock.module.scss'
import { useSelector} from "react-redux";
import {selectRound} from "../../../../../store/reducers/dataReducer";
import {useEffect, useState} from "react";

const getTimeString = (time) => {
  if (String(time).length === 1) return '0' + time;
  return time;
}

const Clock = () => {
  const round = useSelector(selectRound);
  const [secondsLeft, setSecondsLeft] = useState(round.timeLeft)

  let timer
  useEffect(() => {
    timer = null
    if (round.status !== 2) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1 ) window.location.reload()
          return prev - 1;
        });
      }, 1000);
      return () => {
        timer = null;
      }
    }
  }, [round])

  const days = getTimeString(Math.trunc(secondsLeft / 86400));
  const hours = getTimeString(Math.trunc((secondsLeft - days * 86400) / 3600));
  const minutes = getTimeString(Math.trunc((secondsLeft - days * 86400 - hours * 3600) / 60));
  const seconds = getTimeString(secondsLeft - days * 86400 - hours * 3600 - minutes * 60);

  let message;
  let showClock;
  switch (round.status) {
    case 0:
      message = 'QF starts in'
      showClock = true;
      break
    case 1:
      message = 'QF ends in'
      showClock = true;
      break
    case 2:
      message = 'QF finished'
      showClock = false
  }

  return (
    <div className={s.expertsTime}>
      <span>{message}</span>
      {showClock && <div className={s.expertsTimeMinutes}>
        <span className={s.timeBit}>{days}</span>:<span className={s.timeBit}>{hours}</span>:<span
        className={s.timeBit}>{minutes}</span>:<span className={s.timeBit}>{seconds}</span>
      </div>}
    </div>
  );
};

export default Clock;
