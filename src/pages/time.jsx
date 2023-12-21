import Header from '../components/header.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/time.scss';

import TimeTable from '../components/timetable.jsx';

export default function Time() {

  const navigate = useNavigate();

  const navigatePrevPage = () => {
    navigate("/attendance");
  }

  const count = localStorage.getItem("count");

  return (
    
    <div>
      <Header title="참가 시간 선택" backNavigate={navigatePrevPage}/>
      <div className='Body'>
        <span className="OptionTextDesc attendPeople">참가 인원 : {count}명</span><br/>
        <div className="timeBar">
          <span className="OptionTextTitle">참가할 시간을 선택해 주세요.</span><br/>
          <span className="OptionTextDesc">학년별 체육관 이동 시간을 고려해 선택해 주세요.</span>
          <TimeTable/>
        </div>
      </div>
    </div>
  )
}