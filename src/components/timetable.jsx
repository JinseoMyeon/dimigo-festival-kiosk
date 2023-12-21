import '../styles/pages/time.scss';
import { useNavigate } from 'react-router-dom';

import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import SmallButton from './smallbutton';

let fetchData = {
  times: [{
    time : "00:00",
    max_people : 0,
    now_people : 0,
  },]
};

try {
  fetchData = await fetch(`http://121.124.49.48:6003/api/available-time`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json().then((data) => {
    return data;
  }));
} catch (e) {
  console.log(e);
}

const times = fetchData.times || [];
const lenTimes = times.length || 0;

function CheckAvailable(max, now) {
  let count = localStorage.getItem("count");
  if (max-now >= Number(count)) 
    return (
      <div className="timeAvailable">
        <PeopleOutlineRoundedIcon className="timeAvailableIcon"/>
        <span className="timeAvailableText">참가 가능 ({max-now}명)</span>
      </div>
    );
  else 
    return (
      <div className="timeDisable">
        <PeopleOutlineRoundedIcon className="timeDisableIcon"/>
        <span className="timeDisableText">참가 불가 ({max-now}명)</span>
      </div>
    )
}

function CheckAvailableButton(max, now, i) {
  let count = localStorage.getItem("count");
  let navigate = useNavigate();
  if (max-now >= Number(count)) 
    return (
      <SmallButton className="smallButtonSelect" text="선택하기" icon="AlarmRoundedIcon" onClick={async () => {
        let newFetchdata = {
          times: [{
            time : "00:00",
            max_people : 0,
            now_people : 0,
          },]
        };
        
        try {
          newFetchdata = await fetch(`http://121.124.49.48:6003/api/available-time`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
            }).then((response) => response.json().then((data) => {
              return data;
            }));
        }
        catch (e) {
        console.log(e);
        }

        if (newFetchdata.times[i].max_people-newFetchdata.times[i].now_people < Number(count)) {
          alert("이미 인원이 초과된 시간입니다.");
          return;
        }
        
        localStorage.setItem("reservation_time", times[i].time);
        navigate("/order");
      }} />
    );
  else 
    return (
      <SmallButton className="smallButtonDisable" text="선택 불가" icon="AlarmRoundedIcon" />
    )
}

export default function TimeTable() {
  const navigate = useNavigate();
  return (
    <div className="overflowScroll">
      {Array(lenTimes).fill().map((_, i) => {
        return (
          <div className="timeBox">
            <span className="timeBox__time">{times[i].time}</span>
            <div className="timeBox__available">
              {CheckAvailable(times[i].max_people, times[i].now_people)}
            </div>
              {CheckAvailableButton(times[i].max_people, times[i].now_people, i)}
          </div>
        )
      })}
      <div className="underMargin"></div>
    </div>
  );
}
