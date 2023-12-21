import Button from '../components/button.jsx';
import '../styles/pages/main.scss';
import { useNavigate } from 'react-router-dom';
import titleSvg from '../svgs/title.svg';

export default function Main() {
  const navigate = useNavigate();

  const navigateNextPage = () => {
    navigate("/attendance");
  };

  return (
    <div className="MainPage">
        <div className="mainLogoImage">
          <img src={titleSvg} alt="title" className="mainLogoImage__svg"/>
        </div>
        <span className='mainSubtitle'>2학년 3반 : 푸어링 아트 부스</span><br/>
        <Button className="mainButton" text="예약 시작하기" icon="EventSeatOutlinedIcon" onClick={navigateNextPage}/>
    </div>
  );
}