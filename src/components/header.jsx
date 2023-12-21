import '../styles/components/header.scss';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export default function Header(props) {
  const backText = props.backText || "이전 화면으로";
  const title = props.title || "제목 없음";
  const backNavigate = props.backNavigate || (() => {});
  const rightText = props.rightText || "";
  const rightNavigate = props.rightNavigate || (() => {});

  return (
    <div className="headerBar">
      <div className="goBack" onClick={backNavigate}>
        <ChevronLeftRoundedIcon className='goBack headerBackIcon'/>
        <span className="goBack headerBackText">{backText}</span>
      </div>
      <span className="title_text">{title}</span>
      <span className="goBack2" onClick={rightNavigate}>{rightText}</span>
    </div>
  );
}