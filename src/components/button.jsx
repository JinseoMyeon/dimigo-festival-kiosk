import '../styles/components/button.scss';

import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

export default function Button(props) {
  const text = props.text || "클릭하기";
  const onClick = props.onClick || (() => {});
  const icon = props.icon || "";
  const className = props.className || "";
  
  const returnIcon = (icon) => {
    switch (icon) {
        case "EventSeatOutlinedIcon":
            return <EventSeatOutlinedIcon className={`buttonIcon`} htmlColor="#FFFFFF"/>;
        case "AlarmRoundedIcon":
            return <AlarmRoundedIcon className={`buttonIcon`} htmlColor="#FFFFFF"/>;
        case "CreditScoreRoundedIcon":
            return <CreditScoreRoundedIcon className={`buttonIcon`} htmlColor="#FFFFFF"/>;
        case "RestartAltRoundedIcon":
            return <RestartAltRoundedIcon className={`buttonIcon`} htmlColor="#FFFFFF"/>;
        default:
            return <></>
    }
}

  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
      {returnIcon(icon)}
    </button>
  );
}