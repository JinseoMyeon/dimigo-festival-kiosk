import Header from '../components/header.jsx';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/attendance.scss';
import InputBar from '../components/inputbar.jsx';
import NumberBar from '../components/numberbar.jsx';
import Button from '../components/button.jsx';

export default function Attendance() {

  localStorage.setItem("name", "");
  localStorage.setItem("phone", "");
  localStorage.setItem("count", 1);
  localStorage.setItem("reservation_time", "");
  localStorage.setItem("bighead", "");
  localStorage.setItem("medium", "");
  localStorage.setItem("big", "");
  localStorage.setItem("apchima", "");
  localStorage.setItem("money", 0);

  const navigate = useNavigate();

  const navigatePrevPage = () => {
    navigate("/");
  };
  
  
  const navigateNextPage = () => {
    const regex = /010\d{8}\b/;

    if (document.getElementById("StudentName").value === "") {
      alert("학번과 이름을 입력해 주세요.");
      return;
    }

    else if (document.getElementById("PhoneNumber").value === "") {
      alert("전화번호를 입력해 주세요.");
      return;
    }

    else if (!regex.test(document.getElementById("PhoneNumber").value)) {  
      alert("전화번호를 형식에 맞게 입력해 주세요.");
      return;
    }
    
    else {
      localStorage.setItem("name", document.getElementById("StudentName").value);
      localStorage.setItem("phone", document.getElementById("PhoneNumber").value);
      localStorage.setItem("count", document.getElementById("AttendanceNumber").innerText);
      window.location.replace("/time");
    } 
  };

  return (
    <div>
      <Header title="참가 인원 입력" backNavigate={navigatePrevPage}/>
      <div className='Body'>
        <div className="topInputBar">
          <span className="OptionTextTitle">학번 · 이름</span><br/>
          <span className="OptionTextDesc">여러 명을 한 번에 신청할 경우 결제자 이름을 입력해 주세요.</span>
          <InputBar id="StudentName" placeholder="학번과 이름을 입력해 주세요."/>
        </div>
        <div className="InputBar">
          <span className="OptionTextTitle">전화번호</span><br/>
          <span className="OptionTextDesc">'01012345678'의 형식으로 입력해 주세요. (- 없이)</span><br/>
          <InputBar inputMode="numeric" id="PhoneNumber" placeholder="전화번호를 입력해 주세요."/>
        </div>
        <div className="InputBar">
          <span className="OptionTextTitle">참가 인원</span><br/>
          <NumberBar id="AttendanceNumber"/>
        </div>
        <div className="attendanceNextPage">
          <Button text="예약 시간 선택" icon="AlarmRoundedIcon" onClick={navigateNextPage}/>
        </div>
      </div>
    </div>
  );
}