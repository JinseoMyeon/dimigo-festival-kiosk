import '../styles/components/button.scss';

import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';

export default function SmallButton(props) {
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
        default:
            return <></>
    }
}

  return (
    <button className={`smallbutton ${className}`} onClick={onClick}>
      {text}
      {returnIcon(icon)}
    </button>
  );
}